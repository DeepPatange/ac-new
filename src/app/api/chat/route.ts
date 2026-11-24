import { buildSystemPrompt } from "@/lib/chat-knowledge";

/**
 * Website chatbot endpoint. Streams a plain-text reply from Vercel AI Gateway
 * (OpenAI-compatible Chat Completions API, no extra SDK dependency).
 *
 * Auth: on Vercel the deployment's OIDC token (VERCEL_OIDC_TOKEN) is used
 * automatically; elsewhere set AI_GATEWAY_API_KEY. Model: AI_GATEWAY_MODEL
 * (an exact id from https://ai-gateway.vercel.sh/v1/models), defaulting to a
 * fast, low-cost model suitable for customer-facing chat.
 */
export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const GATEWAY_URL = "https://ai-gateway.vercel.sh/v1/chat/completions";
const DEFAULT_MODEL = "anthropic/claude-haiku-5.5";

const MAX_MESSAGES = 16;
const MAX_CHARS = 2000;

/* Light per-instance abuse guard (Fluid Compute reuses instances). */
const WINDOW_MS = 60_000;
const MAX_PER_WINDOW = 12;
const hits = new Map<string, number[]>();

function rateLimited(ip: string): boolean {
  const now = Date.now();
  const recent = (hits.get(ip) ?? []).filter((t) => now - t < WINDOW_MS);
  recent.push(now);
  hits.set(ip, recent);
  if (hits.size > 5000) hits.clear();
  return recent.length > MAX_PER_WINDOW;
}

type Msg = { role: "user" | "assistant"; content: string };

function sanitize(input: unknown): Msg[] | null {
  if (!Array.isArray(input)) return null;
  const out: Msg[] = [];
  for (const m of input.slice(-MAX_MESSAGES)) {
    if (!m || typeof m !== "object") return null;
    const { role, content } = m as Record<string, unknown>;
    if ((role !== "user" && role !== "assistant") || typeof content !== "string") return null;
    const text = content.trim().slice(0, MAX_CHARS);
    if (text) out.push({ role, content: text });
  }
  if (!out.length || out[out.length - 1].role !== "user") return null;
  return out;
}

const FALLBACK =
  "Sorry, I can't answer right now. Please reach our sales team directly: WhatsApp or call +91-7710005176, email info@accordchemicals.com, or use the enquiry form at /contact-us.";

export async function POST(req: Request) {
  const ip = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "local";
  if (rateLimited(ip)) {
    return new Response("You're sending messages quickly. Please wait a moment and try again.", {
      status: 429,
    });
  }

  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return new Response("Invalid request.", { status: 400 });
  }
  const messages = sanitize((body as { messages?: unknown })?.messages);
  if (!messages) return new Response("Invalid request.", { status: 400 });

  // On Vercel the deployment's OIDC token arrives as a request header at
  // runtime (and as VERCEL_OIDC_TOKEN locally after `vercel env pull`).
  const token =
    process.env.AI_GATEWAY_API_KEY ||
    req.headers.get("x-vercel-oidc-token") ||
    process.env.VERCEL_OIDC_TOKEN;
  if (!token) {
    console.error("[chat] No AI_GATEWAY_API_KEY or VERCEL_OIDC_TOKEN configured");
    return new Response(FALLBACK, { status: 200, headers: { "Content-Type": "text/plain; charset=utf-8" } });
  }

  let upstream: Response;
  try {
    upstream = await fetch(GATEWAY_URL, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: process.env.AI_GATEWAY_MODEL || DEFAULT_MODEL,
        stream: true,
        max_tokens: 600,
        temperature: 0.3,
        messages: [{ role: "system", content: buildSystemPrompt() }, ...messages],
      }),
      signal: req.signal,
    });
  } catch (err) {
    console.error("[chat] gateway request failed", err);
    return new Response(FALLBACK, { headers: { "Content-Type": "text/plain; charset=utf-8" } });
  }

  if (!upstream.ok || !upstream.body) {
    console.error("[chat] gateway error", upstream.status, await upstream.text().catch(() => ""));
    return new Response(FALLBACK, { headers: { "Content-Type": "text/plain; charset=utf-8" } });
  }

  // Convert the SSE stream into a plain UTF-8 text stream of content deltas.
  const decoder = new TextDecoder();
  const encoder = new TextEncoder();
  let buffer = "";
  const stream = upstream.body.pipeThrough(
    new TransformStream<Uint8Array, Uint8Array>({
      transform(chunk, controller) {
        buffer += decoder.decode(chunk, { stream: true });
        const lines = buffer.split("\n");
        buffer = lines.pop() ?? "";
        for (const line of lines) {
          const data = line.trim();
          if (!data.startsWith("data:")) continue;
          const payload = data.slice(5).trim();
          if (payload === "[DONE]") continue;
          try {
            const delta = JSON.parse(payload)?.choices?.[0]?.delta?.content;
            if (typeof delta === "string" && delta) controller.enqueue(encoder.encode(delta));
          } catch {
            /* ignore keep-alives / partial frames */
          }
        }
      },
    })
  );

  return new Response(stream, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "no-store",
    },
  });
}

"use client";

import { Fragment, useEffect, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { Mail, MessageCircle, Phone, SendHorizontal, X } from "lucide-react";
import { siteConfig } from "@/lib/site";
import { cn } from "@/lib/utils";

/**
 * Site-wide AI assistant. A floating launcher (bottom-right, every page) that
 * opens a chat panel backed by /api/chat. The panel always shows direct
 * routes to the sales team (WhatsApp, call, email, enquiry form) so a
 * visitor is never stuck with the bot.
 */

type Msg = { role: "user" | "assistant"; content: string };

const GREETING: Msg = {
  role: "assistant",
  content:
    "Hello, welcome to Accord Chemical Corporation. I can help with our products, services, industries served and contact details, or with a quotation request. How can I help?",
};

const SUGGESTIONS = [
  "Which products do you supply?",
  "I'd like a quotation",
  "Which industries do you serve?",
  "How do I contact sales?",
];

/** Renders plain text, turning site paths (/contact-us), URLs, emails and line breaks into links. */
function RichText({ text }: { text: string }) {
  const parts = text.split(
    /(https?:\/\/[^\s)]+|[\w.+-]+@[\w-]+\.[\w.]+|(?<![\w/])\/(?:about-us|products|services|industries-served|career|partners|contact-us|app)\b)/g
  );
  return (
    <>
      {parts.map((p, i) => {
        if (!p) return null;
        const cls = "font-medium text-accord-red underline underline-offset-2";
        if (/^https?:\/\//.test(p))
          return (
            <a key={i} href={p} target="_blank" rel="noopener noreferrer" className={cls}>
              {p}
            </a>
          );
        if (/^[\w.+-]+@/.test(p))
          return (
            <a key={i} href={`mailto:${p}`} className={cls}>
              {p}
            </a>
          );
        if (p.startsWith("/"))
          return (
            <Link key={i} href={p} className={cls}>
              {p}
            </Link>
          );
        return (
          <Fragment key={i}>
            {p.split("\n").map((line, j, arr) => (
              <Fragment key={j}>
                {line}
                {j < arr.length - 1 && <br />}
              </Fragment>
            ))}
          </Fragment>
        );
      })}
    </>
  );
}

export default function ChatWidget() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Msg[]>([GREETING]);
  const [input, setInput] = useState("");
  const [busy, setBusy] = useState(false);
  const listRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const abortRef = useRef<AbortController | null>(null);

  useEffect(() => {
    listRef.current?.scrollTo({ top: listRef.current.scrollHeight });
  }, [messages, open]);

  useEffect(() => {
    if (!open) return;
    const t = window.setTimeout(() => inputRef.current?.focus(), 150);
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => {
      window.clearTimeout(t);
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  useEffect(() => () => abortRef.current?.abort(), []);

  async function send(text: string) {
    const content = text.trim();
    if (!content || busy) return;
    const history: Msg[] = [...messages, { role: "user", content }];
    setMessages([...history, { role: "assistant", content: "" }]);
    setInput("");
    setBusy(true);

    const controller = new AbortController();
    abortRef.current = controller;
    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        // The greeting is UI-only; send the real conversation.
        body: JSON.stringify({ messages: history.slice(1) }),
        signal: controller.signal,
      });
      if (!res.body) throw new Error("no body");
      const reader = res.body.getReader();
      const decoder = new TextDecoder();
      let acc = "";
      for (;;) {
        const { done, value } = await reader.read();
        if (done) break;
        acc += decoder.decode(value, { stream: true });
        setMessages([...history, { role: "assistant", content: acc }]);
      }
      if (!acc.trim()) throw new Error("empty");
    } catch (err) {
      if ((err as Error).name === "AbortError") return;
      setMessages([
        ...history,
        {
          role: "assistant",
          content: `Sorry, something went wrong. You can reach our sales team on ${siteConfig.contact.phone}, at ${siteConfig.contact.email}, or through /contact-us.`,
        },
      ]);
    } finally {
      setBusy(false);
    }
  }

  const c = siteConfig.contact;

  return (
    <>
      {/* Launcher */}
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-label={open ? "Close chat" : "Chat with Accord"}
        aria-expanded={open}
        className="fixed bottom-4 right-4 z-[45] flex h-14 w-14 items-center justify-center rounded-full bg-accord-red shadow-[0_12px_32px_-8px_rgba(225,27,34,0.55)] transition-transform duration-200 hover:scale-105 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accord-red focus-visible:ring-offset-2 sm:bottom-6 sm:right-6"
      >
        {open ? <X className="h-6 w-6" /> : <MessageCircle className="h-6 w-6" />}
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            role="dialog"
            aria-label="Accord assistant"
            initial={{ opacity: 0, y: 16, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 16, scale: 0.98 }}
            transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
            data-lenis-prevent
            className="fixed inset-x-2 bottom-20 top-20 z-[45] flex flex-col overflow-hidden rounded-2xl border border-white/10 bg-ink shadow-[0_30px_80px_-20px_rgba(0,0,0,0.35)] sm:inset-x-auto sm:bottom-24 sm:right-6 sm:top-auto sm:h-[min(640px,calc(100vh-8rem))] sm:w-[400px]"
          >
            {/* Header */}
            <div className="flex items-center gap-3 border-b border-white/10 bg-ink-900 px-4 py-3">
              <span className="flex h-9 w-9 items-center justify-center overflow-hidden rounded-full border border-white/10 bg-ink">
                <Image src="/logo.png" alt="" width={36} height={16} className="h-auto w-7" />
              </span>
              <div className="min-w-0 flex-1">
                <p className="font-display text-[15px] font-semibold text-white">Accord Assistant</p>
                <p className="text-xs text-steel-400">AI assistant · Sales team available on request</p>
              </div>
              <button
                type="button"
                onClick={() => setOpen(false)}
                aria-label="Close chat"
                className="rounded-full p-1.5 text-steel-400 hover:bg-white/[0.06] hover:text-white"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            {/* Messages */}
            <div ref={listRef} className="flex-1 space-y-3 overflow-y-auto overscroll-contain px-4 py-4" aria-live="polite">
              {messages.map((m, i) => (
                <div key={i} className={cn("flex", m.role === "user" ? "justify-end" : "justify-start")}>
                  <div
                    className={cn(
                      "max-w-[85%] rounded-2xl px-3.5 py-2.5 text-sm leading-relaxed",
                      m.role === "user"
                        ? "rounded-br-md bg-accord-red"
                        : "rounded-bl-md bg-ink-800 text-steel-200"
                    )}
                  >
                    {m.content ? (
                      m.role === "assistant" ? <RichText text={m.content} /> : m.content
                    ) : (
                      <span className="inline-flex gap-1 py-1" aria-label="Typing">
                        {[0, 1, 2].map((d) => (
                          <span
                            key={d}
                            className="h-1.5 w-1.5 animate-bounce rounded-full bg-steel-500"
                            style={{ animationDelay: `${d * 120}ms` }}
                          />
                        ))}
                      </span>
                    )}
                  </div>
                </div>
              ))}

              {messages.length === 1 && (
                <div className="flex flex-wrap gap-2 pt-1">
                  {SUGGESTIONS.map((s) => (
                    <button
                      key={s}
                      type="button"
                      onClick={() => send(s)}
                      className="rounded-full border border-white/15 px-3 py-1.5 text-xs text-steel-300 transition-colors hover:border-accord-red/50 hover:text-accord-red"
                    >
                      {s}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Sales hand-off */}
            <div className="flex items-center gap-1.5 border-t border-white/10 px-3 py-2 text-xs">
              <span className="mr-auto pl-1 text-steel-500">Talk to sales:</span>
              <a href={c.whatsappHref} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 rounded-full px-2 py-1 text-steel-300 hover:bg-white/[0.06] hover:text-accord-red">
                <MessageCircle className="h-3.5 w-3.5" /> WhatsApp
              </a>
              <a href={c.phoneHref} className="inline-flex items-center gap-1 rounded-full px-2 py-1 text-steel-300 hover:bg-white/[0.06] hover:text-accord-red">
                <Phone className="h-3.5 w-3.5" /> Call
              </a>
              <a href={c.emailHref} className="inline-flex items-center gap-1 rounded-full px-2 py-1 text-steel-300 hover:bg-white/[0.06] hover:text-accord-red">
                <Mail className="h-3.5 w-3.5" /> Email
              </a>
            </div>

            {/* Composer */}
            <form
              onSubmit={(e) => {
                e.preventDefault();
                send(input);
              }}
              className="flex items-end gap-2 border-t border-white/10 p-3"
            >
              <textarea
                ref={inputRef}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" && !e.shiftKey) {
                    e.preventDefault();
                    send(input);
                  }
                }}
                rows={1}
                maxLength={2000}
                placeholder="Ask about products, services or a quote…"
                aria-label="Message"
                className="max-h-28 min-h-[42px] flex-1 resize-none rounded-xl border border-white/15 bg-ink px-3 py-2.5 text-sm text-white placeholder:text-steel-500 focus:border-accord-red/60 focus:outline-none"
              />
              <button
                type="submit"
                disabled={busy || !input.trim()}
                aria-label="Send"
                className="flex h-[42px] w-[42px] shrink-0 items-center justify-center rounded-xl bg-accord-red transition-opacity disabled:opacity-40"
              >
                <SendHorizontal className="h-4 w-4" />
              </button>
            </form>
            <p className="px-4 pb-2 text-center text-[10px] text-steel-500">
              AI responses may be incomplete. Please confirm details with our sales team.
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

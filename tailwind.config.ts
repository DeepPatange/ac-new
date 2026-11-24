import type { Config } from "tailwindcss";

/* LIGHT THEME COPY.
   The dark site used literal tokens (white / ink / steel). Here those tokens are
   backed by CSS variables (defined in globals.css) so the whole UI flips to a
   white background with near-black + red text WITHOUT touching any component:
   - `white`  -> near-black foreground  (text-white, border-white/10, bg-white/x
                 glass fills, solid white chips all become dark-on-light)
   - `ink`    -> white/near-white surfaces (bg-ink, from-ink, …)
   - `steel`  -> dark gray text scale
   - `accord.red` stays the brand red accent. */
const config: Config = {
  content: ["./src/app/**/*.{ts,tsx}", "./src/components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        accord: {
          red: "#E11B22",
          redDark: "#B3141A",
          redLight: "#FF3B41",
          ember: "#FF5A3C",
        },
        white: "rgb(var(--c-white) / <alpha-value>)",
        black: "rgb(var(--c-black) / <alpha-value>)",
        ink: {
          DEFAULT: "rgb(var(--c-ink) / <alpha-value>)",
          900: "rgb(var(--c-ink-900) / <alpha-value>)",
          800: "rgb(var(--c-ink-800) / <alpha-value>)",
          700: "rgb(var(--c-ink-700) / <alpha-value>)",
          600: "rgb(var(--c-ink-600) / <alpha-value>)",
        },
        steel: {
          100: "rgb(var(--c-steel-100) / <alpha-value>)",
          200: "rgb(var(--c-steel-200) / <alpha-value>)",
          300: "rgb(var(--c-steel-300) / <alpha-value>)",
          400: "rgb(var(--c-steel-400) / <alpha-value>)",
          500: "rgb(var(--c-steel-500) / <alpha-value>)",
          600: "rgb(var(--c-steel-600) / <alpha-value>)",
        },
        bone: "#F6F6F4",
        cloud: "#FBFBFD",
        mist: "#F1F1F4",
      },
      fontFamily: {
        sans: ["var(--font-sans)", "system-ui", "sans-serif"],
        display: ["var(--font-display)", "var(--font-sans)", "sans-serif"],
        // No monospace in the brand system: `font-mono` utilities render in Inter
        // with tabular figures (see globals.css) for clean, aligned numbers.
        mono: ["var(--font-sans)", "system-ui", "sans-serif"],
      },
      maxWidth: { container: "1280px" },
      borderRadius: { "4xl": "2rem" },
      backgroundImage: {
        // Faint grid tuned for LIGHT backgrounds (dark hairlines on white)
        "grid-faint":
          "linear-gradient(to right, rgba(0,0,0,0.06) 1px, transparent 1px), linear-gradient(to bottom, rgba(0,0,0,0.06) 1px, transparent 1px)",
        "radial-fade":
          "radial-gradient(ellipse at center, rgba(225,27,34,0.16), transparent 60%)",
      },
      keyframes: {
        "fade-up": {
          "0%": { opacity: "0", transform: "translateY(24px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        shimmer: {
          "0%": { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" },
        },
        float: {
          "0%,100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-12px)" },
        },
        marquee: {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-50%)" },
        },
        "pulse-ring": {
          "0%": { transform: "scale(0.8)", opacity: "0.7" },
          "100%": { transform: "scale(2.2)", opacity: "0" },
        },
      },
      animation: {
        "fade-up": "fade-up 0.7s cubic-bezier(0.22,1,0.36,1) both",
        shimmer: "shimmer 2.5s linear infinite",
        float: "float 6s ease-in-out infinite",
        marquee: "marquee 30s linear infinite",
        "pulse-ring": "pulse-ring 2.4s cubic-bezier(0.22,1,0.36,1) infinite",
      },
    },
  },
  plugins: [],
};

export default config;

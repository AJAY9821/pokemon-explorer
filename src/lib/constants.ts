export const POKEAPI_BASE_URL = process.env.NEXT_PUBLIC_POKEAPI_BASE_URL || "https://pokeapi.co/api/v2";
export const DEFAULT_PAGE_LIMIT = 36;

export interface DribbbleTypeColor {
  bg: string;            // Tailwind background color class or gradient
  gradient: string;      // Inline linear/radial gradient string for dynamic card backgrounds
  glow: string;          // Box shadow / neon aura glow color
  hex: string;           // Primary accent color hex
  text: string;          // Text color class
  badgeBg: string;       // Translucent glass badge background
  border: string;        // Glowing border styling
}

export const DRIBBBLE_TYPE_COLORS: Record<string, DribbbleTypeColor> = {
  grass: {
    bg: "bg-gradient-to-br from-emerald-500/90 via-teal-600/90 to-emerald-900/95",
    gradient: "linear-gradient(135deg, #10B981 0%, #0D9488 50%, #064E3B 100%)",
    glow: "rgba(16, 185, 129, 0.45)",
    hex: "#10B981",
    text: "text-emerald-100",
    badgeBg: "bg-emerald-950/40 backdrop-blur-md border border-emerald-400/40 text-emerald-200",
    border: "border-emerald-400/30",
  },
  fire: {
    bg: "bg-gradient-to-br from-rose-500/90 via-orange-600/90 to-red-950/95",
    gradient: "linear-gradient(135deg, #F43F5E 0%, #EA580C 50%, #450A0A 100%)",
    glow: "rgba(244, 63, 94, 0.45)",
    hex: "#F43F5E",
    text: "text-rose-100",
    badgeBg: "bg-rose-950/40 backdrop-blur-md border border-rose-400/40 text-rose-200",
    border: "border-rose-400/30",
  },
  water: {
    bg: "bg-gradient-to-br from-cyan-500/90 via-blue-600/90 to-slate-950/95",
    gradient: "linear-gradient(135deg, #06B6D4 0%, #2563EB 50%, #0284C7 100%)",
    glow: "rgba(6, 182, 212, 0.45)",
    hex: "#06B6D4",
    text: "text-cyan-100",
    badgeBg: "bg-cyan-950/40 backdrop-blur-md border border-cyan-400/40 text-cyan-200",
    border: "border-cyan-400/30",
  },
  electric: {
    bg: "bg-gradient-to-br from-amber-400/90 via-yellow-500/90 to-amber-950/95",
    gradient: "linear-gradient(135deg, #F59E0B 0%, #EAB308 50%, #78350F 100%)",
    glow: "rgba(245, 158, 11, 0.45)",
    hex: "#F59E0B",
    text: "text-amber-100",
    badgeBg: "bg-amber-950/40 backdrop-blur-md border border-amber-300/50 text-amber-200",
    border: "border-amber-400/40",
  },
  poison: {
    bg: "bg-gradient-to-br from-purple-600/90 via-fuchsia-700/90 to-purple-950/95",
    gradient: "linear-gradient(135deg, #9333EA 0%, #A21CAF 50%, #3B0764 100%)",
    glow: "rgba(147, 51, 234, 0.45)",
    hex: "#9333EA",
    text: "text-purple-100",
    badgeBg: "bg-purple-950/40 backdrop-blur-md border border-purple-400/40 text-purple-200",
    border: "border-purple-400/30",
  },
  psychic: {
    bg: "bg-gradient-to-br from-pink-500/90 via-rose-600/90 to-pink-950/95",
    gradient: "linear-gradient(135deg, #EC4899 0%, #E11D48 50%, #500724 100%)",
    glow: "rgba(236, 72, 153, 0.45)",
    hex: "#EC4899",
    text: "text-pink-100",
    badgeBg: "bg-pink-950/40 backdrop-blur-md border border-pink-400/40 text-pink-200",
    border: "border-pink-400/30",
  },
  ground: {
    bg: "bg-gradient-to-br from-amber-600/90 via-stone-700/90 to-amber-950/95",
    gradient: "linear-gradient(135deg, #D97706 0%, #78350F 50%, #292524 100%)",
    glow: "rgba(217, 119, 6, 0.45)",
    hex: "#D97706",
    text: "text-amber-100",
    badgeBg: "bg-amber-950/40 backdrop-blur-md border border-amber-500/40 text-amber-200",
    border: "border-amber-500/30",
  },
  flying: {
    bg: "bg-gradient-to-br from-indigo-500/90 via-sky-600/90 to-indigo-950/95",
    gradient: "linear-gradient(135deg, #6366F1 0%, #0284C7 50%, #1E1B4B 100%)",
    glow: "rgba(99, 102, 241, 0.45)",
    hex: "#6366F1",
    text: "text-indigo-100",
    badgeBg: "bg-indigo-950/40 backdrop-blur-md border border-indigo-400/40 text-indigo-200",
    border: "border-indigo-400/30",
  },
  bug: {
    bg: "bg-gradient-to-br from-lime-500/90 via-emerald-600/90 to-lime-950/95",
    gradient: "linear-gradient(135deg, #84CC16 0%, #059669 50%, #1A2E05 100%)",
    glow: "rgba(132, 204, 22, 0.45)",
    hex: "#84CC16",
    text: "text-lime-100",
    badgeBg: "bg-lime-950/40 backdrop-blur-md border border-lime-400/40 text-lime-200",
    border: "border-lime-400/30",
  },
  rock: {
    bg: "bg-gradient-to-br from-stone-500/90 via-yellow-700/90 to-stone-950/95",
    gradient: "linear-gradient(135deg, #78716C 0%, #A16207 50%, #1C1917 100%)",
    glow: "rgba(120, 113, 108, 0.45)",
    hex: "#78716C",
    text: "text-stone-100",
    badgeBg: "bg-stone-950/40 backdrop-blur-md border border-stone-400/40 text-stone-200",
    border: "border-stone-400/30",
  },
  ghost: {
    bg: "bg-gradient-to-br from-indigo-700/90 via-purple-900/90 to-slate-950/95",
    gradient: "linear-gradient(135deg, #4338CA 0%, #581C87 50%, #0F172A 100%)",
    glow: "rgba(67, 56, 202, 0.55)",
    hex: "#6366F1",
    text: "text-indigo-100",
    badgeBg: "bg-indigo-950/50 backdrop-blur-md border border-indigo-400/50 text-indigo-200",
    border: "border-indigo-400/40",
  },
  dragon: {
    bg: "bg-gradient-to-br from-violet-600/90 via-indigo-700/90 to-purple-950/95",
    gradient: "linear-gradient(135deg, #7C3AED 0%, #4338CA 50%, #2E1065 100%)",
    glow: "rgba(124, 58, 237, 0.55)",
    hex: "#7C3AED",
    text: "text-violet-100",
    badgeBg: "bg-violet-950/50 backdrop-blur-md border border-violet-400/50 text-violet-200",
    border: "border-violet-400/40",
  },
  steel: {
    bg: "bg-gradient-to-br from-slate-500/90 via-zinc-600/90 to-slate-950/95",
    gradient: "linear-gradient(135deg, #64748B 0%, #52525B 50%, #0F172A 100%)",
    glow: "rgba(100, 116, 139, 0.45)",
    hex: "#64748B",
    text: "text-slate-100",
    badgeBg: "bg-slate-950/40 backdrop-blur-md border border-slate-400/40 text-slate-200",
    border: "border-slate-400/30",
  },
  fairy: {
    bg: "bg-gradient-to-br from-pink-400/90 via-rose-500/90 to-pink-950/95",
    gradient: "linear-gradient(135deg, #F472B6 0%, #F43F5E 50%, #4C0519 100%)",
    glow: "rgba(244, 114, 182, 0.5)",
    hex: "#F472B6",
    text: "text-pink-100",
    badgeBg: "bg-pink-950/40 backdrop-blur-md border border-pink-300/50 text-pink-200",
    border: "border-pink-300/40",
  },
  fighting: {
    bg: "bg-gradient-to-br from-orange-600/90 via-red-700/90 to-orange-950/95",
    gradient: "linear-gradient(135deg, #EA580C 0%, #B91C1C 50%, #431407 100%)",
    glow: "rgba(234, 88, 12, 0.45)",
    hex: "#EA580C",
    text: "text-orange-100",
    badgeBg: "bg-orange-950/40 backdrop-blur-md border border-orange-400/40 text-orange-200",
    border: "border-orange-400/30",
  },
  normal: {
    bg: "bg-gradient-to-br from-zinc-500/90 via-stone-600/90 to-zinc-950/95",
    gradient: "linear-gradient(135deg, #71717A 0%, #57534E 50%, #18181B 100%)",
    glow: "rgba(113, 113, 122, 0.35)",
    hex: "#71717A",
    text: "text-zinc-100",
    badgeBg: "bg-zinc-950/40 backdrop-blur-md border border-zinc-400/40 text-zinc-200",
    border: "border-zinc-400/30",
  },
  ice: {
    bg: "bg-gradient-to-br from-sky-400/90 via-cyan-500/90 to-sky-950/95",
    gradient: "linear-gradient(135deg, #38BDF8 0%, #06B6D4 50%, #0C4A6E 100%)",
    glow: "rgba(56, 189, 248, 0.5)",
    hex: "#38BDF8",
    text: "text-sky-100",
    badgeBg: "bg-sky-950/40 backdrop-blur-md border border-sky-300/50 text-sky-200",
    border: "border-sky-300/40",
  },
};


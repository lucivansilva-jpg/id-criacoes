export type ThemeMode = 'dark' | 'light' | 'navy' | 'emerald' | 'gold';

export interface ThemeConfig {
  id: ThemeMode;
  name: string;
  shortName: string;
  badge: string;
  previewColor: string;
  accentHex: string;
  isLight: boolean;
  
  // Page & Backgrounds
  pageBg: string;
  sectionBg: string;
  sectionAltBg: string;
  
  // Text Colors
  textPrimary: string;
  textSecondary: string;
  textMuted: string;
  
  // Cards & Surfaces
  cardBg: string;
  cardBgSolid: string;
  cardBgSubtle: string;
  cardBorder: string;
  cardHoverBorder: string;
  cardHoverShadow: string;
  
  // Inputs & Controls
  inputBg: string;
  inputBorder: string;
  inputText: string;
  inputPlaceholder: string;
  
  // Buttons & Secondary Controls
  btnSecondaryBg: string;
  btnSecondaryText: string;
  btnSecondaryBorder: string;
  
  // Nav
  navBg: string;
  navBorder: string;
  navText: string;
  
  // Accent & Action
  accentBg: string;
  accentHoverBg: string;
  accentText: string;
  accentBorder: string;
  accentShadow: string;
  accentPill: string;
  accentBadge: string;
  
  // Gradients & Visual Effects
  heroGlow: string;
  heroGradient: string;
  ctaBg: string;
  
  // Footer
  footerBg: string;
  footerBorder: string;
  footerText: string;
  footerMuted: string;
}

export const THEMES: Record<ThemeMode, ThemeConfig> = {
  dark: {
    id: 'dark',
    name: 'Escuro Cyber (Padrão)',
    shortName: 'Escuro',
    badge: '🌙 Escuro',
    previewColor: '#09090b',
    accentHex: '#22d3ee',
    isLight: false,

    pageBg: 'bg-zinc-950 text-zinc-100 selection:bg-cyan-500/30 selection:text-cyan-400',
    sectionBg: 'bg-zinc-950',
    sectionAltBg: 'bg-zinc-900/50',

    textPrimary: 'text-white',
    textSecondary: 'text-zinc-300',
    textMuted: 'text-zinc-400',

    cardBg: 'bg-zinc-900/85',
    cardBgSolid: 'bg-zinc-900',
    cardBgSubtle: 'bg-zinc-950/80',
    cardBorder: 'border-zinc-800/85',
    cardHoverBorder: 'hover:border-cyan-500/50',
    cardHoverShadow: 'hover:shadow-[0_0_30px_rgba(34,211,238,0.15)]',

    inputBg: 'bg-zinc-900',
    inputBorder: 'border-zinc-800 focus:border-cyan-500',
    inputText: 'text-white',
    inputPlaceholder: 'placeholder:text-zinc-600',

    btnSecondaryBg: 'bg-zinc-900/90 hover:bg-zinc-800',
    btnSecondaryText: 'text-zinc-200 hover:text-white',
    btnSecondaryBorder: 'border-zinc-700/80',

    navBg: 'bg-zinc-950/92 backdrop-blur-md',
    navBorder: 'border-zinc-800/90',
    navText: 'text-zinc-400 hover:text-white',

    accentBg: 'bg-cyan-500',
    accentHoverBg: 'hover:bg-cyan-400',
    accentText: 'text-cyan-400',
    accentBorder: 'border-cyan-500/40',
    accentShadow: 'shadow-[0_0_25px_rgba(34,211,238,0.35)]',
    accentPill: 'bg-cyan-500/10 text-cyan-400 border-cyan-500/30',
    accentBadge: 'bg-cyan-400 text-zinc-950',

    heroGlow: 'bg-cyan-500/10',
    heroGradient: 'from-white via-cyan-300 via-cyan-400 to-sky-400',
    ctaBg: 'bg-gradient-to-r from-cyan-600 to-emerald-600',

    footerBg: 'bg-zinc-950',
    footerBorder: 'border-zinc-900',
    footerText: 'text-zinc-300',
    footerMuted: 'text-zinc-500'
  },

  light: {
    id: 'light',
    name: 'Claro Minimalista (Light)',
    shortName: 'Claro',
    badge: '☀️ Claro',
    previewColor: '#f8fafc',
    accentHex: '#0284c7',
    isLight: true,

    pageBg: 'bg-slate-50 text-slate-900 selection:bg-sky-500/20 selection:text-sky-700',
    sectionBg: 'bg-slate-50',
    sectionAltBg: 'bg-slate-100/80',

    textPrimary: 'text-slate-900',
    textSecondary: 'text-slate-700',
    textMuted: 'text-slate-500',

    cardBg: 'bg-white shadow-xl shadow-slate-200/60',
    cardBgSolid: 'bg-white',
    cardBgSubtle: 'bg-slate-50/90',
    cardBorder: 'border-slate-200/90',
    cardHoverBorder: 'hover:border-sky-500/60',
    cardHoverShadow: 'hover:shadow-[0_0_30px_rgba(2,132,199,0.15)]',

    inputBg: 'bg-white',
    inputBorder: 'border-slate-300 focus:border-sky-500',
    inputText: 'text-slate-900',
    inputPlaceholder: 'placeholder:text-slate-400',

    btnSecondaryBg: 'bg-white hover:bg-slate-100',
    btnSecondaryText: 'text-slate-800 hover:text-slate-950',
    btnSecondaryBorder: 'border-slate-300 shadow-xs',

    navBg: 'bg-white/94 backdrop-blur-md',
    navBorder: 'border-slate-200/90 shadow-xs',
    navText: 'text-slate-600 hover:text-slate-900',

    accentBg: 'bg-sky-600',
    accentHoverBg: 'hover:bg-sky-500',
    accentText: 'text-sky-600',
    accentBorder: 'border-sky-500/40',
    accentShadow: 'shadow-[0_0_25px_rgba(2,132,199,0.25)]',
    accentPill: 'bg-sky-50 text-sky-700 border-sky-200 shadow-xs',
    accentBadge: 'bg-sky-600 text-white',

    heroGlow: 'bg-sky-400/15',
    heroGradient: 'from-slate-900 via-sky-600 to-cyan-600',
    ctaBg: 'bg-gradient-to-r from-sky-600 to-teal-600 text-white',

    footerBg: 'bg-slate-900',
    footerBorder: 'border-slate-800',
    footerText: 'text-slate-200',
    footerMuted: 'text-slate-400'
  },

  navy: {
    id: 'navy',
    name: 'Azul Corporativo (Navy)',
    shortName: 'Azul Royal',
    badge: '💎 Azul Royal',
    previewColor: '#070e1e',
    accentHex: '#38bdf8',
    isLight: false,

    pageBg: 'bg-[#060c18] text-slate-100 selection:bg-blue-500/30 selection:text-blue-300',
    sectionBg: 'bg-[#060c18]',
    sectionAltBg: 'bg-[#0a1428]/60',

    textPrimary: 'text-white',
    textSecondary: 'text-slate-300',
    textMuted: 'text-slate-400',

    cardBg: 'bg-[#0d1b36]/85',
    cardBgSolid: 'bg-[#0d1b36]',
    cardBgSubtle: 'bg-[#060c18]/90',
    cardBorder: 'border-blue-900/40',
    cardHoverBorder: 'hover:border-blue-400/50',
    cardHoverShadow: 'hover:shadow-[0_0_30px_rgba(56,189,248,0.15)]',

    inputBg: 'bg-[#0d1b36]',
    inputBorder: 'border-blue-900/60 focus:border-sky-400',
    inputText: 'text-white',
    inputPlaceholder: 'placeholder:text-slate-500',

    btnSecondaryBg: 'bg-[#0d1b36]/90 hover:bg-[#132549]',
    btnSecondaryText: 'text-slate-200 hover:text-white',
    btnSecondaryBorder: 'border-blue-800/60',

    navBg: 'bg-[#060c18]/92 backdrop-blur-md',
    navBorder: 'border-blue-950/80',
    navText: 'text-slate-400 hover:text-white',

    accentBg: 'bg-blue-500',
    accentHoverBg: 'hover:bg-blue-400',
    accentText: 'text-sky-400',
    accentBorder: 'border-blue-500/40',
    accentShadow: 'shadow-[0_0_25px_rgba(56,189,248,0.35)]',
    accentPill: 'bg-blue-500/10 text-sky-300 border-blue-500/30',
    accentBadge: 'bg-sky-400 text-zinc-950',

    heroGlow: 'bg-blue-500/15',
    heroGradient: 'from-white via-sky-300 via-blue-400 to-indigo-400',
    ctaBg: 'bg-gradient-to-r from-blue-600 to-cyan-500',

    footerBg: 'bg-[#040810]',
    footerBorder: 'border-blue-950',
    footerText: 'text-slate-300',
    footerMuted: 'text-slate-500'
  },

  emerald: {
    id: 'emerald',
    name: 'Verde Esmeralda (Tech)',
    shortName: 'Esmeralda',
    badge: '🌿 Esmeralda',
    previewColor: '#05130e',
    accentHex: '#34d399',
    isLight: false,

    pageBg: 'bg-[#040f0b] text-emerald-50 selection:bg-emerald-500/30 selection:text-emerald-300',
    sectionBg: 'bg-[#040f0b]',
    sectionAltBg: 'bg-[#071912]/60',

    textPrimary: 'text-white',
    textSecondary: 'text-emerald-100/90',
    textMuted: 'text-emerald-300/70',

    cardBg: 'bg-[#092219]/85',
    cardBgSolid: 'bg-[#092219]',
    cardBgSubtle: 'bg-[#040f0b]/90',
    cardBorder: 'border-emerald-900/40',
    cardHoverBorder: 'hover:border-emerald-400/50',
    cardHoverShadow: 'hover:shadow-[0_0_30px_rgba(52,211,153,0.15)]',

    inputBg: 'bg-[#092219]',
    inputBorder: 'border-emerald-900/60 focus:border-emerald-400',
    inputText: 'text-white',
    inputPlaceholder: 'placeholder:text-emerald-700/60',

    btnSecondaryBg: 'bg-[#092219]/90 hover:bg-[#0f3427]',
    btnSecondaryText: 'text-emerald-200 hover:text-white',
    btnSecondaryBorder: 'border-emerald-800/60',

    navBg: 'bg-[#040f0b]/92 backdrop-blur-md',
    navBorder: 'border-emerald-950/80',
    navText: 'text-emerald-300/70 hover:text-white',

    accentBg: 'bg-emerald-500',
    accentHoverBg: 'hover:bg-emerald-400',
    accentText: 'text-emerald-400',
    accentBorder: 'border-emerald-500/40',
    accentShadow: 'shadow-[0_0_25px_rgba(52,211,153,0.35)]',
    accentPill: 'bg-emerald-500/10 text-emerald-300 border-emerald-500/30',
    accentBadge: 'bg-emerald-400 text-zinc-950',

    heroGlow: 'bg-emerald-500/15',
    heroGradient: 'from-white via-emerald-300 via-teal-400 to-emerald-400',
    ctaBg: 'bg-gradient-to-r from-emerald-600 to-teal-500',

    footerBg: 'bg-[#020806]',
    footerBorder: 'border-emerald-950',
    footerText: 'text-emerald-200/80',
    footerMuted: 'text-emerald-500/60'
  },

  gold: {
    id: 'gold',
    name: 'Ouro & Luxo (Amber)',
    shortName: 'Ouro Luxo',
    badge: '👑 Ouro Luxo',
    previewColor: '#120e08',
    accentHex: '#fbbf24',
    isLight: false,

    pageBg: 'bg-[#0d0905] text-amber-50 selection:bg-amber-500/30 selection:text-amber-300',
    sectionBg: 'bg-[#0d0905]',
    sectionAltBg: 'bg-[#150f08]/60',

    textPrimary: 'text-white',
    textSecondary: 'text-amber-100/90',
    textMuted: 'text-amber-200/70',

    cardBg: 'bg-[#1c150b]/85',
    cardBgSolid: 'bg-[#1c150b]',
    cardBgSubtle: 'bg-[#0d0905]/90',
    cardBorder: 'border-amber-900/40',
    cardHoverBorder: 'hover:border-amber-400/50',
    cardHoverShadow: 'hover:shadow-[0_0_30px_rgba(251,191,36,0.15)]',

    inputBg: 'bg-[#1c150b]',
    inputBorder: 'border-amber-900/60 focus:border-amber-400',
    inputText: 'text-white',
    inputPlaceholder: 'placeholder:text-amber-700/60',

    btnSecondaryBg: 'bg-[#1c150b]/90 hover:bg-[#2a2012]',
    btnSecondaryText: 'text-amber-200 hover:text-white',
    btnSecondaryBorder: 'border-amber-800/60',

    navBg: 'bg-[#0d0905]/92 backdrop-blur-md',
    navBorder: 'border-amber-950/80',
    navText: 'text-amber-300/70 hover:text-white',

    accentBg: 'bg-amber-500',
    accentHoverBg: 'hover:bg-amber-400',
    accentText: 'text-amber-400',
    accentBorder: 'border-amber-500/40',
    accentShadow: 'shadow-[0_0_25px_rgba(251,191,36,0.35)]',
    accentPill: 'bg-amber-500/10 text-amber-300 border-amber-500/30',
    accentBadge: 'bg-amber-400 text-zinc-950',

    heroGlow: 'bg-amber-500/15',
    heroGradient: 'from-white via-amber-200 via-amber-400 to-yellow-500',
    ctaBg: 'bg-gradient-to-r from-amber-600 to-yellow-500',

    footerBg: 'bg-[#070503]',
    footerBorder: 'border-amber-950',
    footerText: 'text-amber-200/80',
    footerMuted: 'text-amber-500/60'
  }
};

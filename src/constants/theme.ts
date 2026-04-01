// ─────────────────────────────────────────────────────────────────────────────
// THEME — edit color tokens here to restyle the entire site
// ─────────────────────────────────────────────────────────────────────────────

export type ThemeMode = 'dark' | 'light';

export interface ThemeTokens {
  /** Page background */
  bg: string;
  /** Subtle surface / card background */
  bgSurface: string;
  /** Primary text */
  text: string;
  /** Muted / secondary text */
  textMuted: string;
  /** Subtle border */
  border: string;
  /** Brand accent (buttons, highlights) */
  accent: string;
  /** Text ON the accent colour */
  accentFg: string;
  /** Outline / stroke text colour */
  outline: string;
}

export const themes: Record<ThemeMode, ThemeTokens> = {
  dark: {
    bg:        '#080808',
    bgSurface: '#111111',
    text:      '#f0ede8',
    textMuted: '#555555',
    border:    'rgba(255, 255, 255, 0.07)',
    accent:    '#d4ff00',
    accentFg:  '#080808',
    outline:   'rgba(240, 237, 232, 0.35)',
  },
  light: {
    bg:        '#f5f4f0',
    bgSurface: '#ffffff',
    text:      '#0e0e0e',
    textMuted: '#5a5a5a',
    border:    'rgba(0, 0, 0, 0.10)',
    accent:    '#ff6200',
    accentFg:  '#ffffff',
    outline:   'rgba(14, 14, 14, 0.35)',
  },
};

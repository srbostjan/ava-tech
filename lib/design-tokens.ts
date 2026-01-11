/**
 * Design Tokens
 * Valores fundamentales del Design System - AVA Tecnología
 */

export const colors = {
  white: '#FFFFFF',
  black: '#171717',

  // AVA Brand Colors
  brand: {
    DEFAULT: '#0f51fe',
    50: '#e8f0ff',
    100: '#d4e4ff',
    200: '#b0cbff',
    300: '#7aa8ff',
    400: '#3d7bff',
    500: '#0f51fe',
    600: '#0040e6',
    700: '#0033bf',
    800: '#002a9c',
    900: '#00237a',
  },

  neutral: {
    50: '#FAFAFA',
    100: '#F5F5F5',
    200: '#E5E5E5',
    300: '#D4D4D4',
    400: '#A3A3A3',
    500: '#737373',
    600: '#525252',
    700: '#404040',
    800: '#262626',
    900: '#171717',
  },

  // Legacy accent mapped to brand
  accent: {
    50: '#e8f0ff',
    500: '#0f51fe',
    600: '#0040e6',
  },

  success: {
    50: '#ECFDF5',
    500: '#10B981',
    600: '#059669',
  },

  error: {
    50: '#FEF2F2',
    500: '#EF4444',
    600: '#DC2626',
  },

  warning: {
    50: '#FFFBEB',
    500: '#F59E0B',
    600: '#D97706',
  },

  whatsapp: {
    DEFAULT: '#25D366',
    50: '#e8f7f0',
    100: '#c5ebd9',
    500: '#25D366',
    600: '#1fba57',
    700: '#1a9d4a',
  },
} as const;

export const typography = {
  fonts: {
    primary: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
  },

  weights: {
    regular: 400,
    medium: 500,
    semibold: 600,
    bold: 700,
  },

  sizes: {
    xs: '0.75rem', // 12px
    sm: '0.875rem', // 14px
    base: '1rem', // 16px
    lg: '1.125rem', // 18px
    xl: '1.25rem', // 20px
    '2xl': '1.5rem', // 24px
    '3xl': '2rem', // 32px
    '4xl': '2.5rem', // 40px
    '5xl': '3rem', // 48px
  },

  lineHeights: {
    tight: 1.2,
    normal: 1.5,
    relaxed: 1.75,
  },
} as const;

export const spacing = {
  0: '0px',
  1: '4px',
  2: '8px',
  3: '12px',
  4: '16px',
  5: '20px',
  6: '24px',
  8: '32px',
  10: '40px',
  12: '48px',
  16: '64px',
  20: '80px',
  24: '96px',
  32: '128px',
} as const;

export const borderRadius = {
  none: '0px',
  sm: '4px',
  md: '8px',
  lg: '12px',
  xl: '16px',
  '2xl': '24px',
  full: '9999px',
} as const;

export const shadows = {
  none: 'none',
  sm: '0 1px 2px 0 rgb(0 0 0 / 0.05)',
  md: '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)',
  lg: '0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)',
  xl: '0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)',
  '2xl': '0 25px 50px -12px rgb(0 0 0 / 0.25)',
  inner: 'inset 0 2px 4px 0 rgb(0 0 0 / 0.05)',
} as const;

export type ColorToken = typeof colors;
export type TypographyToken = typeof typography;
export type SpacingToken = typeof spacing;
export type BorderRadiusToken = typeof borderRadius;
export type ShadowToken = typeof shadows;

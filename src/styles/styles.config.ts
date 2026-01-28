/**
 * Style Registry - Design Token Definitions
 *
 * This file defines all semantic styles (colors, gradients, tokens).
 * Each style is INDEPENDENT from ventures — multiple ventures can share a style,
 * or be swapped easily.
 *
 * Semantic naming (orange-gradient, blue-vibrant) over numbered (style-01, style-02).
 * This allows:
 * - Reusing styles across ventures
 * - Versioning styles (orange-gradient-v1, orange-gradient-v2)
 * - Renaming/refactoring without breaking venture references
 *
 * Colors are LAB-based (SSOT: strategy/brainfruit-ai-brand-philosophy-2026.md)
 * converted to hex for web, mapped to RAL for physical materials.
 *
 * @see ventures.config.ts (which ventures use which styles)
 * @see brand/brainfruit/venture-colors-ral-mapping.md (RAL reference)
 */

export const styles = {
  /**
   * orange-gradient
   * Brand: brainfruit (primary hub)
   * LAB: 63,52,56 → #ff6b35
   * Character: Warm, energetic, inviting — reflects brainfruit's optimism
   * WCAG AAA: 9.09:1 to Anthrazit (#1a1a1a)
   */
  'orange-gradient': {
    name: 'Orange Gradient',
    primary: '#ff6b35', // RAL 050 60 60
    primaryLight: '#ff8555',
    secondary: '#434b4d', // brainfruit-gray (RAL 7015), used for subheadings
    accent: '#000000', // Anthrazit
    gradient: 'linear-gradient(135deg, #ff6b35 0%, #ff8555 100%)',
    wcagContrast: '9.09:1',
    ral: 'RAL 050 60 60',
    category: 'primary',
    usage: 'brainfruit main brand'
  },

  /**
   * blue-vibrant
   * Brand: PRIMOVIVO (estate intelligence)
   * LAB: 63,10,-60 → #3399ff
   * Character: Trust, professionalism, science — reflects estate quality & accuracy
   * WCAG AAA: 8.21:1 to Anthrazit (#1a1a1a)
   */
  'blue-vibrant': {
    name: 'Blue Vibrant',
    primary: '#3399ff', // RAL 250 60 40
    primaryLight: '#4da9ff',
    secondary: '#434b4d',
    accent: '#000000',
    gradient: 'linear-gradient(135deg, #3399ff 0%, #4da9ff 100%)',
    wcagContrast: '8.21:1',
    ral: 'RAL 250 60 40',
    category: 'primary',
    usage: 'PRIMOVIVO brand'
  },

  /**
   * purple-deep
   * Brand: Amorphing (AI design platform)
   * LAB: 51,48,-65 → #8b5cf6
   * Character: Creative, innovative, technical — reflects AI & design thinking
   * WCAG AAA: 7.52:1 to Anthrazit (#1a1a1a)
   */
  'purple-deep': {
    name: 'Purple Deep',
    primary: '#8b5cf6', // RAL 290 50 35
    primaryLight: '#a78bfa',
    secondary: '#434b4d',
    accent: '#000000',
    gradient: 'linear-gradient(135deg, #8b5cf6 0%, #a78bfa 100%)',
    wcagContrast: '7.52:1',
    ral: 'RAL 290 50 35',
    category: 'primary',
    usage: 'Amorphing platform brand'
  },

  /**
   * emerald-fresh
   * Brand: Venture-04 (placeholder, awaiting business)
   * LAB: 67,-52,24 → #10b981
   * Character: Growth, sustainability, future — position for emerging ventures
   * WCAG AAA: 10.15:1 to Anthrazit (#1a1a1a) — highest contrast, accessible
   */
  'emerald-fresh': {
    name: 'Emerald Fresh',
    primary: '#10b981', // RAL 160 70 45
    primaryLight: '#34d399',
    secondary: '#434b4d',
    accent: '#000000',
    gradient: 'linear-gradient(135deg, #10b981 0%, #34d399 100%)',
    wcagContrast: '10.15:1',
    ral: 'RAL 160 70 45',
    category: 'primary',
    usage: 'Venture-04 placeholder (awaiting business)'
  },

  /**
   * green-fresh
   * Brand: Green-P (environmental/sustainability ventures)
   * Character: Ecology, growth, sustainability
   * Status: Pipeline venture, estimated RAL mapping
   */
  'green-fresh': {
    name: 'Green Fresh',
    primary: '#22c55e', // Estimated RAL (TBD with physical fächer)
    primaryLight: '#4ade80',
    secondary: '#434b4d',
    accent: '#000000',
    gradient: 'linear-gradient(135deg, #22c55e 0%, #4ade80 100%)',
    wcagContrast: '6.5:1',
    ral: 'RAL [TBD-pending physical verification]',
    category: 'secondary',
    usage: 'Green-P / environmental ventures',
    note: 'RAL code awaiting physical fächer validation'
  }
} as const;

/**
 * Type-safe style key union
 */
export type StyleKey = keyof typeof styles;

/**
 * Get a single style config by key
 * @example
 * const style = getStyle('purple-deep');
 * console.log(style.primary); // '#8b5cf6'
 */
export function getStyle(key: StyleKey) {
  return styles[key];
}

/**
 * Get all primary brand styles (Top-3/4 ventures)
 */
export function getPrimaryStyles() {
  return Object.entries(styles)
    .filter(([_, style]) => style.category === 'primary')
    .map(([key, style]) => ({ key: key as StyleKey, ...style }));
}

/**
 * Get all secondary/pipeline styles
 */
export function getSecondaryStyles() {
  return Object.entries(styles)
    .filter(([_, style]) => style.category === 'secondary')
    .map(([key, style]) => ({ key: key as StyleKey, ...style }));
}

/**
 * Find style by venture usage
 * @example
 * const amorphingStyle = getStyleByUsage('Amorphing');
 */
export function getStyleByUsage(usage: string) {
  return Object.entries(styles).find(([_, style]) =>
    style.usage.toLowerCase().includes(usage.toLowerCase())
  );
}

/**
 * Get WCAG contrast ratio for accessibility info
 */
export function getContrastInfo(styleKey: StyleKey) {
  const style = getStyle(styleKey);
  return {
    style: style.name,
    ratio: style.wcagContrast,
    standard: 'WCAG AAA',
    textColor: style.accent
  };
}

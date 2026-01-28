/**
 * Venture Registry - Single Source of Truth
 *
 * This file defines all ventures in the brainfruit ecosystem.
 * Each venture has:
 * - name: Display name
 * - domain: Website domain
 * - style: Reference to a style from styles.config.ts (semantic, not numbered)
 * - logo: Logo configuration (initial letter, position)
 * - typography: Font settings
 * - status: 'active' (Top-3) or 'pipeline' (Second-7)
 *
 * Changes here auto-ripple to all websites using VentureLayout components.
 * NO venture IDs/numbers — only names, because ventures come & go monthly.
 *
 * @see styles.config.ts for color/gradient definitions
 * @see ventures-REGISTRY.md for handbook
 */

export const ventures = {
  /**
   * brainfruit - Main consulting & incubation hub
   * Status: Active (Top-3)
   * Style: Orange (warm, energetic, primary brainfruit brand)
   */
  brainfruit: {
    name: 'brainfruit',
    domain: 'brainfruit.com',
    style: 'orange-gradient',
    logo: {
      initial: 'b',
      position: 'lowercase' // brainfruit brand uses lowercase
    },
    typography: {
      headingFont: 'Bitter', // SSOT: Bitter SemiBold for logos
      bodyFont: 'Roboto' // System fonts for body, Roboto fallback for web
    },
    status: 'active',
    description: 'AI-First Venture Studio & Strategic Consulting'
  },

  /**
   * PRIMOVIVO - Estate Intelligence & Medical-Grade Living
   * Status: Active (Top-3)
   * Style: Blue (trustworthy, scientific, professional)
   */
  primovivo: {
    name: 'PRIMOVIVO',
    domain: 'primovivo.com',
    style: 'blue-vibrant',
    logo: {
      initial: 'P',
      position: 'uppercase' // PRIMOVIVO brand uses uppercase
    },
    typography: {
      headingFont: 'Bitter',
      bodyFont: 'Roboto'
    },
    status: 'active',
    description: 'Medical-Grade Living Analytics & Estate Intelligence'
  },

  /**
   * Amorphing - AI Platform & Design Tool
   * Status: Active (Top-3)
   * Style: Purple (creative, innovative, technical)
   */
  amorphing: {
    name: 'Amorphing',
    domain: 'amorphing.com',
    style: 'purple-deep',
    logo: {
      initial: 'A',
      position: 'uppercase'
    },
    typography: {
      headingFont: 'Bitter',
      bodyFont: 'Roboto'
    },
    status: 'active',
    description: 'AI Design System Platform'
  },

  /**
   * Venture-04 (Placeholder) - Emerald
   * Status: Pipeline (awaiting business assignment)
   * Style: Emerald (growth, sustainability, future-facing)
   *
   * This slot is reserved for the next venture to enter Top-3.
   * Once a business concept is approved, update status & name.
   */
  'venture-04': {
    name: 'Venture-04',
    domain: 'venture-04.local', // Placeholder domain
    style: 'emerald-fresh',
    logo: {
      initial: 'V',
      position: 'uppercase'
    },
    typography: {
      headingFont: 'Bitter',
      bodyFont: 'Roboto'
    },
    status: 'pipeline',
    description: 'Placeholder — awaiting business assignment'
  },

  /**
   * GREEN-P (Example Pipeline Venture)
   * Status: Pipeline (Second-7)
   * Style: Green (environmental, sustainable)
   *
   * Example of a Second-7 venture that may be promoted to Top-3.
   * Keep this if Green-P is actively explored, remove if deprioritized.
   */
  'green-p': {
    name: 'Green-P',
    domain: 'green-p.ventures.brainfruit.com',
    style: 'green-fresh',
    logo: {
      initial: 'G',
      position: 'uppercase'
    },
    typography: {
      headingFont: 'Bitter',
      bodyFont: 'Roboto'
    },
    status: 'pipeline',
    description: 'Sustainability Tech Platform'
  }
} as const;

/**
 * Type-safe venture key union
 */
export type VentureKey = keyof typeof ventures;

/**
 * Get a single venture config by key
 * @example
 * const venture = getVenture('amorphing');
 * console.log(venture.name); // 'Amorphing'
 */
export function getVenture(key: VentureKey) {
  return ventures[key];
}

/**
 * Get all active ventures (Top-3)
 * @example
 * const topThree = getActiveVentures();
 */
export function getActiveVentures() {
  return Object.entries(ventures)
    .filter(([_, venture]) => venture.status === 'active')
    .map(([key, venture]) => ({ key: key as VentureKey, ...venture }));
}

/**
 * Get all pipeline ventures (Second-7)
 * @example
 * const pipeline = getPipelineVentures();
 */
export function getPipelineVentures() {
  return Object.entries(ventures)
    .filter(([_, venture]) => venture.status === 'pipeline')
    .map(([key, venture]) => ({ key: key as VentureKey, ...venture }));
}

/**
 * Get all ventures sorted by status
 * @example
 * const all = getAllVentures(); // [active...., pipeline....]
 */
export function getAllVentures() {
  return Object.entries(ventures)
    .map(([key, venture]) => ({ key: key as VentureKey, ...venture }))
    .sort((a, b) => {
      // Active first, then pipeline
      if (a.status !== b.status) {
        return a.status === 'active' ? -1 : 1;
      }
      return a.name.localeCompare(b.name);
    });
}

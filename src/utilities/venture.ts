/**
 * Venture Utilities
 *
 * Helper functions for working with ventures and styles across Astro components.
 * These functions provide type-safe access to venture + style data.
 */

import { ventures, type VentureKey, getVenture as getVentureConfig, getActiveVentures, getPipelineVentures, getAllVentures } from '../ventures/ventures.config';
import { styles, type StyleKey, getStyle as getStyleConfig } from '../styles/styles.config';

/**
 * Combined venture + style data structure
 */
export interface VentureWithStyle {
  key: VentureKey;
  venture: ReturnType<typeof getVentureConfig>;
  style: ReturnType<typeof getStyleConfig>;
}

/**
 * Get venture with its associated style
 * @example
 * const ventureData = getVentureWithStyle('amorphing');
 * console.log(ventureData.style.primary); // '#8b5cf6'
 */
export function getVentureWithStyle(ventureKey: VentureKey): VentureWithStyle {
  const venture = getVentureConfig(ventureKey);
  const style = getStyleConfig(venture.style);

  return {
    key: ventureKey,
    venture,
    style
  };
}

/**
 * Get all active ventures with their styles
 */
export function getActiveVenturesWithStyles() {
  return getActiveVentures().map(({ key, ...venture }) => ({
    key: key as VentureKey,
    venture: { ...venture },
    style: getStyleConfig(venture.style)
  }));
}

/**
 * Get all pipeline ventures with their styles
 */
export function getPipelineVenturesWithStyles() {
  return getPipelineVentures().map(({ key, ...venture }) => ({
    key: key as VentureKey,
    venture: { ...venture },
    style: getStyleConfig(venture.style)
  }));
}

/**
 * Get all ventures with their styles
 */
export function getAllVenturesWithStyles() {
  return getAllVentures().map(({ key, ...venture }) => ({
    key: key as VentureKey,
    venture: { ...venture },
    style: getStyleConfig(venture.style)
  }));
}

/**
 * Validate that a string is a valid VentureKey
 * Useful for dynamic routing (astro has no built-in type guards)
 */
export function isValidVentureKey(value: any): value is VentureKey {
  return typeof value === 'string' && value in ventures;
}

/**
 * Get venture by domain
 * Useful for multi-domain deployments
 */
export function getVentureByDomain(domain: string): VentureWithStyle | null {
  const key = Object.keys(ventures).find(
    (k) => getVentureConfig(k as VentureKey).domain === domain
  ) as VentureKey | undefined;

  return key ? getVentureWithStyle(key) : null;
}

/**
 * Format venture status for display
 */
export function formatVentureStatus(status: 'active' | 'pipeline'): string {
  return status === 'active' ? 'Top-3' : 'Pipeline (Second-7)';
}

/**
 * Get contrast info for accessibility
 */
export function getContrastInfo(ventureKey: VentureKey) {
  const { style } = getVentureWithStyle(ventureKey);
  return {
    venture: style.name,
    ratio: style.wcagContrast,
    level: 'WCAG AAA',
    foreground: style.primary,
    background: '#1a1a1a' // Anthrazit
  };
}

/**
 * Export color as different formats for flexibility
 */
export function getColorFormats(hex: string) {
  return {
    hex,
    // Can add RGB, HSL, LAB here later
  };
}

type ExportType = 'csv' | 'json' | 'md';

/**
 * Export venture registry as different formats
 */
export function exportVentureRegistry(format: ExportType): string {
  const allVentures = getAllVenturesWithStyles();

  switch (format) {
    case 'json':
      return JSON.stringify(allVentures, null, 2);

    case 'csv':
      const headers = ['Key', 'Name', 'Domain', 'Style', 'Status', 'Primary Color'];
      const rows = allVentures.map((v) => [
        v.key,
        v.venture.name,
        v.venture.domain,
        v.venture.style,
        v.venture.status,
        v.style.primary
      ]);
      return [headers, ...rows].map((row) => row.join(',').replace(/,/g, '\t')).join('\n');

    case 'md':
      let md = '| Key | Name | Domain | Style | Status | Color |\n';
      md += '|-|-|-|-|-|-|\n';
      for (const v of allVentures) {
        md += `| ${v.key} | ${v.venture.name} | ${v.venture.domain} | ${v.venture.style} | ${v.venture.status} | <span style="color:${v.style.primary}">●</span> ${v.style.primary} |\n`;
      }
      return md;

    default:
      throw new Error(`Unsupported export format: ${format}`);
  }
}

// @ts-check
import { defineConfig } from 'astro/config';

/**
 * Astro Config for Universal Venture System
 *
 * This config supports building for multiple ventures from one codebase.
 * Set BUILD_FOR_VENTURE environment variable to select which venture to build.
 *
 * Examples:
 *   BUILD_FOR_VENTURE=amorphing npm run build
 *   BUILD_FOR_VENTURE=brainfruit npm run dev
 *   BUILD_FOR_VENTURE=primovivo npm run preview
 */

const ventureKey = process.env.BUILD_FOR_VENTURE || 'amorphing';

console.log(`🚀 Building for venture: ${ventureKey}`);

// https://astro.build/config
export default defineConfig({
  vite: {
    define: {
      'import.meta.env.BUILD_FOR_VENTURE': JSON.stringify(ventureKey)
    }
  }
});

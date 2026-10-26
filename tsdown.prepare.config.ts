/**
 * Fallback bundle for a git install whose checkout has no prebuilt `lib/`.
 * `scripts/prepare.mjs` skips this when the published entrypoints are already
 * present: this build replaces tsc's `lib/index.js` with one bundle and does
 * not emit `.d.ts`. Every `@deepseek-ai` specifier stays external — they
 * resolve from the dsh installation at runtime. Local development uses
 * `pnpm build` (tsc + tsdown), which also emits type declarations.
 */
import { defineConfig } from 'tsdown'
import clientConfig from './tsdown.config.ts'

export default defineConfig([{
  name: 'dsh-plugin-subscriptions',
  entry: { index: 'src/index.ts' },
  outDir: 'lib',
  format: ['esm'],
  platform: 'node',
  target: 'es2024',
  fixedExtension: false,
  dts: false,
  clean: false,
}, clientConfig])

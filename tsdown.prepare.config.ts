/**
 * Manual fallback bundle for a source checkout that has no prebuilt `lib/`.
 * It is not an install script: pnpm 10 refuses a git dependency that defines
 * `prepare` unless the consumer allowlists it, and this build would also
 * replace tsc's `lib/index.js` without emitting `.d.ts`. Run
 * `tsdown -c tsdown.prepare.config.ts` only when `lib/` is absent. Every
 * `@deepseek-ai` specifier stays external. Local development uses
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

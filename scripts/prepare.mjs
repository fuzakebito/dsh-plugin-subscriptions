/**
 * `prepare` runs on local install and on git installs. The published
 * entrypoints are committed under `lib/`. The fallback bundle replaces
 * tsc's `lib/index.js` and does not emit `.d.ts`, so it must not run when
 * those files are already present.
 */
import { spawnSync } from 'node:child_process'
import { existsSync } from 'node:fs'

const entrypoints = [
  'lib/index.js',
  'lib/index.d.ts',
  'lib/client.js',
  'lib/client/index.d.ts',
]

if (entrypoints.every(path => existsSync(path))) process.exit(0)

const result = spawnSync('tsdown', ['-c', 'tsdown.prepare.config.ts'], {
  stdio: 'inherit',
  shell: process.platform === 'win32',
})
process.exit(result.status ?? 1)

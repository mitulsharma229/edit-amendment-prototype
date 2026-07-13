// Bundles the app using esbuild-wasm (pure WebAssembly, no native binary).
// Needed because WDAC on this machine blocks the unsigned native esbuild.exe.
import { build } from 'esbuild-wasm';
import { writeFileSync, mkdirSync } from 'node:fs';

// In Node, esbuild-wasm auto-starts its WASM service via `node` (no native
// binary), so no initialize() options are required.

const prod = process.argv.includes('--prod');

mkdirSync('dist', { recursive: true });

const ctx = await build({
  entryPoints: ['src/main.tsx'],
  bundle: true,
  outfile: 'dist/app.js',
  format: 'esm',
  platform: 'browser',
  target: ['es2020'],
  jsx: 'automatic',
  loader: { '.tsx': 'tsx', '.ts': 'ts', '.js': 'js', '.jsx': 'jsx' },
  define: { 'process.env.NODE_ENV': prod ? '"production"' : '"development"' },
  minify: prod,
  sourcemap: !prod,
  logLevel: 'info',
});

writeFileSync(
  'dist/index.html',
  `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Edit Amendment</title>
    <style>body { margin: 0; padding: 0; font-family: 'Segoe UI', sans-serif; }</style>
  </head>
  <body>
    <div id="root"></div>
    <script type="module" src="./app.js"></script>
  </body>
</html>
`
);

console.log(`Build complete (${prod ? 'production' : 'development'}) -> dist/`);
process.exit(0);

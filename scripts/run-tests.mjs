import { build } from 'esbuild';
import { mkdir, rm } from 'node:fs/promises';
import { fileURLToPath, pathToFileURL } from 'node:url';
import path from 'node:path';

const projectRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const outputDirectory = path.join(projectRoot, '.test-build');
const outputFile = path.join(outputDirectory, 'calculator.test.mjs');

await rm(outputDirectory, { recursive: true, force: true });
await mkdir(outputDirectory, { recursive: true });

await build({
  absWorkingDir: projectRoot,
  entryPoints: ['tests/calculator.test.ts'],
  bundle: true,
  platform: 'node',
  format: 'esm',
  outfile: outputFile,
  logLevel: 'silent',
});

try {
  await import(`${pathToFileURL(outputFile).href}?t=${Date.now()}`);
} finally {
  await rm(outputDirectory, { recursive: true, force: true });
}

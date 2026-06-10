import sharp from 'sharp';
import { readdir, stat, unlink } from 'fs/promises';
import { join, extname, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, '..', 'public', 'assets', 'img');
const SUPPORTED = new Set(['.jpg', '.jpeg', '.png']);

let totalOriginal = 0;
let totalConverted = 0;
let count = 0;

async function* walk(dir) {
  for (const entry of await readdir(dir, { withFileTypes: true })) {
    const full = join(dir, entry.name);
    if (entry.isDirectory()) yield* walk(full);
    else yield full;
  }
}

async function convert(src) {
  const ext = extname(src).toLowerCase();
  if (!SUPPORTED.has(ext)) return;

  const dest = src.replace(/\.(jpg|jpeg|png)$/i, '.webp');
  const { size: srcSize } = await stat(src);

  await sharp(src)
    .rotate()
    .resize({ width: 1200, withoutEnlargement: true })
    .webp({ quality: 82, effort: 4 })
    .toFile(dest);

  const { size: destSize } = await stat(dest);
  const saved = ((srcSize - destSize) / srcSize * 100).toFixed(1);

  totalOriginal += srcSize;
  totalConverted += destSize;
  count++;

  const rel = src.replace(ROOT + '/', '');
  console.log(`✓ ${rel} → .webp  (${(srcSize / 1024).toFixed(0)}kB → ${(destSize / 1024).toFixed(0)}kB, -${saved}%)`);

  // Remove original only after successful conversion
  await unlink(src);
}

for await (const file of walk(ROOT)) {
  await convert(file);
}

const totalSaved = totalOriginal - totalConverted;
console.log(`\n━━━ Resultado ━━━`);
console.log(`${count} imagens convertidas`);
console.log(`Antes:  ${(totalOriginal / 1024 / 1024).toFixed(1)} MB`);
console.log(`Depois: ${(totalConverted / 1024 / 1024).toFixed(1)} MB`);
console.log(`Economia: ${(totalSaved / 1024 / 1024).toFixed(1)} MB (${(totalSaved / totalOriginal * 100).toFixed(1)}%)`);

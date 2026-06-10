import sharp from 'sharp';
import path from 'path';

const SRC = 'C:/Users/syste/OneDrive/Desktop/TwinOaksEngagement/Sparrow Photos/Professional Promotional Photos';
const DEST = 'C:/Users/syste/OneDrive/Desktop/TwinOaksEngagement/sparrow-website/public/images';

const tasks = [
  // Hero video poster — wide hillside panoramic, man overlooking Corvallis at dusk
  { src: 'SPR-6.jpg',                         dest: 'hero-poster.webp',           width: 1920 },
  // Hero image fallback — families walking together, warm community feel
  { src: 'SPR-11 (Hero Pic).jpg',             dest: 'hero-community-walk.webp',   width: 1920 },
  // Twin Oaks program card — man walking through the community interior
  { src: 'SPR-9.jpg',                         dest: 'twin-oaks/hero.webp',         width: 1200 },
  // LifeChange program card — families walking together
  { src: 'SPR-11 (Hero Pic).jpg',             dest: 'life-change/hero.webp',       width: 1200 },
  // Additional high-quality shots for future use
  { src: 'SPR-10.jpg',                        dest: 'twin-oaks-sign.webp',         width: 1200 },
  { src: 'SPR-16.jpg',                        dest: 'corvallis-golden-hour.webp',  width: 1920 },
  { src: 'SPR-18 (hero pic).jpg',             dest: 'hero-sunset.webp',            width: 1920 },
  { src: 'Twin_oaks-9169 (hero pic).jpg',     dest: 'twin-oaks-entrance.webp',     width: 900  },
  { src: 'Twin_oaks-9201.jpg',                dest: 'twin-oaks-home.webp',         width: 900  },
];

for (const { src, dest, width } of tasks) {
  const input  = path.join(SRC, src);
  const output = path.join(DEST, dest);
  await sharp(input)
    .resize({ width, withoutEnlargement: true })
    .webp({ quality: 82 })
    .toFile(output);
  const { size } = await import('fs').then(fs => fs.promises.stat(output));
  console.log(`✓  ${dest}  (${Math.round(size / 1024)} KB)`);
}

console.log('\nDone.');

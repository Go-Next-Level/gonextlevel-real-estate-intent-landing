import { readFile, readdir, stat } from 'node:fs/promises';
import { join, relative } from 'node:path';

const projectRoot = new URL('../', import.meta.url).pathname.replace(/^\/(.:)/, '$1');
const sourceRoot = join(projectRoot, 'src');
const distRoot = join(projectRoot, 'dist');

async function walk(directory) {
  const entries = await readdir(directory);
  const files = [];
  for (const entry of entries) {
    const path = join(directory, entry);
    if ((await stat(path)).isDirectory()) files.push(...await walk(path));
    else files.push(path);
  }
  return files;
}

const failures = [];
const sourceFiles = (await walk(sourceRoot)).filter((file) => /\.(astro|css|ts)$/.test(file));
const antiPatterns = [
  ['transition: all', /transition\s*:\s*all\b/i],
  ['disabled browser zoom', /(?:user-scalable\s*=\s*no|maximum-scale\s*=\s*1)/i],
  ['outline removed without a replacement', /outline\s*:\s*(?:none|0)\b/i],
  ['blocking paste', /onPaste[\s\S]{0,120}preventDefault/i],
  ['off-brand GSAP dependency', /cdn\.jsdelivr\.net\/npm\/gsap/i],
];

for (const file of sourceFiles) {
  const source = await readFile(file, 'utf8');
  const name = relative(projectRoot, file);
  for (const [label, pattern] of antiPatterns) if (pattern.test(source)) failures.push(`${name}: ${label}`);
}

const globalCss = await readFile(join(sourceRoot, 'styles', 'global.css'), 'utf8');
for (const [label, pattern] of [
  ['global visible focus treatment', /:focus-visible\s*\{/],
  ['reduced-motion treatment', /prefers-reduced-motion:\s*reduce/],
  ['16px base body size', /body\s*\{[\s\S]*?font-size:\s*16px/],
  ['touch-action optimization', /touch-action:\s*manipulation/],
  ['anchor scroll offset', /scroll-margin-top:/],
  ['AA utility-text contrast token', /--text-3:\s*rgba\(255,\s*255,\s*255,\s*0\.(?:5[0-9]|[6-9][0-9])\)/],
]) if (!pattern.test(globalCss)) failures.push(`src/styles/global.css: missing ${label}`);

const topbar = await readFile(join(sourceRoot, 'components', 'Topbar.astro'), 'utf8');
for (const [label, pattern] of [
  ['mobile menu button', /<button[^>]+data-mobile-nav-trigger/],
  ['mobile menu expanded state', /aria-expanded="false"/],
  ['mobile menu relationship', /aria-controls="mobile-navigation-panel"/],
  ['active-page navigation state', /aria-current=/],
]) if (!pattern.test(topbar)) failures.push(`src/components/Topbar.astro: missing ${label}`);

const htmlFiles = (await walk(distRoot)).filter((file) => file.endsWith('.html'));
for (const file of htmlFiles) {
  const html = await readFile(file, 'utf8');
  const name = relative(distRoot, file);
  if (!html.includes('class="skip-link"')) failures.push(`${name}: missing skip link`);
  for (const image of html.matchAll(/<img\b[^>]*>/gi)) {
    const tag = image[0];
    if (!/\balt="[^"]*"/i.test(tag)) failures.push(`${name}: image missing alt`);
    if (!/\bwidth="\d+"/i.test(tag) || !/\bheight="\d+"/i.test(tag)) failures.push(`${name}: image missing dimensions`);
  }
}

console.log(`Audited ${sourceFiles.length} source files and ${htmlFiles.length} rendered pages.`);
if (failures.length) {
  console.error(failures.map((item) => `- ${item}`).join('\n'));
  process.exitCode = 1;
} else {
  console.log('UI audit passed: focus, motion, touch, contrast tokens, navigation semantics, skip links, and image dimensions are enforced.');
}

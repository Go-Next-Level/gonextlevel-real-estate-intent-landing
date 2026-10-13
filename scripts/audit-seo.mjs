import { access, readdir, readFile, stat } from 'node:fs/promises';
import { join, relative } from 'node:path';

const dist = new URL('../dist/', import.meta.url);
const root = dist.pathname.replace(/^\/(.:)/, '$1');

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

const htmlFiles = (await walk(root)).filter((file) => file.endsWith('.html'));
const required = [
  ['title', /<title>[^<]+<\/title>/i],
  ['description', /<meta name="description" content="[^"]+"/i],
  ['canonical', /<link rel="canonical" href="[^"]+"/i],
  ['h1', /<h1(?:\s|>)/i],
  ['json-ld', /application\/ld\+json/i],
];
const failures = [];
const titles = new Map();

for (const file of htmlFiles) {
  const html = await readFile(file, 'utf8');
  const name = relative(root, file);
  const schemaTypes = new Set();
  for (const [label, pattern] of required) if (!pattern.test(html)) failures.push(`${name}: missing ${label}`);
  for (const match of html.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/gi)) {
    try {
      const schema = JSON.parse(match[1]);
      const nodes = Array.isArray(schema['@graph']) ? schema['@graph'] : [schema];
      for (const node of nodes) {
        const types = Array.isArray(node?.['@type']) ? node['@type'] : [node?.['@type']];
        for (const type of types) if (type) schemaTypes.add(type);
      }
    } catch { failures.push(`${name}: invalid JSON-LD`); }
  }
  if (name === 'index.html') {
    for (const type of ['WebSite', 'Organization']) if (!schemaTypes.has(type)) failures.push(`${name}: missing ${type} schema`);
  } else if (name !== '404.html' && !schemaTypes.has('BreadcrumbList')) {
    failures.push(`${name}: missing BreadcrumbList schema`);
  }
  for (const match of html.matchAll(/href="(\/[^"#?]*)/gi)) {
    const href = match[1];
    if (href === '/') continue;
    const destination = href.endsWith('/') ? join(root, href.slice(1), 'index.html') : join(root, href.slice(1));
    try { await access(destination); } catch { failures.push(`${name}: broken internal link ${href}`); }
  }
  const title = html.match(/<title>([^<]+)<\/title>/i)?.[1];
  if (title) titles.set(title, [...(titles.get(title) ?? []), name]);
}

for (const [title, files] of titles) if (files.length > 1) failures.push(`Duplicate title "${title}": ${files.join(', ')}`);
for (const asset of ['robots.txt', 'llms.txt', 'sitemap.xml']) {
  try { await stat(join(root, asset)); } catch { failures.push(`missing ${asset}`); }
}

console.log(`Audited ${htmlFiles.length} generated HTML pages.`);
if (failures.length) {
  console.error(failures.map((item) => `- ${item}`).join('\n'));
  process.exitCode = 1;
} else {
  console.log('SEO audit passed: titles, descriptions, canonicals, H1s, JSON-LD, robots, llms.txt, and sitemap.xml are present.');
}

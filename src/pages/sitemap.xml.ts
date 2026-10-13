import { seoPages } from '../data/seoPages';
import { getCollection } from 'astro:content';

export async function GET({ site }: { site: URL }) {
  const siteUrl = site?.href ?? 'https://realestateintent.com/';
  const guides = await getCollection('guides', ({ data }) => !data.draft);
  const pages = [
    '', 'privacy', 'terms', 'acceptable-use', 'compliance', 'resources/guides',
    ...seoPages.map((page) => page.slug),
    ...guides.map((guide) => `resources/guides/${guide.id}`),
  ];

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${pages.map(page => `  <url>
    <loc>${siteUrl}${page ? page + '/' : ''}</loc>
    <changefreq>weekly</changefreq>
    <priority>${page === '' ? '1.0' : page.split('/').length === 1 ? '0.8' : '0.7'}</priority>
  </url>`).join('\n')}
</urlset>`;

  return new Response(xml, {
    headers: { 'Content-Type': 'application/xml' },
  });
}

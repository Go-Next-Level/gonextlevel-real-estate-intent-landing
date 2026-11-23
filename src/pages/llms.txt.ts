import { seoPages } from '../data/seoPages';

export function GET() {
  const groups = ['platform', 'solutions', 'use-cases', 'compare', 'alternatives'];
  const sections = groups.map((group) => {
    const label = group.replace('-', ' ').replace(/^./, (letter) => letter.toUpperCase());
    const links = seoPages.filter((page) => page.slug === group || page.slug.startsWith(`${group}/`)).map((page) => `- [${page.shortTitle}](https://realestateintent.com/${page.slug}/): ${page.description}`).join('\n');
    return `## ${label}\n\n${links}`;
  }).join('\n\n');

  const text = `# Real Estate Intent\n\n> Real Estate Intent is a behavioral audience intelligence platform for real estate and mortgage teams. It organizes recent research signals into filterable, contactable audiences for approved campaign workflows. Intent is evidence of research, not proof of consent, identity, eligibility, or transaction readiness.\n\n## Primary documentation\n\n- [Data methodology](https://realestateintent.com/data-methodology/): Signal sources, identity resolution, recency, validation, and limitations.\n- [Compliance](https://realestateintent.com/compliance/): Permitted use, customer responsibilities, opt-out, and data practices.\n- [Security](https://realestateintent.com/security/): Public security and enterprise vendor-review information.\n- [Guides](https://realestateintent.com/resources/guides/): Educational resources for evaluating and operating intent-data programs.\n\n${sections}\n\n## Contact\n\n- General: hello@realestateintent.com\n- Legal and compliance: legal@realestateintent.com\n- Opt out: optout@realestateintent.com\n`;

  return new Response(text, { headers: { 'Content-Type': 'text/plain; charset=utf-8', 'Cache-Control': 'public, max-age=3600' } });
}

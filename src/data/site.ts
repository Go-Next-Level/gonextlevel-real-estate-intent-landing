export const SITE = {
  name: 'Real Estate Intent',
  url: 'https://realestateintent.com',
  appUrl: 'https://app.realestateintent.com',
  description: 'Person-level behavioral intent data and audience activation for real estate and mortgage teams.',
  parent: 'Next Level Web Design LLC',
  email: 'hello@realestateintent.com',
  legalEmail: 'legal@realestateintent.com',
  optOutEmail: 'optout@realestateintent.com',
  founded: '2026',
} as const;

export const primaryNavigation = [
  { label: 'Platform', href: '/platform/' },
  { label: 'Solutions', href: '/solutions/' },
  { label: 'Use cases', href: '/use-cases/' },
  { label: 'Compare', href: '/compare/' },
  { label: 'Resources', href: '/resources/' },
  { label: 'Pricing', href: '/pricing/' },
];

export const footerNavigation = [
  {
    label: 'Platform',
    links: [
      { label: 'Behavioral intent data', href: '/platform/behavioral-intent-data/' },
      { label: 'Identity resolution', href: '/platform/identity-resolution/' },
      { label: 'Audience builder', href: '/platform/audience-builder/' },
      { label: 'Exports & webhooks', href: '/platform/exports-and-webhooks/' },
    ],
  },
  {
    label: 'Solutions',
    links: [
      { label: 'Real estate brokerages', href: '/solutions/real-estate-brokerages/' },
      { label: 'Mortgage lenders', href: '/solutions/mortgage-lenders/' },
      { label: 'Loan officers', href: '/solutions/loan-officers/' },
      { label: 'Real estate investors', href: '/solutions/real-estate-investors/' },
    ],
  },
  {
    label: 'Learn',
    links: [
      { label: 'Guides', href: '/resources/guides/' },
      { label: 'Comparisons', href: '/compare/' },
      { label: 'Data methodology', href: '/data-methodology/' },
      { label: 'Compliance', href: '/compliance/' },
    ],
  },
];

export const organizationSchema = {
  '@type': 'Organization',
  '@id': `${SITE.url}/#organization`,
  name: SITE.name,
  url: SITE.url,
  logo: {
    '@type': 'ImageObject',
    url: `${SITE.url}/logo-mark-v2.png`,
    width: 512,
    height: 512,
  },
  description: SITE.description,
  foundingDate: SITE.founded,
  parentOrganization: {
    '@type': 'Organization',
    name: SITE.parent,
    url: 'https://gonextlevel.ai',
  },
  contactPoint: {
    '@type': 'ContactPoint',
    contactType: 'customer support',
    email: SITE.email,
  },
};

export const softwareSchema = {
  '@type': 'SoftwareApplication',
  '@id': `${SITE.url}/#software`,
  name: SITE.name,
  applicationCategory: 'BusinessApplication',
  operatingSystem: 'Web',
  url: SITE.url,
  description: SITE.description,
  publisher: { '@id': `${SITE.url}/#organization` },
  offers: {
    '@type': 'Offer',
    name: 'Beta / Founders Program',
    price: '997',
    priceCurrency: 'USD',
    url: `${SITE.url}/pricing/`,
    priceSpecification: {
      '@type': 'UnitPriceSpecification',
      price: '997',
      priceCurrency: 'USD',
      billingDuration: 'P1M',
    },
  },
};


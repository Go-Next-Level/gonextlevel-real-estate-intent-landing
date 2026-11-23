export interface Claim {
  id: string;
  subject: string;
  statement: string;
  sourceLabel: string;
  sourceUrl: string;
  verifiedAt: string;
  expiresAt: string;
}

export const claims: Claim[] = [
  {
    id: 'rei.daily-cadence',
    subject: 'Real Estate Intent',
    statement: 'The platform states that intent data is refreshed on a daily cadence and supports signal windows from roughly 48 hours to 30 days.',
    sourceLabel: 'Real Estate Intent compliance page',
    sourceUrl: 'https://realestateintent.com/compliance/',
    verifiedAt: '2026-10-13',
    expiresAt: '2027-01-13',
  },
  {
    id: 'rei.delivery',
    subject: 'Real Estate Intent',
    statement: 'Public product materials describe CSV exports, advertising audience destinations, and webhook delivery.',
    sourceLabel: 'Real Estate Intent homepage',
    sourceUrl: 'https://realestateintent.com/',
    verifiedAt: '2026-10-13',
    expiresAt: '2027-01-13',
  },
  {
    id: 'intentgrid.category',
    subject: 'IntentGrid',
    statement: 'IntentGrid markets real estate and mortgage audiences for home buyers, home sellers, mortgage purchase, refinance/HELOC, investors, and related segments.',
    sourceLabel: 'IntentGrid real estate and mortgage page',
    sourceUrl: 'https://intentgrid.com/real-estate-mortgage',
    verifiedAt: '2026-10-13',
    expiresAt: '2027-01-13',
  },
  {
    id: 'leadsplease.seller',
    subject: 'LeadsPlease',
    statement: 'LeadsPlease describes a scored home-seller intent dataset based on behavioral signals and delivered with contact and demographic fields.',
    sourceLabel: 'LeadsPlease home-seller intent page',
    sourceUrl: 'https://www.leadsplease.com/intent-data/intent-to-sell-a-home',
    verifiedAt: '2026-10-13',
    expiresAt: '2027-01-13',
  },
  {
    id: 'realintent.positioning',
    subject: 'Real Intent',
    statement: 'Real Intent positions its offer around identifying buyer and seller opportunities and pairing lead generation with nurture and marketing support.',
    sourceLabel: 'Real Intent homepage',
    sourceUrl: 'https://www.realintent.co/',
    verifiedAt: '2026-10-13',
    expiresAt: '2027-01-13',
  },
  {
    id: 'smartzip.predictive',
    subject: 'SmartZip',
    statement: 'SmartZip describes its product as predictive seller targeting combined with data, automated marketing, and follow-up tools.',
    sourceLabel: 'SmartZip homepage',
    sourceUrl: 'https://smartzip.com/',
    verifiedAt: '2026-10-13',
    expiresAt: '2027-01-13',
  },
  {
    id: 'propertyradar.data',
    subject: 'PropertyRadar',
    statement: 'PropertyRadar describes nationwide property and owner data, extensive search criteria, signals, marketing tools, and integrations.',
    sourceLabel: 'PropertyRadar features page',
    sourceUrl: 'https://www.propertyradar.com/features',
    verifiedAt: '2026-10-13',
    expiresAt: '2027-01-13',
  },
  {
    id: 'propstream.data',
    subject: 'PropStream',
    statement: 'PropStream publicly positions its platform around nationwide real estate data, property research, lead lists, and investor workflows.',
    sourceLabel: 'PropStream homepage',
    sourceUrl: 'https://www.propstream.com/',
    verifiedAt: '2026-10-13',
    expiresAt: '2027-01-13',
  },
  {
    id: 'totalexpert.intelligence',
    subject: 'Total Expert',
    statement: 'Total Expert Customer Intelligence combines customer-profile enrichment, insights and alerts, segmentation, and dynamic journeys for financial institutions.',
    sourceLabel: 'Total Expert Customer Intelligence',
    sourceUrl: 'https://www.totalexpert.com/products/customer-intelligence',
    verifiedAt: '2026-10-13',
    expiresAt: '2027-01-13',
  },
  {
    id: 'trustengine.platform',
    subject: 'TrustEngine',
    statement: 'TrustEngine provides a mortgage-focused platform that includes borrower intelligence and Mortgage Coach guidance experiences.',
    sourceLabel: 'TrustEngine platform FAQ',
    sourceUrl: 'https://support.trustengine.com/hc/en-us/articles/22049037625623-Frequently-Asked-Questions-TrustEngine-Platform',
    verifiedAt: '2026-10-13',
    expiresAt: '2027-01-13',
  },
];

export function getClaims(ids: string[]) {
  return ids.map((id) => {
    const claim = claims.find((item) => item.id === id);
    if (!claim) throw new Error(`Missing claim: ${id}`);
    return claim;
  });
}

export function getExpiredClaims(referenceDate = new Date()) {
  return claims.filter((claim) => new Date(`${claim.expiresAt}T23:59:59Z`) < referenceDate);
}


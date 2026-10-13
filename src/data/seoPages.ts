export interface PageSection {
  heading: string;
  paragraphs: string[];
  bullets?: string[];
  steps?: { title: string; text: string }[];
}

export interface PageFaq {
  question: string;
  answer: string;
}

export interface ComparisonRow {
  factor: string;
  rei: string;
  competitor: string;
}

export interface SeoPage {
  slug: string;
  kind: 'hub' | 'product' | 'solution' | 'use-case' | 'comparison' | 'roundup' | 'trust' | 'pricing';
  parentLabel: string;
  parentHref: string;
  eyebrow: string;
  title: string;
  shortTitle: string;
  description: string;
  tldr: string;
  audience: string;
  updated: string;
  sections: PageSection[];
  faqs: PageFaq[];
  related: { label: string; href: string }[];
  claimIds?: string[];
  comparison?: {
    competitor: string;
    disclosure: string;
    rows: ComparisonRow[];
  };
  cards?: { eyebrow: string; title: string; description: string; href: string }[];
}

const updated = 'October 13, 2026';

function capability(input: {
  slug: string; eyebrow: string; title: string; shortTitle: string; description: string; tldr: string;
  capability: string; problem: string; mechanism: string; output: string; validate: string[]; faqs: PageFaq[];
  related: SeoPage['related'];
}): SeoPage {
  return {
    ...input,
    kind: 'product',
    parentLabel: 'Platform',
    parentHref: '/platform/',
    audience: 'Real estate and mortgage growth, operations, and data teams',
    updated,
    sections: [
      {
        heading: `What ${input.capability} changes`,
        paragraphs: [input.problem, input.mechanism],
        bullets: input.validate,
      },
      {
        heading: 'From signal to a usable audience',
        paragraphs: [input.output],
        steps: [
          { title: 'Define', text: 'Choose the behavioral category, geography, recency window, and contact requirements that match the campaign.' },
          { title: 'Preview', text: 'Review the available audience count before creating an export or downstream activation.' },
          { title: 'Activate', text: 'Move the resulting audience into an approved CSV, advertising, CRM, or webhook workflow.' },
        ],
      },
      {
        heading: 'What a serious buyer should verify',
        paragraphs: ['Intent-data procurement should be evidence-led. Ask vendors to define every freshness claim, show the delivered fields, document suppression and permitted-use controls, and explain what the signal does—and does not—prove.'],
        bullets: input.validate,
      },
    ],
  };
}

function solution(input: {
  slug: string; eyebrow: string; title: string; shortTitle: string; description: string; tldr: string;
  audience: string; pressure: string; outcome: string; jobs: string[]; controls: string[]; faqs: PageFaq[]; related: SeoPage['related'];
}): SeoPage {
  return {
    ...input,
    kind: 'solution',
    parentLabel: 'Solutions',
    parentHref: '/solutions/',
    updated,
    sections: [
      {
        heading: `Why ${input.audience.toLowerCase()} need a different signal layer`,
        paragraphs: [input.pressure, input.outcome],
        bullets: input.jobs,
      },
      {
        heading: 'A practical operating model',
        paragraphs: ['Real Estate Intent is designed to feed the systems a team already uses. It is not a replacement for a CRM, LOS, dialer, or advertising platform. The intent layer helps decide which audience deserves attention now.'],
        steps: [
          { title: 'Market definition', text: 'Set territory, audience category, lookback, and minimum profile requirements.' },
          { title: 'Governed distribution', text: 'Route the audience to the approved office, branch, campaign, or operator.' },
          { title: 'Outcome measurement', text: 'Connect activity to campaign and pipeline results without presenting correlation as guaranteed causation.' },
        ],
      },
      {
        heading: 'Enterprise controls to put in the evaluation',
        paragraphs: ['The larger the team, the more important governance becomes. Procurement should evaluate how the product handles access, exports, deletion, suppression, attribution, and channel-specific customer obligations.'],
        bullets: input.controls,
      },
    ],
  };
}

function useCase(input: {
  slug: string; eyebrow: string; title: string; shortTitle: string; description: string; tldr: string;
  audience: string; definition: string; signals: string[]; workflow: string[]; caution: string; faqs: PageFaq[]; related: SeoPage['related'];
}): SeoPage {
  return {
    ...input,
    kind: 'use-case',
    parentLabel: 'Use cases',
    parentHref: '/use-cases/',
    updated,
    sections: [
      {
        heading: `What ${input.shortTitle.toLowerCase()} means`,
        paragraphs: [input.definition, 'The value is timing and prioritization. A research signal can help determine where to focus a campaign, but it does not prove consent, eligibility, financial status, or a guaranteed transaction.'],
        bullets: input.signals,
      },
      {
        heading: 'How teams put the audience to work',
        paragraphs: ['A useful workflow starts with a narrowly defined campaign and finishes with a measurable outcome. Avoid sending the same message to every record simply because each person belongs to a broad category.'],
        steps: input.workflow.map((text, index) => ({ title: ['Segment', 'Route', 'Measure'][index] ?? `Step ${index + 1}`, text })),
      },
      {
        heading: 'Use the signal responsibly',
        paragraphs: [input.caution, 'Customers remain responsible for outreach, advertising, suppression, consent, and fair-housing or fair-lending requirements that apply to their organization and chosen channel.'],
      },
    ],
  };
}

function comparison(input: {
  slug: string; competitor: string; title: string; description: string; tldr: string; claimIds: string[];
  category: string; competitorFit: string; reiFit: string; rows: ComparisonRow[]; faqs: PageFaq[]; related: SeoPage['related'];
}): SeoPage {
  return {
    ...input,
    kind: 'comparison',
    parentLabel: 'Compare',
    parentHref: '/compare/',
    eyebrow: 'Verified comparison',
    shortTitle: `Real Estate Intent vs ${input.competitor}`,
    audience: 'Teams evaluating real estate or mortgage data platforms',
    updated,
    comparison: {
      competitor: input.competitor,
      disclosure: `Real Estate Intent publishes this comparison and has an obvious commercial interest in the outcome. Competitor information is limited to publicly documented facts, verified October 13, 2026. Buyers should confirm current capabilities and pricing directly with ${input.competitor}.`,
      rows: input.rows,
    },
    sections: [
      {
        heading: `These products solve different parts of the market`,
        paragraphs: [input.category, `${input.competitor} is generally the stronger fit when ${input.competitorFit}. Real Estate Intent is designed for teams that ${input.reiFit}.`],
      },
      {
        heading: `When to choose ${input.competitor}`,
        paragraphs: [`Choose ${input.competitor} when its documented product category, workflow, and operating model align more closely with the job your team needs to complete.`],
        bullets: [input.competitorFit, 'Your procurement team validates current pricing, coverage, integrations, and contract terms directly with the vendor.', 'The broader workflow matters more than having a dedicated person-level behavioral audience layer.'],
      },
      {
        heading: 'When to choose Real Estate Intent',
        paragraphs: ['Real Estate Intent is the more focused option when the primary job is building fresh, geographically filtered behavioral audiences and moving those records into an existing campaign stack.'],
        bullets: [input.reiFit, 'The team wants CSV, advertising-audience, or webhook activation rather than a full replacement CRM.', 'Signal recency and a clear evidence timestamp are central to campaign prioritization.'],
      },
    ],
  };
}

const hubs: SeoPage[] = [
  {
    slug: 'platform', kind: 'hub', parentLabel: 'Home', parentHref: '/', eyebrow: 'Platform',
    title: 'A signal layer built for action.', shortTitle: 'Platform',
    description: 'Explore Real Estate Intent’s behavioral audience, identity resolution, filtering, freshness, and delivery capabilities.',
    tldr: 'Real Estate Intent turns observed real estate and mortgage research behavior into filterable, contactable audiences. Teams define the category, geography, recency, and profile requirements, preview the audience, then move approved records into campaign systems.',
    audience: 'Growth, marketing operations, revenue operations, and data teams', updated,
    sections: [{ heading: 'One evidence chain, from behavior to activation', paragraphs: ['The platform separates four important jobs: detecting a relevant research pattern, resolving a usable record, filtering the audience for a specific market, and delivering it into an approved campaign workflow. Each layer should be evaluated independently.'] }],
    faqs: [
      { question: 'Is Real Estate Intent a CRM?', answer: 'No. It is an intent-data and audience-activation layer designed to feed the CRM, ad platform, spreadsheet, or webhook workflow a team already uses.' },
      { question: 'Can teams preview an audience before exporting?', answer: 'The public product walkthrough describes category, geography, recency, completeness, and audience-count previews before export.' },
    ],
    related: [{ label: 'Read the data methodology', href: '/data-methodology/' }, { label: 'Explore solutions', href: '/solutions/' }],
    cards: [
      { eyebrow: '01 / Detect', title: 'Behavioral intent data', description: 'Understand the distinction between observed activity and modeled propensity.', href: '/platform/behavioral-intent-data/' },
      { eyebrow: '02 / Resolve', title: 'Identity resolution', description: 'See how a signal becomes a contactable record—and where uncertainty remains.', href: '/platform/identity-resolution/' },
      { eyebrow: '03 / Filter', title: 'Audience builder', description: 'Shape an audience by behavior, market, recency, and profile requirements.', href: '/platform/audience-builder/' },
      { eyebrow: '04 / Deliver', title: 'Exports & webhooks', description: 'Move approved audiences into CSV, advertising, CRM, and webhook workflows.', href: '/platform/exports-and-webhooks/' },
    ],
  },
  {
    slug: 'solutions', kind: 'hub', parentLabel: 'Home', parentHref: '/', eyebrow: 'Solutions',
    title: 'Different teams. One timing advantage.', shortTitle: 'Solutions',
    description: 'Behavioral intent data solutions for brokerages, mortgage lenders, loan officers, and real estate acquisition teams.',
    tldr: 'Brokerages, lenders, branches, and acquisition teams use intent audiences differently. The signal layer stays consistent, while governance, distribution, activation, and measurement change with the organization.',
    audience: 'Revenue leaders across real estate and mortgage', updated,
    sections: [{ heading: 'Start with the operating model', paragraphs: ['The right solution page should answer who owns the audience, who can export it, which market it covers, where it goes next, and how outcomes are measured. That operating model matters more than a generic promise of more leads.'] }],
    faqs: [{ question: 'Can enterprise and self-serve teams use the same platform?', answer: 'They can use the same signal layer, but enterprise deployments require additional attention to seats, market ownership, suppression, integrations, security, and vendor review.' }],
    related: [{ label: 'See use cases', href: '/use-cases/' }, { label: 'Review compliance', href: '/compliance/' }],
    cards: [
      { eyebrow: 'Enterprise', title: 'Real estate brokerages', description: 'Distribute market-level buyer and seller audiences across offices and teams.', href: '/solutions/real-estate-brokerages/' },
      { eyebrow: 'Enterprise', title: 'Mortgage lenders', description: 'Add net-new behavioral audiences to acquisition and growth programs.', href: '/solutions/mortgage-lenders/' },
      { eyebrow: 'Team', title: 'Loan officers', description: 'Build a territory-specific, self-sourced opportunity workflow.', href: '/solutions/loan-officers/' },
      { eyebrow: 'Acquisition', title: 'Real estate investors', description: 'Prioritize relevant seller, distress, and investment-research signals.', href: '/solutions/real-estate-investors/' },
    ],
  },
  {
    slug: 'use-cases', kind: 'hub', parentLabel: 'Home', parentHref: '/', eyebrow: 'Use cases',
    title: 'Put the signal into a real workflow.', shortTitle: 'Use cases',
    description: 'Explore home buyer, seller, mortgage, distressed-homeowner, enrichment, and audience-activation workflows.',
    tldr: 'A behavioral signal becomes valuable only when a team defines the audience, routes it into an approved workflow, uses context-appropriate messaging, and measures the result. These use cases show how to make that chain operational.',
    audience: 'Campaign operators and revenue teams', updated,
    sections: [{ heading: 'A category is not a campaign', paragraphs: ['“Buyer,” “seller,” and “mortgage” are starting points. Effective activation narrows the category by geography, recency, field completeness, offer, channel, and follow-up ownership.'] }],
    faqs: [{ question: 'Does an intent signal guarantee someone will transact?', answer: 'No. Intent reflects research activity and should be used for prioritization. It does not guarantee consent, eligibility, readiness, or a completed transaction.' }],
    related: [{ label: 'Explore the platform', href: '/platform/' }, { label: 'See pricing', href: '/pricing/' }],
    cards: [
      { eyebrow: 'Audience', title: 'Home buyer intent', description: 'Build market-specific audiences around active home-search research.', href: '/use-cases/home-buyer-intent/' },
      { eyebrow: 'Audience', title: 'Home seller intent', description: 'Prioritize homeowners researching valuations, agents, and selling decisions.', href: '/use-cases/home-seller-intent/' },
      { eyebrow: 'Audience', title: 'Mortgage intent', description: 'Separate purchase, refinance, and equity-related research workflows.', href: '/use-cases/purchase-mortgage-intent/' },
      { eyebrow: 'Activation', title: 'Audience activation', description: 'Move a governed audience into the channels your team already operates.', href: '/use-cases/audience-activation/' },
    ],
  },
  {
    slug: 'compare', kind: 'hub', parentLabel: 'Home', parentHref: '/', eyebrow: 'Compare',
    title: 'Choose the right data layer—not the loudest promise.', shortTitle: 'Compare',
    description: 'Source-backed comparisons of Real Estate Intent and adjacent real estate, mortgage, property-data, and predictive platforms.',
    tldr: 'Real estate data products are not interchangeable. Some specialize in property records, some in predictive scoring, some in CRM and retention, and some in behavioral audiences. These comparisons separate those jobs using dated public sources.',
    audience: 'Procurement, growth, marketing operations, and data leaders', updated,
    sections: [{ heading: 'Our comparison standard', paragraphs: ['Every comparison discloses our affiliation, cites public vendor sources, avoids unsupported ratings, and states when capabilities are not publicly disclosed. Comparisons are scheduled for review every 90 days.'] }],
    faqs: [{ question: 'Does Real Estate Intent publish these comparisons?', answer: 'Yes. Every page discloses that commercial interest. Competitor facts are sourced from public materials and should be verified directly with each vendor before purchase.' }],
    related: [{ label: 'Read our methodology', href: '/data-methodology/' }, { label: 'Use the vendor checklist', href: '/resources/guides/enterprise-intent-data-vendor-checklist/' }],
    cards: [
      { eyebrow: 'Direct category', title: 'IntentGrid', description: 'Compare two products focused on real estate and mortgage intent audiences.', href: '/compare/intentgrid/' },
      { eyebrow: 'Predictive', title: 'SmartZip', description: 'Compare behavioral intent audiences with predictive seller targeting.', href: '/compare/smartzip/' },
      { eyebrow: 'Property data', title: 'PropertyRadar', description: 'Compare a focused intent layer with a broad property-data platform.', href: '/compare/propertyradar/' },
      { eyebrow: 'Mortgage enterprise', title: 'Total Expert', description: 'Compare net-new behavioral audiences with customer intelligence and journeys.', href: '/compare/total-expert-customer-intelligence/' },
    ],
  },
  {
    slug: 'resources', kind: 'hub', parentLabel: 'Home', parentHref: '/', eyebrow: 'Resources',
    title: 'The operating manual for real estate intent.', shortTitle: 'Resources',
    description: 'Guides, comparisons, methodology, and practical resources for behavioral intent data in real estate and mortgage.',
    tldr: 'Use this library to understand intent-data terminology, evaluate vendors, design campaign workflows, and build the governance required for enterprise activation.',
    audience: 'Operators, evaluators, and subject-matter experts', updated,
    sections: [{ heading: 'Evidence before volume', paragraphs: ['This library prioritizes precise definitions, dated sources, visible limitations, and actionable workflows. It will expand through expert-reviewed guides, case studies, and original research rather than thin keyword pages.'] }],
    faqs: [{ question: 'How often are comparison resources reviewed?', answer: 'The current system records a verified date and a 90-day review window for competitor facts.' }],
    related: [{ label: 'Browse guides', href: '/resources/guides/' }, { label: 'Browse comparisons', href: '/compare/' }],
    cards: [
      { eyebrow: 'Learn', title: 'Guides', description: 'Deep explanations of behavioral intent, mortgage intent, identity resolution, and vendor evaluation.', href: '/resources/guides/' },
      { eyebrow: 'Evaluate', title: 'Comparisons', description: 'Dated, source-backed comparisons across adjacent product categories.', href: '/compare/' },
      { eyebrow: 'Verify', title: 'Data methodology', description: 'See what the public methodology states—and what still requires validation.', href: '/data-methodology/' },
      { eyebrow: 'Govern', title: 'Compliance', description: 'Understand permitted use, channel obligations, opt-out, and customer responsibilities.', href: '/compliance/' },
    ],
  },
];

const capabilities: SeoPage[] = [
  capability({
    slug: 'platform/behavioral-intent-data', eyebrow: 'Platform / Detect', shortTitle: 'Behavioral intent data',
    title: 'Behavioral intent data for real estate and mortgage.',
    description: 'Learn how behavioral intent data differs from predictive, demographic, property, and first-party engagement data.',
    tldr: 'Behavioral intent data identifies recent research activity connected to a real estate or mortgage decision. It adds timing to an audience. Unlike a predictive score, it starts with observed behavior; unlike a CRM signal, the research may occur beyond a company’s own website.',
    capability: 'behavioral intent data',
    problem: 'Static property, demographic, and contact files can describe a plausible audience, but they do not tell a campaign team which records are showing relevant research activity now.',
    mechanism: 'Behavioral intent adds a time-sensitive evidence layer. The signal should be treated as a prioritization input—not as proof that someone consented to outreach, qualifies for credit, or will complete a transaction.',
    output: 'Real Estate Intent organizes research patterns into buyer, seller, distressed-homeowner, and mortgage-related categories. Teams then narrow the audience by location, recency, and profile requirements before activation.',
    validate: ['Exact definition of a signal and its timestamp', 'Signal-source categories and licensing', 'Lookback windows and refresh cadence', 'Whether evidence is person-, household-, or device-level'],
    faqs: [
      { question: 'Is behavioral intent the same as predictive data?', answer: 'No. Behavioral intent begins with observed activity. Predictive data estimates future behavior from models, attributes, or historical patterns. Both can be useful, but they answer different questions.' },
      { question: 'Does intent mean a person is ready to buy?', answer: 'No. A signal indicates research activity. It does not guarantee readiness, consent, eligibility, or a transaction.' },
      { question: 'Can behavioral intent supplement a CRM?', answer: 'Yes. It can provide a prioritization layer that informs which market or audience deserves attention, while the CRM remains the system of record.' },
    ],
    related: [{ label: 'Behavioral vs predictive data guide', href: '/resources/guides/behavioral-vs-predictive-real-estate-data/' }, { label: 'Data methodology', href: '/data-methodology/' }],
  }),
  capability({
    slug: 'platform/identity-resolution', eyebrow: 'Platform / Resolve', shortTitle: 'Identity resolution',
    title: 'Turn an anonymous signal into a usable record.',
    description: 'Understand the role, limits, and evaluation criteria for identity resolution in real estate intent data.',
    tldr: 'Identity resolution attempts to associate an observed signal with a contactable household record. A responsible vendor explains the matching inputs, delivered fields, validation cadence, confidence limits, and suppression process instead of presenting every match as certain.',
    capability: 'identity resolution',
    problem: 'Anonymous activity is difficult to activate. A marketing team needs a governed method for connecting relevant research behavior to a record that can be segmented, reviewed, and used in an approved channel.',
    mechanism: 'The public compliance documentation describes matching anonymized signals to household records, followed by email, phone, and address validation. Matching remains probabilistic and should be evaluated with sample files and outcome data.',
    output: 'A resolved record can include contact and location fields plus signal context. The delivered file should preserve enough provenance and timing information for a team to understand why the record entered the audience.',
    validate: ['Match unit: person, household, address, or device', 'Delivered fields and field-level timestamps', 'Phone, email, and address validation process', 'Opt-out, deletion, and suppression propagation'],
    faqs: [
      { question: 'Does identity resolution prove who performed the research?', answer: 'Not necessarily. Resolution associates evidence with a record using available matching inputs. Buyers should ask how confidence is determined and what the match unit represents.' },
      { question: 'What fields should an enterprise buyer inspect?', answer: 'Inspect contact fields, address, geography, signal category, observation or ingestion time, source class, validation status, and any confidence or provenance fields the vendor provides.' },
      { question: 'How should match quality be tested?', answer: 'Use a documented sample, define valid/invalid criteria before the test, suppress known records where appropriate, and measure contactability and downstream outcomes by cohort.' },
    ],
    related: [{ label: 'Identity resolution guide', href: '/resources/guides/identity-resolution-for-real-estate-marketing/' }, { label: 'Compliance', href: '/compliance/' }],
  }),
  capability({
    slug: 'platform/audience-builder', eyebrow: 'Platform / Filter', shortTitle: 'Audience builder',
    title: 'Build the audience around the campaign.',
    description: 'Filter real estate and mortgage behavioral audiences by intent category, geography, recency, and contact requirements.',
    tldr: 'The audience builder turns a broad signal category into a campaign-ready segment. Teams can define the behavior, market, recency window, and profile requirements, then preview the available audience before creating an export.',
    capability: 'audience building',
    problem: 'A national category is too broad for most real estate and mortgage campaigns. Operators need a repeatable way to align the audience with a territory, offer, channel, and available follow-up capacity.',
    mechanism: 'The public walkthrough shows category and subcategory selection, state/city/ZIP geography, recency windows up to 30 days, profile-completeness filters, and audience-count previews.',
    output: 'A defined segment becomes a documented campaign input. Saving the criteria alongside the export makes testing, suppression, routing, and later performance comparison easier.',
    validate: ['Available geographies and coverage thresholds', 'Preview counts versus exported records', 'Duplicate and repeat-signal handling', 'Saved-search, seat, and export governance'],
    faqs: [
      { question: 'Can an audience be filtered by geography?', answer: 'The public product walkthrough describes state, city, and ZIP filtering. Teams should confirm coverage and minimum counts for their exact markets.' },
      { question: 'Why does recency matter?', answer: 'Research context changes quickly. Recency allows a campaign team to test how results differ as a signal ages rather than treating a 48-hour and 30-day-old record as identical.' },
      { question: 'Should every filter be as narrow as possible?', answer: 'No. Excessive filtering can create small or unstable cohorts. Start with the campaign hypothesis, required fields, and available follow-up capacity.' },
    ],
    related: [{ label: 'Home buyer intent', href: '/use-cases/home-buyer-intent/' }, { label: 'Audience activation', href: '/use-cases/audience-activation/' }],
  }),
  capability({
    slug: 'platform/signal-recency', eyebrow: 'Platform / Freshness', shortTitle: 'Signal recency',
    title: 'Treat freshness as a field, not a slogan.',
    description: 'Understand observation time, ingestion time, refresh cadence, lookback windows, and freshness testing for intent data.',
    tldr: '“Fresh” can mean several things: when behavior occurred, when a vendor observed it, when a record entered the platform, or when contact fields were validated. Enterprise evaluation should separate those timestamps and test performance by signal age.',
    capability: 'signal recency',
    problem: 'Vendors often compress several timestamps into one freshness claim. That makes it difficult to compare products or determine whether a campaign result changes as the signal ages.',
    mechanism: 'Real Estate Intent’s public compliance page distinguishes a daily refresh cadence from a source window of roughly 48 hours to 30 days and notes that address validation is recurring rather than real time.',
    output: 'A mature workflow retains the relevant timestamps, assigns cohorts by age, and compares reach, response, and conversion outcomes instead of assuming newer is always better for every campaign.',
    validate: ['Observed-at versus ingested-at timestamp', 'Contact-field verification date', 'Source lookback and platform refresh cadence', 'Performance reporting by signal age'],
    faqs: [
      { question: 'Is a daily refresh the same as a 24-hour-old signal?', answer: 'No. A daily system refresh describes processing cadence. The underlying activity may come from a broader lookback window.' },
      { question: 'What timestamp should appear in an export?', answer: 'Ideally the export identifies the signal observation or ingestion time and any relevant validation date so operators can build age cohorts.' },
      { question: 'How should freshness be tested?', answer: 'Split comparable cohorts by signal age, keep offer and channel consistent, and compare contactability and downstream outcomes over a defined period.' },
    ],
    related: [{ label: 'Data methodology', href: '/data-methodology/' }, { label: 'Behavioral intent data', href: '/platform/behavioral-intent-data/' }],
  }),
  capability({
    slug: 'platform/exports-and-webhooks', eyebrow: 'Platform / Deliver', shortTitle: 'Exports & webhooks',
    title: 'Move intent into the systems that already run revenue.',
    description: 'Deliver filtered real estate intent audiences through CSV, advertising-audience workflows, CRM processes, and webhooks.',
    tldr: 'Real Estate Intent is designed as an upstream audience layer. Operators can move filtered records into CSV-based workflows, advertising destinations, CRM processes, or bespoke webhook integrations while keeping channel permissions and suppression responsibilities with the customer.',
    capability: 'audience delivery',
    problem: 'A list trapped in a dashboard creates little value. Revenue teams need a reliable, governed handoff into the platforms where audience creation, assignment, outreach, and measurement already happen.',
    mechanism: 'The public site describes CSV, major advertising-audience destinations, and webhook availability. Exact native integrations and data mappings should be confirmed during implementation.',
    output: 'The best activation design records the audience definition, export time, destination, owner, suppression status, and campaign identifier so later outcomes can be attributed to the correct cohort.',
    validate: ['Native integration versus manual upload', 'Field mapping and hashing requirements', 'Webhook authentication, retry, and failure handling', 'Export logs, deletion, and suppression controls'],
    faqs: [
      { question: 'Does Real Estate Intent replace a CRM?', answer: 'No. The platform provides audiences for downstream workflows. A CRM or campaign platform remains responsible for execution and lifecycle management.' },
      { question: 'Are ad-platform matches guaranteed?', answer: 'No. Match rates depend on the destination’s identity graph, the supplied identifiers, and platform policies.' },
      { question: 'What should a webhook implementation include?', answer: 'At minimum: authenticated delivery, idempotency, documented field mapping, retry behavior, logging, failure alerts, and suppression handling.' },
    ],
    related: [{ label: 'Audience activation', href: '/use-cases/audience-activation/' }, { label: 'CRM enrichment', href: '/use-cases/crm-enrichment/' }],
  }),
];

const solutions: SeoPage[] = [
  solution({
    slug: 'solutions/real-estate-brokerages', eyebrow: 'Solutions / Enterprise', shortTitle: 'Real estate brokerages',
    title: 'Behavioral intent data for real estate brokerages.',
    description: 'Give enterprise brokerages a governed buyer and seller audience layer across markets, offices, and agent teams.',
    tldr: 'Enterprise brokerages can use behavioral intent audiences to prioritize buyer and seller opportunity by market, route records to the right office or team, activate paid media, and measure results without replacing the existing CRM or agent workflow.',
    audience: 'Enterprise brokerages',
    pressure: 'Large brokerages have abundant contacts, portal inquiries, listing traffic, and market coverage—but those signals are fragmented across offices and systems. Agents often receive too many undifferentiated records and too little evidence about timing.',
    outcome: 'A separate intent layer can help growth leaders define market-level audiences, distribute them under clear rules, and compare outcomes across offices without pretending the signal is a guaranteed lead.',
    jobs: ['Build buyer and seller audiences by market', 'Support listing-growth and buyer-acquisition campaigns', 'Route cohorts across offices, teams, and agents', 'Measure adoption and outcomes by geography'],
    controls: ['Role-based access and export ownership', 'Territory collision and duplicate handling', 'CRM field mapping and source attribution', 'Fair-housing review for audience and creative strategy'],
    faqs: [
      { question: 'Can a brokerage distribute audiences by office?', answer: 'That is a sensible enterprise workflow. Exact seat, routing, and export controls should be validated against the current product and implemented in the brokerage’s operating model.' },
      { question: 'Does this replace portal leads?', answer: 'No. Behavioral intent can diversify and prioritize acquisition, but portal, referral, first-party, and past-client channels remain distinct sources.' },
      { question: 'How should brokerage ROI be measured?', answer: 'Track audience cohort, office/agent assignment, attempts, conversations, appointments, signed agreements, closings, and cost while avoiding unsupported causal claims.' },
    ],
    related: [{ label: 'Home seller intent', href: '/use-cases/home-seller-intent/' }, { label: 'Enterprise vendor checklist', href: '/resources/guides/enterprise-intent-data-vendor-checklist/' }],
  }),
  solution({
    slug: 'solutions/mortgage-lenders', eyebrow: 'Solutions / Enterprise', shortTitle: 'Mortgage lenders',
    title: 'Mortgage intent audiences for lender growth teams.',
    description: 'Help mortgage lenders build governed purchase, refinance, and equity-research audiences for acquisition campaigns.',
    tldr: 'Mortgage lenders can use behavioral research audiences as a net-new acquisition input alongside first-party retention and customer-intelligence programs. The signal should guide prioritization and media strategy—not be represented as consent, credit eligibility, or a firm offer.',
    audience: 'Mortgage lenders and credit unions',
    pressure: 'Lenders must balance acquisition cost, branch productivity, fair-lending oversight, channel consent, and a fragmented technology stack. A generic contact list does not solve that operating problem.',
    outcome: 'A focused behavioral audience can help growth teams identify where purchase, refinance, or equity research is occurring, then move that audience through compliance-approved media and sales workflows.',
    jobs: ['Separate purchase, refinance, HELOC, and investor research', 'Support market-level paid-media planning', 'Provide net-new audiences beyond the serviced portfolio', 'Create measurable cohorts for branch or channel tests'],
    controls: ['Non-FCRA and permitted-use review', 'Fair-lending and digital-advertising governance', 'Consent and suppression by outreach channel', 'Vendor security, retention, and deletion documentation'],
    faqs: [
      { question: 'Is mortgage intent data the same as a credit-trigger lead?', answer: 'No. Behavioral intent is based on research activity. Credit-trigger and prescreen programs involve separate regulated data and legal requirements.' },
      { question: 'Can intent data determine loan eligibility?', answer: 'No. A research signal is not an underwriting input and must not be represented as approval, eligibility, or creditworthiness.' },
      { question: 'Where should lenders begin?', answer: 'Start with legal/compliance review, a narrow market and product hypothesis, a documented audience, an approved channel, and predefined success and stop criteria.' },
    ],
    related: [{ label: 'Mortgage intent guide', href: '/resources/guides/mortgage-intent-data/' }, { label: 'Purchase mortgage intent', href: '/use-cases/purchase-mortgage-intent/' }],
  }),
  solution({
    slug: 'solutions/loan-officers', eyebrow: 'Solutions / Teams', shortTitle: 'Loan officers',
    title: 'A territory-first intent workflow for loan officers.',
    description: 'Build geographically relevant purchase, refinance, and equity research audiences for loan-officer and branch growth.',
    tldr: 'Loan officers can use intent audiences to focus self-sourced growth in a defined territory. The practical workflow is simple: choose a mortgage-related category, narrow the geography and age of the signal, route the audience into an approved channel, and measure conversations and applications.',
    audience: 'Loan officers and branch teams',
    pressure: 'Individual originators often depend on referral partners, past customers, purchased leads, and broad outbound activity. They need a repeatable way to focus effort without adding another heavy system.',
    outcome: 'A filtered intent audience can give a branch a disciplined daily or weekly campaign input while the existing CRM, dialer, ad account, and compliance process remain intact.',
    jobs: ['Build a local purchase or refinance audience', 'Align outreach with a branch-approved offer', 'Create co-marketing conversations with real estate partners', 'Measure opportunity cost and funded-loan outcomes'],
    controls: ['Branch approval and market ownership', 'Approved messaging and channel rules', 'Do-not-contact and unsubscribe handling', 'Clear separation between research intent and eligibility'],
    faqs: [
      { question: 'Is this a list of preapproved borrowers?', answer: 'No. The audience reflects research behavior and contact resolution. It does not indicate preapproval or loan eligibility.' },
      { question: 'Can a loan officer use the data for SMS?', answer: 'Channel use depends on consent, applicable law, company policy, and the exact workflow. Possessing a record does not automatically grant permission to text it.' },
      { question: 'What should a branch track?', answer: 'Track audience cost, records activated, valid contacts, conversations, appointments, applications, funded loans, and complaints or opt-outs by cohort.' },
    ],
    related: [{ label: 'Mortgage intent data', href: '/resources/guides/mortgage-intent-data/' }, { label: 'Compliance', href: '/compliance/' }],
  }),
  solution({
    slug: 'solutions/real-estate-investors', eyebrow: 'Solutions / Acquisition', shortTitle: 'Real estate investors',
    title: 'Intent audiences for real estate acquisition teams.',
    description: 'Prioritize seller, distress, and investment-property research signals without replacing property due diligence.',
    tldr: 'Real estate investors can use behavioral intent to add a timing layer to property and owner prospecting. It should complement—not replace—property records, title research, equity analysis, condition review, and responsible seller communication.',
    audience: 'Real estate investor and acquisition teams',
    pressure: 'Investor stacks are often rich in property attributes but weak on timing. Teams can spend heavily skip tracing and contacting large static lists without knowing which households are researching a relevant decision.',
    outcome: 'Behavioral intent can prioritize which segments deserve attention while property-data platforms remain responsible for ownership, equity, transaction, and due-diligence information.',
    jobs: ['Prioritize seller and distress-research cohorts', 'Combine behavioral timing with property filters', 'Route records to acquisition teams by market', 'Measure valid conversations and qualified opportunities'],
    controls: ['Sensitive-circumstance messaging review', 'Property and identity verification before outreach', 'Do-not-contact and opt-out suppression', 'No implication of legal, financial, or foreclosure status from research alone'],
    faqs: [
      { question: 'Does a distress signal prove foreclosure?', answer: 'No. Research behavior is not proof of legal status, hardship, ownership, or a pending foreclosure. Verify facts independently and communicate responsibly.' },
      { question: 'Does this replace property data?', answer: 'No. Intent adds timing. Ownership, liens, equity, title, and property condition require separate authoritative sources and due diligence.' },
      { question: 'What is a responsible first test?', answer: 'Choose a narrow market, exclude sensitive or unsupported assumptions, verify ownership independently, use approved messaging, and measure qualified conversations rather than raw contact volume.' },
    ],
    related: [{ label: 'Distressed-homeowner intent', href: '/use-cases/distressed-homeowner-intent/' }, { label: 'PropertyRadar comparison', href: '/compare/propertyradar/' }],
  }),
];

const useCases: SeoPage[] = [
  useCase({
    slug: 'use-cases/home-buyer-intent', eyebrow: 'Use cases / Buyer', shortTitle: 'Home buyer intent',
    title: 'Find home buyer research before the form fill.',
    description: 'Build home buyer intent audiences from recent property, neighborhood, touring, and agent research signals.',
    tldr: 'Home buyer intent describes research behavior associated with an active or emerging home search. A filtered audience can help brokerages, agents, and lenders prioritize markets and campaigns before a person submits a lead form.',
    audience: 'Brokerages, buyer teams, relocation teams, and mortgage marketers',
    definition: 'Buyer research can include listing engagement, virtual touring, neighborhood research, agent comparison, and financing-related exploration. The useful question is not whether one action proves a purchase; it is whether a recent pattern justifies a campaign test.',
    signals: ['Property and listing research', 'Neighborhood and relocation exploration', 'Virtual touring or repeated engagement', 'Buyer-agent and financing research'],
    workflow: ['Choose the market, recency, buyer subcategory, and minimum contact fields.', 'Assign the cohort to the relevant office, buyer team, lender campaign, or approved media audience.', 'Compare valid contacts, conversations, appointments, and transaction outcomes by signal age and market.'],
    caution: 'Do not imply that every record is unrepresented, ready to purchase, or qualified for financing. Buyer intent is a prioritization signal, not a representation-status or credit conclusion.',
    faqs: [
      { question: 'Are home buyer intent records exclusive?', answer: 'The public site does not promise exclusivity. Confirm current commercial terms directly before assuming an audience is exclusive.' },
      { question: 'Can lenders use buyer intent audiences?', answer: 'A lender can evaluate them for approved marketing use, subject to its legal, compliance, fair-lending, consent, and channel requirements.' },
      { question: 'How fresh should buyer signals be?', answer: 'That depends on the campaign. Test defined age cohorts rather than assuming one universal threshold.' },
    ],
    related: [{ label: 'Brokerage solution', href: '/solutions/real-estate-brokerages/' }, { label: 'Purchase mortgage intent', href: '/use-cases/purchase-mortgage-intent/' }],
  }),
  useCase({
    slug: 'use-cases/home-seller-intent', eyebrow: 'Use cases / Seller', shortTitle: 'Home seller intent',
    title: 'Prioritize homeowners researching a sale.',
    description: 'Use valuation, agent-comparison, market, and pre-sale research signals to build home seller intent audiences.',
    tldr: 'Home seller intent data identifies recent research behavior associated with evaluating a sale, such as home-value exploration, comparable sales, listing-agent research, and pre-sale preparation. It helps prioritize a farm; it does not prove a listing decision.',
    audience: 'Listing teams, brokerages, and investor acquisition teams',
    definition: 'Seller research happens before a listing agreement and often before a consumer wants to complete a form. Behavioral signals can add timing to a farm or property-owner audience that would otherwise be based only on static attributes.',
    signals: ['Home-value and comparable-sale research', 'Listing-agent and brokerage comparison', 'Market-condition and selling-process content', 'Pre-sale repair, staging, moving, or downsizing research'],
    workflow: ['Define a geography and seller-research pattern instead of selecting every homeowner in a farm.', 'Use a context-appropriate educational offer or audience strategy rather than claiming knowledge of a private decision.', 'Measure appointments, signed listings, opt-outs, and acquisition cost against a comparable static-farm cohort.'],
    caution: 'Avoid copy that states or implies “we know you are selling.” Research can reflect curiosity, professional activity, or early exploration that never becomes a listing.',
    faqs: [
      { question: 'Is seller intent the same as a predictive seller score?', answer: 'No. Behavioral intent starts with observed research. Predictive scores estimate propensity from attributes or historical models.' },
      { question: 'Does seller research prove property ownership?', answer: 'No. Ownership should be validated through authoritative property sources before using ownership-specific messaging.' },
      { question: 'What should a listing team test?', answer: 'Test recent versus older signals, educational versus direct offers, and intent cohorts versus a comparable farm audience.' },
    ],
    related: [{ label: 'Behavioral vs predictive guide', href: '/resources/guides/behavioral-vs-predictive-real-estate-data/' }, { label: 'SmartZip comparison', href: '/compare/smartzip/' }],
  }),
  useCase({
    slug: 'use-cases/distressed-homeowner-intent', eyebrow: 'Use cases / Distress', shortTitle: 'Distressed-homeowner intent',
    title: 'Handle hardship-related research with care.',
    description: 'Understand how pre-foreclosure, loan-modification, and hardship research signals can inform responsible audience prioritization.',
    tldr: 'Distressed-homeowner intent reflects research around financial hardship, foreclosure avoidance, loan modification, or urgent property decisions. It is sensitive context—not proof of hardship, default, foreclosure status, or willingness to sell.',
    audience: 'Investor teams, housing professionals, and approved assistance campaigns',
    definition: 'Research around hardship and foreclosure can indicate a need for information, but it may also involve family members, professionals, students, or general curiosity. The signal must never be treated as a confirmed legal or financial condition.',
    signals: ['Pre-foreclosure and foreclosure-avoidance content', 'Loan-modification and loss-mitigation research', 'Urgent-sale and property-decision topics', 'Financial-hardship resources related to housing'],
    workflow: ['Define the permitted purpose and exclude unsupported legal or financial inferences.', 'Use independently verified property facts and compliance-approved, non-coercive messaging.', 'Measure qualified conversations, complaints, opt-outs, and consumer harm indicators—not just response.'],
    caution: 'This category warrants elevated legal, ethical, and brand review. Never use research behavior to shame, pressure, misrepresent authority, or state that a person is in foreclosure.',
    faqs: [
      { question: 'Does this data confirm a foreclosure filing?', answer: 'No. Behavioral research is not a public-record filing and does not confirm foreclosure, default, debt, or ownership.' },
      { question: 'Can campaigns say they know someone is in distress?', answer: 'They should not infer or state a sensitive condition from research behavior. Messaging requires legal and brand review.' },
      { question: 'What additional controls are appropriate?', answer: 'Use documented permitted purpose, independent verification, suppression, sensitive-copy review, complaint monitoring, and restricted access.' },
    ],
    related: [{ label: 'Investor solution', href: '/solutions/real-estate-investors/' }, { label: 'Compliance', href: '/compliance/' }],
  }),
  useCase({
    slug: 'use-cases/purchase-mortgage-intent', eyebrow: 'Use cases / Mortgage', shortTitle: 'Purchase mortgage intent',
    title: 'Find purchase-mortgage research by market.',
    description: 'Build audiences around mortgage lender, preapproval, affordability, and loan-program research without implying eligibility.',
    tldr: 'Purchase-mortgage intent reflects research into financing a home purchase, such as lender comparison, preapproval, affordability, rates, and loan programs. Lenders can use it as a marketing-prioritization input, never as an underwriting conclusion.',
    audience: 'Mortgage lenders, branches, loan officers, and housing marketers',
    definition: 'Purchase research often spans property search and financing questions. A focused audience can help a lender decide where to invest acquisition budget before a formal application enters the funnel.',
    signals: ['Mortgage lender and preapproval research', 'Affordability and payment calculators', 'Rate and loan-program comparisons', 'Home search paired with financing exploration'],
    workflow: ['Choose market, signal recency, and purchase-related topic groups under an approved campaign purpose.', 'Route through compliance-approved media, content, or sales workflows without eligibility claims.', 'Measure application starts, completed applications, funded loans, and consumer feedback by cohort.'],
    caution: 'Do not describe a record as approved, qualified, creditworthy, or ready for a particular product. Those conclusions require separate application, underwriting, and legal processes.',
    faqs: [
      { question: 'Is purchase-mortgage intent a prescreened offer list?', answer: 'No. Behavioral intent is not the same as a consumer report or prescreen process.' },
      { question: 'Can the data select loan terms?', answer: 'No. It should not be used to determine eligibility, terms, or underwriting outcomes.' },
      { question: 'What is a useful initial campaign?', answer: 'A narrow market-level educational campaign with predefined audience, approval, measurement, and stop criteria is a responsible starting point.' },
    ],
    related: [{ label: 'Mortgage lender solution', href: '/solutions/mortgage-lenders/' }, { label: 'Mortgage intent guide', href: '/resources/guides/mortgage-intent-data/' }],
  }),
  useCase({
    slug: 'use-cases/refinance-and-heloc-intent', eyebrow: 'Use cases / Mortgage', shortTitle: 'Refinance and HELOC intent',
    title: 'Separate refinance and equity research from purchase demand.',
    description: 'Build refinance, cash-out, HELOC, and home-equity research audiences for governed mortgage campaigns.',
    tldr: 'Refinance and HELOC intent reflects research into changing an existing mortgage or accessing home equity. It is distinct from purchase demand and should be segmented by topic, market, recency, permitted use, and approved messaging.',
    audience: 'Mortgage lenders, credit unions, and loan-officer teams',
    definition: 'Rate comparison, cash-out, home-equity, and refinance research can indicate financial exploration. It does not establish ownership, available equity, credit status, or product eligibility.',
    signals: ['Refinance and rate-reduction research', 'HELOC and home-equity loan exploration', 'Cash-out refinance topics', 'Mortgage payment and scenario calculators'],
    workflow: ['Separate refinance, HELOC, and cash-out topics so each campaign has a clear hypothesis.', 'Verify required property or customer facts independently and use approved offers and disclosures.', 'Compare applications, funded outcomes, cost, opt-outs, and complaints across cohorts.'],
    caution: 'Never infer equity, debt, credit quality, or eligibility from research alone. If a campaign uses regulated consumer-report information, that is a separate workflow with additional requirements.',
    faqs: [
      { question: 'Does HELOC research prove available equity?', answer: 'No. Equity must be evaluated using current property, lien, valuation, and underwriting information.' },
      { question: 'Should refinance and purchase intent share a campaign?', answer: 'Usually not. The consumer question, offer, creative, qualification path, and measurement differ.' },
      { question: 'Can past-customer data be combined with intent?', answer: 'Potentially, under an approved first-party workflow. Governance should define matching, consent, suppression, and permitted use.' },
    ],
    related: [{ label: 'Mortgage lender solution', href: '/solutions/mortgage-lenders/' }, { label: 'Total Expert comparison', href: '/compare/total-expert-customer-intelligence/' }],
  }),
  useCase({
    slug: 'use-cases/relocation-intent', eyebrow: 'Use cases / Relocation', shortTitle: 'Relocation intent',
    title: 'Connect origin and destination research.',
    description: 'Use neighborhood, moving, and destination-market research to prioritize relocation audiences and campaigns.',
    tldr: 'Relocation intent connects research that suggests a possible move with destination-market interest. Brokerages and lenders can use it to plan market-specific content, media, and handoffs without assuming a final destination or moving date.',
    audience: 'Brokerage networks, relocation teams, and mortgage marketers',
    definition: 'Relocation journeys cross markets and often involve neighborhood research, moving services, commute questions, schools, listings, and financing. Individual signals can be noisy; combined recency and geography provide a more useful campaign hypothesis.',
    signals: ['Destination neighborhood and housing research', 'Moving, storage, and relocation content', 'Repeated cross-market listing exploration', 'Financing or affordability research tied to a destination'],
    workflow: ['Define origin/destination logic and the minimum evidence required for a relocation cohort.', 'Route the audience to a network, relocation desk, or destination-market campaign under approved rules.', 'Measure cross-market engagement, referrals, appointments, applications, and completed transactions.'],
    caution: 'Do not infer precise residence, employment status, school enrollment, family status, or a confirmed move from research behavior.',
    faqs: [
      { question: 'Can relocation intent identify an exact moving date?', answer: 'Not from research behavior alone. Treat timing as an estimate to be tested, not a confirmed fact.' },
      { question: 'Who owns a cross-market opportunity?', answer: 'That is an operating-policy decision. Define routing, referral, duplicate, and attribution rules before activation.' },
      { question: 'What content works with relocation audiences?', answer: 'Useful destination guides, financing education, neighborhood orientation, and transparent service offers are safer than copy that implies private knowledge.' },
    ],
    related: [{ label: 'Brokerage solution', href: '/solutions/real-estate-brokerages/' }, { label: 'Home buyer intent', href: '/use-cases/home-buyer-intent/' }],
  }),
  useCase({
    slug: 'use-cases/crm-enrichment', eyebrow: 'Use cases / Data operations', shortTitle: 'CRM enrichment',
    title: 'Add timing context to records your team already knows.',
    description: 'Design a governed CRM enrichment workflow using behavioral intent, identity matching, provenance, and suppression.',
    tldr: 'CRM enrichment adds current signal context to an existing contact record so a team can reprioritize outreach or media. It requires deterministic field mapping, match-quality controls, provenance, deletion and suppression rules, and careful separation between first- and third-party data.',
    audience: 'Revenue operations, marketing operations, CRM, and data teams',
    definition: 'Enrichment is useful when a CRM contains a large dormant database but little evidence about current research. The goal is not to overwrite the system of record; it is to append a dated signal and create a reviewable segment.',
    signals: ['Matched intent category and subcategory', 'Signal or ingestion timestamp', 'Source and validation metadata', 'Geography and contact-field status'],
    workflow: ['Define the match key, confidence threshold, target fields, and conflict rules.', 'Write intent context into dedicated CRM fields and trigger only approved journeys or review queues.', 'Audit match quality, downstream activity, suppression propagation, and stale-data cleanup.'],
    caution: 'Never silently overwrite authoritative CRM values with third-party enrichment. Retain source and timestamp fields and define how stale or disputed information is corrected or removed.',
    faqs: [
      { question: 'Should intent data overwrite lead source?', answer: 'Usually no. Preserve original acquisition source and add separate intent-source, category, and timestamp fields.' },
      { question: 'How should duplicates be handled?', answer: 'Define deterministic matching and merge rules, quarantine ambiguous matches, and retain an audit trail.' },
      { question: 'How long should intent fields remain active?', answer: 'Set a documented expiry or revalidation rule based on the signal type, campaign, and data-governance policy.' },
    ],
    related: [{ label: 'Identity resolution', href: '/platform/identity-resolution/' }, { label: 'Exports & webhooks', href: '/platform/exports-and-webhooks/' }],
  }),
  useCase({
    slug: 'use-cases/audience-activation', eyebrow: 'Use cases / Activation', shortTitle: 'Audience activation',
    title: 'Turn a filtered intent audience into a governed campaign.',
    description: 'Activate real estate intent audiences through approved advertising, CSV, CRM, and webhook workflows.',
    tldr: 'Audience activation is the controlled movement of a defined intent cohort into a campaign destination. A mature workflow records criteria, destination, owner, matching method, suppression state, creative approval, and outcome metrics.',
    audience: 'Paid media, lifecycle, CRM, and revenue operations teams',
    definition: 'The value of intent data appears downstream. Activation connects the audience definition to an ad account, CRM segment, call workflow, or other approved system while preserving enough metadata to measure results and respond to opt-out or deletion requests.',
    signals: ['Audience definition and saved criteria', 'Export and destination identifiers', 'Hashing or field-mapping requirements', 'Suppression, consent, and ownership status'],
    workflow: ['Document the campaign purpose, audience definition, destination, and approved channel.', 'Apply required hashing, mapping, suppression, frequency, and creative controls.', 'Reconcile platform match, delivery, response, conversion, complaints, and deletion requests.'],
    caution: 'A destination accepting an upload does not make every use compliant. Customers are responsible for platform terms, consent, fair-housing or fair-lending review, suppression, and lawful outreach.',
    faqs: [
      { question: 'Does an ad-platform upload contact people directly?', answer: 'The platform attempts to match supplied identifiers to user accounts for audience delivery. Matching and delivery depend on the destination’s policies and identity graph.' },
      { question: 'Should raw files be retained indefinitely?', answer: 'No. Establish access, retention, deletion, and audit rules that match the organization’s security and privacy program.' },
      { question: 'How is activation quality measured?', answer: 'Track file acceptance, match rate, delivery, cost, engagement, downstream conversions, suppression, complaints, and cohort-level economics.' },
    ],
    related: [{ label: 'Exports & webhooks', href: '/platform/exports-and-webhooks/' }, { label: 'Compliance', href: '/compliance/' }],
  }),
];

const comparisons: SeoPage[] = [
  comparison({
    slug: 'compare/intentgrid', competitor: 'IntentGrid', title: 'Real Estate Intent vs IntentGrid: audience data or intelligence workflow?',
    description: 'Compare Real Estate Intent and IntentGrid across audience scope, workflow, activation, and operating model.',
    tldr: 'Both products address real estate and mortgage intent. IntentGrid publicly presents a broader intelligence operating system with prioritization, drafting, CRM-lite, pixel, and enrichment options. Real Estate Intent is the more focused audience-building and export layer for teams that already have execution systems.',
    claimIds: ['rei.daily-cadence','rei.delivery','intentgrid.category'],
    category: 'This is the closest category comparison in the launch set. Both vendors describe real estate and mortgage audiences built around current research behavior, but the public workflows are packaged differently.',
    competitorFit: 'the team wants an all-in-one prioritization and lightweight operating workflow in addition to data',
    reiFit: 'already have a CRM and campaign stack and want a focused behavioral audience layer',
    rows: [
      { factor: 'Core positioning', rei: 'Behavioral audience data and activation', competitor: 'Intelligence OS with intent audiences and workflow' },
      { factor: 'Real estate categories', rei: 'Buyer, seller, distressed-homeowner, and mortgage research', competitor: 'Buyer, seller, luxury, mortgage, refinance/HELOC, investor, and related audiences are publicly listed' },
      { factor: 'Workflow', rei: 'Filter, preview, export, or deliver by webhook', competitor: 'Prioritization, drafting, CRM Lite, exports, pixel, and enrichment are publicly described' },
      { factor: 'Best fit', rei: 'Teams keeping their existing execution stack', competitor: 'Teams seeking data plus a broader daily operating layer' },
    ],
    faqs: [
      { question: 'Are Real Estate Intent and IntentGrid direct competitors?', answer: 'They overlap in real estate and mortgage intent audiences. Public materials indicate different breadth and workflow packaging, so buyers should compare the exact job they need.' },
      { question: 'Which platform is better for an existing CRM stack?', answer: 'Real Estate Intent is intentionally positioned as an upstream audience layer. Confirm field mapping and webhook needs during evaluation.' },
      { question: 'Which has more audience categories?', answer: 'IntentGrid publicly lists a broader set of named real estate and mortgage audiences. Category naming does not by itself establish coverage or quality.' },
    ],
    related: [{ label: 'Intent data methodology', href: '/data-methodology/' }, { label: 'Best real estate intent platforms', href: '/alternatives/best-real-estate-intent-data-platforms/' }],
  }),
  comparison({
    slug: 'compare/leadsplease', competitor: 'LeadsPlease', title: 'Real Estate Intent vs LeadsPlease: platform workflow or intent dataset?',
    description: 'Compare Real Estate Intent and LeadsPlease for home-seller intent data, segmentation, delivery, and campaign workflow.',
    tldr: 'LeadsPlease publicly offers detailed consumer intent datasets, including a scored home-seller intent product and subscription delivery. Real Estate Intent provides a platform workflow for filtering several real estate and mortgage behavior categories before export or activation.',
    claimIds: ['rei.daily-cadence','rei.delivery','leadsplease.seller'],
    category: 'Both products can enter the buying conversation as consumer intent-data providers. The key distinction is between acquiring a documented dataset/subscription and using a broader self-serve audience-building interface.',
    competitorFit: 'the buyer wants a packaged dataset or subscription centered on a specific consumer intent category',
    reiFit: 'the buyer wants to explore multiple behavior categories, geographies, and recency windows in a platform',
    rows: [
      { factor: 'Public emphasis', rei: 'Self-serve behavioral audience builder', competitor: 'Intent datasets and subscriptions' },
      { factor: 'Seller product', rei: 'Seller behavior is one of four primary categories', competitor: 'A dedicated, scored home-seller intent product is publicly documented' },
      { factor: 'Delivery', rei: 'CSV, ad-audience destinations, and webhook are described', competitor: 'File access and subscription delivery are described' },
      { factor: 'Best fit', rei: 'Multi-category audience exploration', competitor: 'Buyers seeking a defined consumer dataset' },
    ],
    faqs: [
      { question: 'Does either product guarantee a seller will list?', answer: 'No responsible intent product should make that guarantee. Research and scores are prioritization inputs.' },
      { question: 'Which is better for multiple real estate categories?', answer: 'Real Estate Intent publicly presents buyer, seller, distress, and mortgage-related categories in one interface.' },
      { question: 'Should pricing be compared per record?', answer: 'Only after normalizing field completeness, match definition, duplicates, recency, usage rights, minimums, and delivery model.' },
    ],
    related: [{ label: 'Home seller intent', href: '/use-cases/home-seller-intent/' }, { label: 'Vendor checklist', href: '/resources/guides/enterprise-intent-data-vendor-checklist/' }],
  }),
  comparison({
    slug: 'compare/real-intent', competitor: 'Real Intent', title: 'Real Estate Intent vs Real Intent: data platform or managed lead generation?',
    description: 'Compare Real Estate Intent and Real Intent across data access, campaign workflow, nurture, and buyer/seller positioning.',
    tldr: 'Real Intent publicly combines intent-oriented buyer and seller lead generation with nurture and marketing support. Real Estate Intent is a data and audience platform for teams that want to control filtering, export, activation, and downstream execution themselves.',
    claimIds: ['rei.delivery','realintent.positioning'],
    category: 'The names are similar, but the operating models are distinct. One is presented as an audience-data platform; the other publicly emphasizes a broader managed lead-generation and marketing experience.',
    competitorFit: 'the team wants lead generation packaged with nurture and marketing support',
    reiFit: 'the team wants direct control over audience creation and its existing campaign systems',
    rows: [
      { factor: 'Operating model', rei: 'Self-serve audience data platform', competitor: 'Lead generation plus nurture/marketing positioning' },
      { factor: 'Primary categories', rei: 'Buyer, seller, distress, and mortgage research', competitor: 'Buyer and seller opportunities are prominent publicly' },
      { factor: 'Activation control', rei: 'Customer exports to its own stack', competitor: 'Public materials emphasize an integrated growth approach' },
      { factor: 'Best fit', rei: 'Data-driven internal operators', competitor: 'Agents seeking a packaged lead-and-marketing service' },
    ],
    faqs: [
      { question: 'Are the companies affiliated?', answer: 'No affiliation is implied. They are separate products with similar category language.' },
      { question: 'Which product gives the customer direct audience control?', answer: 'Real Estate Intent is publicly designed around filtering and exporting audiences. Buyers should confirm current controls in a live product review.' },
      { question: 'Which is better for managed nurture?', answer: 'Real Intent publicly emphasizes nurture and marketing support, making it the more relevant product to evaluate for that requirement.' },
    ],
    related: [{ label: 'Audience builder', href: '/platform/audience-builder/' }, { label: 'Brokerage solution', href: '/solutions/real-estate-brokerages/' }],
  }),
  comparison({
    slug: 'compare/smartzip', competitor: 'SmartZip', title: 'Real Estate Intent vs SmartZip: behavioral evidence or predictive seller targeting?',
    description: 'Compare behavioral intent audiences and SmartZip predictive seller targeting, automated marketing, and farming workflows.',
    tldr: 'SmartZip publicly centers on predictive seller targeting and automated marketing for listing growth. Real Estate Intent centers on recently observed behavior across buyer, seller, distress, and mortgage categories. Choose based on whether the team wants predictive smart farming or a broader behavioral audience layer.',
    claimIds: ['rei.daily-cadence','smartzip.predictive'],
    category: 'This comparison is primarily about data philosophy and workflow. Predictive propensity and behavioral evidence can complement one another, but they should not be described as the same signal.',
    competitorFit: 'the primary job is predictive seller farming combined with automated marketing',
    reiFit: 'the team wants recent behavioral evidence across several real estate and mortgage categories',
    rows: [
      { factor: 'Data approach', rei: 'Observed behavioral research signals', competitor: 'Predictive seller targeting is the public emphasis' },
      { factor: 'Audience breadth', rei: 'Buyer, seller, distress, and mortgage research', competitor: 'Seller/listing opportunity is the core public focus' },
      { factor: 'Marketing workflow', rei: 'Exports into the customer’s systems', competitor: 'Automated marketing and follow-up are part of the public offering' },
      { factor: 'Best fit', rei: 'Teams building their own cross-category campaigns', competitor: 'Agents seeking a seller-farming system' },
    ],
    faqs: [
      { question: 'Is behavioral intent always better than predictive data?', answer: 'No. They answer different questions. Behavioral data adds recent observed context; predictive data estimates propensity from models and attributes.' },
      { question: 'Can a brokerage use both?', answer: 'Potentially. A controlled test can compare or combine cohorts while measuring incremental value and avoiding duplicate outreach.' },
      { question: 'Which product is more seller-specific?', answer: 'SmartZip’s public positioning is strongly centered on seller targeting and smart farming.' },
    ],
    related: [{ label: 'Behavioral vs predictive guide', href: '/resources/guides/behavioral-vs-predictive-real-estate-data/' }, { label: 'Home seller intent', href: '/use-cases/home-seller-intent/' }],
  }),
  comparison({
    slug: 'compare/propertyradar', competitor: 'PropertyRadar', title: 'Real Estate Intent vs PropertyRadar: behavioral intent or property intelligence?',
    description: 'Compare Real Estate Intent’s behavioral audience layer with PropertyRadar property, owner, search, marketing, and integration tools.',
    tldr: 'PropertyRadar publicly offers a broad property-and-owner intelligence platform with search, signals, diligence, marketing, and integrations. Real Estate Intent is narrower: it focuses on recent research behavior resolved into campaign audiences. Many teams may treat the products as complementary.',
    claimIds: ['rei.delivery','propertyradar.data'],
    category: 'Property intelligence and behavioral intent are adjacent categories. One explains properties, owners, and market attributes; the other adds evidence about current research activity.',
    competitorFit: 'the team needs deep property records, ownership, equity, mapping, diligence, and built-in prospecting tools',
    reiFit: 'the team already has property context and needs an external behavioral timing layer',
    rows: [
      { factor: 'Primary data', rei: 'Behavioral intent and resolved contacts', competitor: 'Property, owner, mortgage, distress, life-event, demographic, and related data are publicly described' },
      { factor: 'Research tools', rei: 'Audience filtering and preview', competitor: 'Property search, maps, profiles, comps, diligence, and list tools' },
      { factor: 'Activation', rei: 'CSV, ad-audience, and webhook workflow', competitor: 'Built-in marketing plus extensive integrations are publicly described' },
      { factor: 'Best fit', rei: 'Behavioral timing and audience activation', competitor: 'Comprehensive property intelligence and prospecting' },
    ],
    faqs: [
      { question: 'Does Real Estate Intent replace property records?', answer: 'No. Ownership, equity, liens, transaction history, and property facts require authoritative property-data sources.' },
      { question: 'Can the products be complementary?', answer: 'Yes. A team could use property intelligence for qualification and behavioral intent for timing, subject to data rights and governance.' },
      { question: 'Which is broader?', answer: 'PropertyRadar publicly documents a much broader property-data, research, marketing, and integration platform.' },
    ],
    related: [{ label: 'Identity resolution', href: '/platform/identity-resolution/' }, { label: 'Investor solution', href: '/solutions/real-estate-investors/' }],
  }),
  comparison({
    slug: 'compare/propstream', competitor: 'PropStream', title: 'Real Estate Intent vs PropStream: intent audiences or investor property data?',
    description: 'Compare Real Estate Intent behavioral audiences with PropStream property research, lead lists, analysis, and investor workflows.',
    tldr: 'PropStream publicly serves real estate prospecting and investor research with property data, lead lists, and analysis. Real Estate Intent adds a recent behavioral-research layer for buyer, seller, distress, and mortgage campaigns. The products solve different primary jobs.',
    claimIds: ['rei.delivery','propstream.data'],
    category: 'PropStream is primarily evaluated as a property-data and investor prospecting platform. Real Estate Intent is evaluated as a behavioral audience layer.',
    competitorFit: 'the team needs property records, market research, investor analysis, and property-derived lead lists',
    reiFit: 'the team wants research behavior and recency to prioritize campaigns across real estate and mortgage categories',
    rows: [
      { factor: 'Primary category', rei: 'Behavioral audience data', competitor: 'Property data and investor prospecting' },
      { factor: 'Qualification context', rei: 'Signal category, geography, recency, and contact profile', competitor: 'Property, transaction, market, and lead-list context' },
      { factor: 'Audience breadth', rei: 'Buyer, seller, distress, and mortgage', competitor: 'Property- and investor-oriented lead workflows' },
      { factor: 'Best fit', rei: 'Campaign timing', competitor: 'Property discovery and analysis' },
    ],
    faqs: [
      { question: 'Which product is better for property comps?', answer: 'PropStream is the relevant product to evaluate for property research and comparable analysis.' },
      { question: 'Which product focuses on recent online research?', answer: 'Real Estate Intent is positioned around behavioral research signals and audience activation.' },
      { question: 'Should investors use both categories?', answer: 'Potentially. Property data can qualify ownership and economics; behavioral intent can add a separate timing hypothesis.' },
    ],
    related: [{ label: 'Investor solution', href: '/solutions/real-estate-investors/' }, { label: 'Distressed-homeowner intent', href: '/use-cases/distressed-homeowner-intent/' }],
  }),
  comparison({
    slug: 'compare/total-expert-customer-intelligence', competitor: 'Total Expert Customer Intelligence', title: 'Real Estate Intent vs Total Expert Customer Intelligence: net-new audiences or customer context?',
    description: 'Compare net-new mortgage behavioral audiences with Total Expert enrichment, alerts, segmentation, and customer journeys.',
    tldr: 'Total Expert Customer Intelligence publicly enriches a financial institution’s customer records and connects insights to segmentation and journeys. Real Estate Intent is focused on building net-new behavioral audiences outside the lender’s existing database. Enterprise lenders may evaluate them as complementary layers.',
    claimIds: ['rei.delivery','totalexpert.intelligence'],
    category: 'This is not a like-for-like CRM comparison. The central distinction is net-new external audience creation versus intelligence and action inside a purpose-built financial-services customer platform.',
    competitorFit: 'the lender needs enterprise customer profiles, alerts, segmentation, and automated journeys around its known database',
    reiFit: 'the lender wants a focused source of net-new purchase, refinance, or equity-research audiences',
    rows: [
      { factor: 'Primary audience', rei: 'Net-new external behavioral audiences', competitor: 'Existing leads, prospects, customers, and borrower relationships' },
      { factor: 'Workflow', rei: 'Build and export an audience', competitor: 'Enrich profiles, surface alerts, segment, and trigger journeys' },
      { factor: 'System role', rei: 'Upstream audience source', competitor: 'Enterprise customer operating and engagement layer' },
      { factor: 'Best fit', rei: 'Acquisition audience generation', competitor: 'Retention, cross-sell, engagement, and enterprise lender workflows' },
    ],
    faqs: [
      { question: 'Does Real Estate Intent replace Total Expert?', answer: 'No. They occupy different system roles. A lender could evaluate external audiences as an input to an approved Total Expert workflow.' },
      { question: 'Which is better for borrower retention?', answer: 'Total Expert publicly emphasizes customer intelligence, retention, and journeys around known relationships.' },
      { question: 'Which is better for net-new audience creation?', answer: 'That is the primary role Real Estate Intent is designed to fill.' },
    ],
    related: [{ label: 'Mortgage lender solution', href: '/solutions/mortgage-lenders/' }, { label: 'CRM enrichment', href: '/use-cases/crm-enrichment/' }],
  }),
  comparison({
    slug: 'compare/trustengine', competitor: 'TrustEngine', title: 'Real Estate Intent vs TrustEngine: audience acquisition or borrower engagement?',
    description: 'Compare Real Estate Intent mortgage research audiences with TrustEngine borrower intelligence and Mortgage Coach workflows.',
    tldr: 'TrustEngine publicly provides mortgage-focused borrower intelligence and Mortgage Coach guidance experiences. Real Estate Intent supplies external behavioral audiences for acquisition. Buyers should separate the need for net-new demand generation from the need to guide and convert known borrowers.',
    claimIds: ['rei.delivery','trustengine.platform'],
    category: 'The products enter different parts of a lender’s growth stack. Real Estate Intent is upstream acquisition data; TrustEngine is evaluated in the context of borrower intelligence, guidance, and mortgage sales workflows.',
    competitorFit: 'the lender needs mortgage-specific borrower guidance and intelligence inside its sales process',
    reiFit: 'the lender needs external purchase, refinance, or equity research audiences to feed approved campaigns',
    rows: [
      { factor: 'Primary role', rei: 'Net-new behavioral audience source', competitor: 'Borrower intelligence and mortgage guidance' },
      { factor: 'User workflow', rei: 'Filter and activate audiences', competitor: 'Support borrower-facing mortgage conversations and lender workflows' },
      { factor: 'System position', rei: 'Top-of-funnel acquisition input', competitor: 'Sales and engagement layer' },
      { factor: 'Best fit', rei: 'Audience creation', competitor: 'Borrower conversion and guidance' },
    ],
    faqs: [
      { question: 'Are these products substitutes?', answer: 'Not cleanly. They solve different stages of the lender workflow and could be evaluated as complementary.' },
      { question: 'Which product is relevant to Mortgage Coach?', answer: 'TrustEngine is the company behind the Mortgage Coach experience described in its public materials.' },
      { question: 'Which product builds external intent audiences?', answer: 'Real Estate Intent is designed for that upstream audience role.' },
    ],
    related: [{ label: 'Purchase mortgage intent', href: '/use-cases/purchase-mortgage-intent/' }, { label: 'Best mortgage intent platforms', href: '/alternatives/best-mortgage-intent-data-platforms/' }],
  }),
];

const roundups: SeoPage[] = [
  {
    slug: 'alternatives/best-real-estate-intent-data-platforms', kind: 'roundup', parentLabel: 'Compare', parentHref: '/compare/', eyebrow: 'Buyer’s guide',
    title: 'Best real estate intent data platforms to evaluate in 2026.', shortTitle: 'Best real estate intent data platforms',
    description: 'A transparent framework for comparing behavioral intent, predictive seller, property data, and real estate audience platforms.',
    tldr: 'The strongest shortlist depends on the job. Evaluate Real Estate Intent or IntentGrid for behavioral audience workflows; LeadsPlease for packaged consumer intent datasets; SmartZip for predictive seller farming; and PropertyRadar or PropStream for broad property intelligence. Validate current facts directly with every vendor.',
    audience: 'Brokerage, growth, and data leaders', updated,
    claimIds: ['intentgrid.category','leadsplease.seller','smartzip.predictive','propertyradar.data','propstream.data'],
    sections: [
      { heading: 'Start by choosing the product category', paragraphs: ['“Real estate lead data” can describe unrelated products. A fair evaluation separates behavioral intent, predictive propensity, property intelligence, managed lead generation, and CRM engagement before comparing features.'], bullets: ['Behavioral audience platforms: timing and research context', 'Predictive seller platforms: modeled propensity', 'Property-data platforms: ownership, property, market, and diligence', 'Managed lead generation: packaged acquisition and nurture'] },
      { heading: 'The 2026 shortlist', paragraphs: ['Real Estate Intent, IntentGrid, LeadsPlease, Real Intent, SmartZip, PropertyRadar, and PropStream represent different approaches. The linked comparison pages document their public positioning and the circumstances in which each category is the stronger fit.'] },
      { heading: 'Run a proof of concept instead of buying a promise', paragraphs: ['Define the market, record requirements, time window, channel, suppression process, success metric, and evaluation period before a vendor supplies the test cohort. Normalize usable-record and outcome economics rather than comparing sticker price alone.'] },
    ],
    faqs: [
      { question: 'What is the best real estate intent data platform?', answer: 'There is no universal winner. The best option depends on whether the job is behavioral timing, property research, predictive farming, managed lead generation, or CRM engagement.' },
      { question: 'How should data quality be compared?', answer: 'Use a predefined sample test measuring required-field completeness, duplicate rate, contactability, provenance, recency, suppression, and downstream outcomes.' },
      { question: 'Should price per record decide the purchase?', answer: 'No. Normalize usage rights, minimums, completeness, validity, duplicates, signal age, workflow cost, and actual business outcomes.' },
    ],
    related: [{ label: 'Enterprise vendor checklist', href: '/resources/guides/enterprise-intent-data-vendor-checklist/' }, { label: 'Comparison hub', href: '/compare/' }],
  },
  {
    slug: 'alternatives/best-mortgage-intent-data-platforms', kind: 'roundup', parentLabel: 'Compare', parentHref: '/compare/', eyebrow: 'Buyer’s guide',
    title: 'Best mortgage intent data platforms to evaluate in 2026.', shortTitle: 'Best mortgage intent data platforms',
    description: 'Compare external mortgage intent audiences, customer intelligence, borrower retention, and mortgage engagement platforms.',
    tldr: 'Mortgage intent tools serve different system roles. Real Estate Intent and IntentGrid address external research audiences; Total Expert focuses on customer intelligence and journeys; TrustEngine supports borrower intelligence and mortgage guidance. A lender may need more than one layer.',
    audience: 'Mortgage lender, credit union, and branch leadership', updated,
    claimIds: ['intentgrid.category','totalexpert.intelligence','trustengine.platform'],
    sections: [
      { heading: 'Separate acquisition from retention', paragraphs: ['External behavioral audiences help identify net-new market demand. Customer-intelligence platforms enrich and monitor people already in a lender’s database. Borrower-engagement systems help sales teams guide and convert known opportunities. Those are complementary jobs.'] },
      { heading: 'A practical shortlist', paragraphs: ['Evaluate Real Estate Intent and IntentGrid for external intent audiences, Total Expert for enterprise customer intelligence and journeys, and TrustEngine for mortgage-focused borrower intelligence and guidance. Include additional vendors when their documented capabilities match the use case.'] },
      { heading: 'Lender procurement criteria', paragraphs: ['Require legal and compliance review, fair-lending governance, security evidence, permitted-use clarity, data provenance, identity methodology, suppression, auditability, integration details, and measurable proof-of-concept criteria.'] },
    ],
    faqs: [
      { question: 'Is mortgage intent data a credit report?', answer: 'Behavioral research data is not automatically a consumer report or underwriting input. Vendors and lender counsel should document the exact data, source, use, and restrictions.' },
      { question: 'Can one platform handle acquisition and retention?', answer: 'Some vendors span multiple jobs, but buyers should evaluate each system role independently rather than assuming one label covers the full lifecycle.' },
      { question: 'What should a lender test first?', answer: 'A narrow, compliance-approved cohort with predefined audience, channel, offer, measurement, consumer safeguards, and stop criteria.' },
    ],
    related: [{ label: 'Mortgage intent guide', href: '/resources/guides/mortgage-intent-data/' }, { label: 'Mortgage lender solution', href: '/solutions/mortgage-lenders/' }],
  },
];

const trustPages: SeoPage[] = [
  {
    slug: 'data-methodology', kind: 'trust', parentLabel: 'Home', parentHref: '/', eyebrow: 'Trust / Methodology',
    title: 'What the data says—and what it does not prove.', shortTitle: 'Data methodology',
    description: 'A transparent overview of Real Estate Intent signal sources, identity resolution, recency, validation, delivery, and limitations.',
    tldr: 'Real Estate Intent licenses behavioral signals from publishing partners and consented data networks, matches eligible signals to household records, validates available contact fields, and makes filtered audiences available for campaign use. Research behavior is evidence of interest—not proof of identity, consent, eligibility, or transaction readiness.',
    audience: 'Data, procurement, compliance, and growth teams', updated,
    claimIds: ['rei.daily-cadence','rei.delivery'],
    sections: [
      { heading: 'Signal-source categories', paragraphs: ['The public compliance page describes online behavioral signals, co-registration submissions where partner disclosures permit data sharing, and public or licensed datasets used for matching and validation. Enterprise buyers should request current vendor documentation and contract language for the exact product they purchase.'], bullets: ['Real estate and mortgage research activity', 'Eligible online submissions from partner sites', 'Public records and licensed data used for matching and validation'] },
      { heading: 'Identity and validation', paragraphs: ['The documented process includes identity resolution plus email, phone, and address validation. No process can make every match or field permanently correct. Buyers should evaluate a current sample and preserve source, timestamp, and dispute/removal processes.'] },
      { heading: 'Freshness and lookback', paragraphs: ['The compliance page describes a daily refresh cadence, a source window of roughly 48 hours to 30 days, and recurring address validation rather than real-time validation. “Fresh” should therefore be evaluated at the field level, not used as a single undifferentiated promise.'] },
      { heading: 'Limitations', paragraphs: ['Intent does not equal consent. It does not establish identity with certainty, property ownership, financial status, creditworthiness, legal status, representation status, or guaranteed readiness. Customers must validate facts required for their workflow and comply with applicable law and platform policy.'] },
    ],
    faqs: [
      { question: 'Where do the signals come from?', answer: 'Public documentation describes publishing partners, consented data networks, eligible online submissions, public records, and licensed data partners. Exact current sources should be confirmed under vendor diligence.' },
      { question: 'How old are the signals?', answer: 'The public compliance page describes a source window of roughly 48 hours to 30 days and a daily refresh cadence.' },
      { question: 'Does the platform provide proof of consent to contact?', answer: 'No. The compliance page explicitly states that it does not provide proof of individual opt-in to receive contact from a specific customer.' },
    ],
    related: [{ label: 'Compliance', href: '/compliance/' }, { label: 'Identity resolution', href: '/platform/identity-resolution/' }],
  },
  {
    slug: 'security', kind: 'trust', parentLabel: 'Home', parentHref: '/', eyebrow: 'Trust / Security',
    title: 'Security questions deserve concrete answers.', shortTitle: 'Security',
    description: 'Real Estate Intent security, data handling, access, retention, incident, and vendor-review information.',
    tldr: 'Real Estate Intent states that data is stored and processed on U.S. infrastructure with commercially reasonable safeguards including encryption, hashing where appropriate, access controls, and network protections. Enterprise buyers should request current control evidence and contract terms during review.',
    audience: 'Security, privacy, procurement, and IT teams', updated,
    sections: [
      { heading: 'Publicly documented controls', paragraphs: ['The current compliance page describes U.S.-based infrastructure, encryption, hashing where appropriate, access controls, and network protections. It also correctly states that no platform can guarantee absolute security.'], bullets: ['U.S.-based processing and storage', 'Encryption and hashing where appropriate', 'Access and network controls', 'Security limitations stated plainly'] },
      { heading: 'Enterprise review package', paragraphs: ['A mature vendor review should go beyond a marketing page. Request a current security questionnaire, architecture summary, subprocessor list, retention and deletion policy, access-control model, incident process, backup approach, and DPA where applicable.'] },
      { heading: 'Customer-side responsibilities', paragraphs: ['Exported files and downstream audience systems create their own risk. Customers should restrict access, encrypt transfers, minimize retained fields, log exports, enforce deletion, and propagate suppression and opt-out instructions.'] },
    ],
    faqs: [
      { question: 'Is Real Estate Intent SOC 2 certified?', answer: 'No certification claim is made on this page. Buyers should request current evidence directly rather than infer a certification.' },
      { question: 'Where is data processed?', answer: 'The public compliance page states that data is stored and processed on infrastructure within the United States.' },
      { question: 'How should exported files be protected?', answer: 'Use least-privilege access, encrypted transfer and storage, retention limits, export logging, suppression propagation, and secure deletion.' },
    ],
    related: [{ label: 'Compliance', href: '/compliance/' }, { label: 'Acceptable use', href: '/acceptable-use/' }],
  },
  {
    slug: 'about', kind: 'trust', parentLabel: 'Home', parentHref: '/', eyebrow: 'Company',
    title: 'Built around the moment before the lead.', shortTitle: 'About Real Estate Intent',
    description: 'Learn why Real Estate Intent focuses on fresh behavioral evidence for real estate and mortgage audience activation.',
    tldr: 'Real Estate Intent is a behavioral audience intelligence product from Next Level Web Design LLC. It helps real estate and mortgage teams turn recent online research patterns into filterable, contactable campaign audiences.',
    audience: 'Customers, partners, analysts, and prospective team members', updated,
    sections: [
      { heading: 'The timing problem', paragraphs: ['Real estate and mortgage teams have no shortage of records. The problem is deciding which market and audience deserves attention now. Static files describe fit; predictive models estimate propensity; behavioral evidence adds a more immediate research context.'] },
      { heading: 'The product principle', paragraphs: ['Real Estate Intent is designed to stay focused: detect relevant research patterns, resolve an eligible record, let an operator filter the cohort, and deliver it to the tools that already run campaigns.'] },
      { heading: 'Trust is part of the product', paragraphs: ['Intent data is easy to overstate. The company’s public methodology separates research from consent, eligibility, legal status, and guaranteed readiness. The long-term standard is dated claims, visible limitations, responsible activation, and measurable customer outcomes.'] },
    ],
    faqs: [
      { question: 'Who operates Real Estate Intent?', answer: 'Real Estate Intent is a service of Next Level Web Design LLC.' },
      { question: 'Is Real Estate Intent affiliated with Real Intent or RealtyIntent?', answer: 'No affiliation is stated. Real Estate Intent is the behavioral audience intelligence product at realestateintent.com.' },
      { question: 'How can I contact the company?', answer: 'General questions can be sent to hello@realestateintent.com. Legal and compliance questions can be sent to legal@realestateintent.com.' },
    ],
    related: [{ label: 'Explore the platform', href: '/platform/' }, { label: 'Read the methodology', href: '/data-methodology/' }],
  },
  {
    slug: 'pricing', kind: 'pricing', parentLabel: 'Home', parentHref: '/', eyebrow: 'Pricing',
    title: 'Founder pricing for the teams building the category.', shortTitle: 'Pricing',
    description: 'Real Estate Intent Founders Program pricing, included features, trial terms, seats, and usage details.',
    tldr: 'The public Beta / Founders Program is $997 per month for five seats with unlimited exports, searches, and previews; a 30-day lookback; all four primary intent categories and subcategories; webhook access; and a seven-day trial. Confirm current terms before purchase.',
    audience: 'Growth teams, brokerages, lenders, and operators', updated,
    claimIds: ['rei.delivery'],
    sections: [
      { heading: 'Beta / Founders Program — $997 per month', paragraphs: ['The public offer is presented as lifetime founder pricing while the subscription remains active, compared with a stated future price of $2,497 per month. The trial is seven days and the homepage states that no credit card is required.'], bullets: ['Unlimited exports', 'Five seats', '30-day lookback', 'Four primary categories plus subcategories', 'Unlimited searches and previews', 'Webhook access', 'Dedicated account manager', 'Seven-day trial'] },
      { heading: 'Evaluate value on usable outcomes', paragraphs: ['Do not compare intent products on nominal record price alone. Normalize required-field completeness, duplicate rate, permitted use, recency, match definition, workflow cost, and downstream business outcomes.'] },
      { heading: 'Before starting the trial', paragraphs: ['Choose one market, one category, one channel, one owner, and one outcome definition. A focused trial produces more useful evidence than exporting a large mixed list without a campaign design.'] },
    ],
    faqs: [
      { question: 'Is a credit card required for the trial?', answer: 'The public homepage states that the seven-day trial does not require a credit card. Confirm current checkout terms when enrolling.' },
      { question: 'How many seats are included?', answer: 'The public Founders Program lists five seats and states that additional seats are available for $50 per month each.' },
      { question: 'Are exports unlimited?', answer: 'Unlimited exports are listed in the public offer. Permitted use, plan limits, and current contract terms still apply.' },
    ],
    related: [{ label: 'Explore the platform', href: '/platform/' }, { label: 'Start free trial', href: 'https://app.realestateintent.com/signup' }],
  },
];

export const seoPages: SeoPage[] = [...hubs, ...capabilities, ...solutions, ...useCases, ...comparisons, ...roundups, ...trustPages];

export const pageBySlug = new Map(seoPages.map((page) => [page.slug, page]));


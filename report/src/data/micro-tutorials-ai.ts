import type { ReportData } from '../model/types';

/**
 * Sample report: Micro-Tutorials AI (Premium, 3 Feb 2026).
 * All values come from the source Validisory report. Evidence, importance,
 * exposure and impact states are template-derived (◇) from its text.
 */
export const microTutorialsAi: ReportData = {
  meta: {
    ventureName: 'Micro-Tutorials AI',
    description:
      'A web and mobile app where users type a problem, such as "WordPress white screen", and get a 1–3 minute interactive tutorial with step-by-step guidance, screenshots and short videos.',
    plan: 'Premium',
    assessedAt: '3 Feb 2026, 10:17',
    market: 'United States · WordPress SMB',
    reportId: '17c91932-ed1a-40ca-b800-f465768dd44b',
    tagline: 'Validate Smarter. Build Stronger.',
    coverNote: 'Prepared for the venture founder. Contains model estimates and assumptions, each marked where it appears.',
  },

  toc: [
    { key: 'decision', title: 'Decision', family: 'decision', density: 'EXECUTIVE', summary: 'Verdict, score, drivers, constraints, open questions' },
    { key: 'case', title: 'Venture Case', family: 'decision', density: 'EXECUTIVE', summary: 'At a glance · material conditions · summary · strengths & risks · actions' },
    { key: 'market', title: 'Market & Customer', family: 'market', density: 'ANALYTICAL', summary: 'TAM/SAM/SOM · ICP analysis module' },
    { key: 'business-model', title: 'Business Model', family: 'economics', density: 'ANALYTICAL', summary: 'Canvas and business model signals' },
    { key: 'financial', title: 'Financial Feasibility', family: 'economics', density: 'ANALYTICAL', summary: 'Revenue build, unit economics, costs, assumptions' },
    { key: 'competition', title: 'Competition', family: 'market', density: 'ANALYTICAL', summary: 'Positioning matrix, competitor table, five forces' },
    { key: 'technical', title: 'Technical Feasibility', family: 'economics', density: 'ANALYTICAL', summary: 'MVP effort, dependencies, scaling triggers' },
    { key: 'regulatory', title: 'Regulatory Exposure', family: 'risk', density: 'REFERENCE', summary: 'Regulation register and compliance cost' },
    { key: 'risk', title: 'Risk', family: 'risk', density: 'ANALYTICAL', summary: 'Probability × impact matrix, kill-switches' },
    { key: 'scenarios', title: 'Scenario Analysis', family: 'decision', density: 'ANALYTICAL', summary: 'Base case, stated sensitivities, contingency triggers' },
    { key: 'roadmap', title: 'Execution Roadmap', family: 'economics', density: 'ANALYTICAL', summary: 'Validate → Scale with decision gates' },
    { key: 'sources', title: 'Sources & Methodology', family: 'reference', density: 'REFERENCE', summary: 'Source cards, methodology, risk register appendix' },
  ],

  decision: {
    verdict: 'CONDITIONAL-GO',
    rationale:
      'Proceed under defined kill-switches rather than reject outright. The market and acquisition economics are viable. Single-founder capacity, SEO-only acquisition and a 12–24 month competitive window constrain the case.',
    rationaleBasis: 'Basis: Rating justification, source p.4',
    score: 51.5,
    evidenceQuality: 'weak',
    scoreNote: 'Score-to-verdict thresholds and dimension weights are not provided by the source.',
    drivers: [
      { title: 'Low acquisition cost', detail: '€0.30–0.60 per visitor via long-tail SEO, against 1.5–3.5M monthly US error searches.' },
      { title: 'Clear competitive white space', detail: 'High specificity at low price, a gap that neither free blogs nor managed hosting fill for 2.2M self-managed SMBs.' },
      { title: 'Bootstrap-viable economics', detail: '€135–225/month MVP cost. Pre-seed of €90–180k is optional.' },
    ],
    constraints: [
      { title: 'Google concentration', detail: '100% organic search acquisition, with AdSense as the primary Year-1 revenue. One policy or algorithm change can hit both.' },
      { title: 'Competitive window', detail: '12–24 months before GoDaddy, WordPress.com or major hosts embed in-context AI help.' },
      { title: 'Solo-founder ceiling', detail: '12–15 validated tutorials/week until AdSense reaches €900/month and funds a QA hire.' },
    ],
    questions: [
      { title: 'Will SMB owners pay €9/month?', detail: 'No customer has been asked yet. Interviews are action #1.' },
      { title: 'Will subscribers stay 3–6 months?', detail: 'Users with one-off fixes may cancel within 1–2 months.' },
      { title: 'Can SEO alone reach 5,000 visitors/month by Month 3?', detail: 'New domains take 3–6 months to gain traction (source p.19).' },
    ],
    primaryKillSwitch:
      'IF organic traffic stays below **5,000/month** after **6 months** and **100+** tutorials, THEN terminate or pivot.',
  },

  glance: {
    intro:
      'Eight evaluation dimensions. Competition (7) and Regulatory (8) are the strongest scores, though both partly reflect an absence of friction. Financial Viability and Scalability (4) constrain the case most.',
    dimensions: [
      { label: 'Market Demand', score: 6, finding: 'WordPress dominates but pain is nice-to-have; no paying customer validation yet', evidence: 'weak', basis: '"no paying customer validation yet"', see: 'icp' },
      { label: 'Financial Viability', score: 4, finding: 'LTV $2.40–$5 at 2–5% conversion requires 3–6 month retention; AdSense-dependent', evidence: 'weak', basis: 'conversion & retention are targets', see: 'financial' },
      { label: 'Competition Analysis', score: 7, finding: 'Saturated: GoDaddy, WP Engine, Kinsta, YouTube tutorials; platforms integrating AI support', evidence: 'partial', basis: 'engine competitor scan, no primary data', see: 'competition' },
      { label: 'Founder Market Fit', score: 5, finding: 'Has WordPress experience and fixed real errors; solo, no MVP, no team', evidence: 'partial', basis: 'founder-stated experience', see: 'technical' },
      { label: 'Technical Feasibility', score: 6, finding: 'Standard tech stack but no staging environment yet; 1–2 hours per tutorial', evidence: 'partial', basis: 'standard stack; staging not built', see: 'technical' },
      { label: 'Regulatory Compliance', score: 8, finding: 'Minimal regulatory friction; AdSense compliance and disclaimers manage liability risk easily', evidence: 'partial', basis: 'engine regulation scan, no legal review', see: 'regulatory' },
      { label: 'Timing Assessment', score: 6, finding: 'WordPress still growing but AI integration by platforms is emerging threat now', evidence: 'weak', basis: 'competitive window is an estimate', see: 'competition' },
      { label: 'Scalability Potential', score: 4, finding: 'Content creation bottleneck; 10–15 tutorials/week solo; manual validation limits scale', evidence: 'weak', basis: 'founder throughput estimate', see: 'technical' },
    ],
  },

  decisionCase: {
    intro:
      "Seven material conditions, taken from the report's kill-switches, critical path and risk register. None is yet strongly evidenced.",
    conditions: [
      { title: 'Long-tail error searches convert into organic traffic', assessment: '1.5–3.5M monthly US WordPress error searches exist [9]. Kill-switch: under 5,000 visitors/month after 6 months and 100+ tutorials. 100% of acquisition is organic.', refs: 'Refs [9] [13] · Kill-switch 1 · Critical path', evidence: 'partial', importance: 'material', exposure: 'critical' },
      { title: 'SMB owners will pay €9/month for premium', assessment: '2–5% conversion is a target. Willingness-to-pay interviews are an immediate action and have not been run yet.', refs: 'Refs [11] · Immediate action 1 · Risk #5', evidence: 'unvalidated', importance: 'material', exposure: 'high' },
      { title: 'Premium subscribers stay 3–6 months', assessment: 'Retention is modelled. The source warns that actual retention "may be 1–2 months" if users cancel once their issue is fixed.', refs: 'Refs [11] · Market barriers p.22', evidence: 'unvalidated', importance: 'material', exposure: 'high' },
      { title: 'AdSense stays available at US niche CPMs', assessment: 'CPM €1.08–1.80 from benchmarks [12]. AdSense is 60–75% of Year-1 revenue, and suspension is described as existential.', refs: 'Refs [12] · Risk #3 · Kill-switch 2', evidence: 'partial', importance: 'material', exposure: 'critical' },
      { title: 'Founder sustains 10–15 validated tutorials/week', assessment: 'Founder estimate (1–2 h each). No MVP or staging environment exists yet. The QA hire depends on €900/month AdSense.', refs: 'Founder Market Fit 5/10 · Risk #4, #14', evidence: 'weak', importance: 'significant', exposure: 'high' },
      { title: 'Incumbents do not ship in-context AI help inside the window', assessment: 'Window stated as 12–18, 12–24 and 18–24 months in different modules ⚠. Risk register: probability high, impact high.', refs: 'Engine estimate [15] · Risk #2 · Kill-switch 6', evidence: 'weak', importance: 'material', exposure: 'high' },
      { title: 'Human-verified tutorials avoid site-damaging errors', assessment: 'Staging validation is planned but not yet in place. Risk register: accuracy liability is probability high, impact high.', refs: 'Risk #1, #8, #15 · Kill-switch 3', evidence: 'unvalidated', importance: 'significant', exposure: 'high' },
    ],
    reading:
      'C01 and C04 decide whether there is a business at all, and both depend on Google. C02 and C03 decide whether it is worth more than ad revenue. Neither has been tested. The first 90 days (p.8) collect this evidence.',
  },

  summary: {
    blocks: [
      { key: 'Problem', accent: 'decision', text: 'WordPress runs 43.4% of all websites [2], and the average site has 20–30 plugins. When an error hits, non-technical SMB owners face three options: hours with outdated blogs and forums, freelance help at €45–135/hour, or managed hosting at €270–1,350/year.' },
      { key: 'Opportunity', accent: 'market', text: 'There are 1.5–3.5M monthly US searches for specific WordPress errors [9]. Existing answers sit at two extremes: free long-form content that takes time to interpret, or managed hosting that removes user control at premium prices. The serviceable market is 2.2M self-managed US small businesses spending €285M a year.' },
      { key: 'Proposed solution', accent: 'decision', text: 'AI-assisted, human-verified micro-tutorials that resolve one specific error in 1–3 minutes, with step-by-step guidance, annotated screenshots, short videos and mandatory rollback warnings. Every tutorial is validated in an isolated WordPress staging environment before publishing.' },
      { key: 'Commercial logic', accent: 'economics', text: 'Three revenue streams are layered. Year-1 AdSense (€900–2,700/month at 50,000 visitors). Premium at €9/month or €71/year, targeting 2–5% conversion. Year-2 white-label licensing to hosts at €450–900/month per partner. Acquisition is organic only.' },
      { key: 'Why now', accent: 'market', text: "Generative AI lowers tutorial cost (€0.90–2.70 per AI draft versus €45–90 fully manual). Hosting platforms have not yet embedded AI contextual help. Google's featured snippets reward structured, problem-specific content." },
      { key: 'Primary constraint', accent: 'risk', text: 'Acquisition and Year-1 revenue both depend on Google. Founder capacity of 10–15 validated tutorials a week caps velocity during a window the report estimates at 12–24 months.' },
      { key: 'Recommendation', accent: 'decision', text: 'Conditional-Go, score 51.5/100. Take a monitored, bootstrap approach with defined kill-switches rather than reject outright. Validate willingness to pay first, publish 50–60 tutorials in 12 weeks, and enforce the traffic and revenue kill-switches.' },
    ],
    marginStats: [
      { value: '43.4%', label: 'Websites on WordPress', source: 'EXT · W3Techs, Apr 2025 [2]', accent: 'market' },
      { value: '€285M', label: 'Serviceable market (SAM)', source: 'EST · bottom-up [7][8][10]', accent: 'market' },
      { value: '1.5–3.5M', label: 'Monthly US error searches', source: 'EXT · Google Trends, SEMrush [9]', accent: 'market' },
      { value: '12–24 mo', label: 'Competitive window', source: 'EST · engine [15] ⚠ varies', accent: 'risk' },
      { value: '€135–225', label: 'MVP infrastructure / month', source: 'EST · technical module', accent: 'economics' },
      { value: '2–5%', label: 'Target premium conversion', source: 'ASM · unvalidated', accent: 'decision' },
    ],
  },

  strengthsRisks: {
    strengths: [
      { title: 'Low customer acquisition cost', detail: '€0.30–0.60 per visitor via long-tail SEO. 1.5–3.5M monthly US error searches are organic demand with no paid spend.', importance: 'material', evidence: 'partial' },
      { title: 'Clear competitive white space', detail: 'The high-specificity, low-price quadrant is not served by free blogs or premium managed hosting.', importance: 'significant', evidence: 'partial' },
      { title: 'Bootstrap-viable economics', detail: '€135–225/month MVP cost and a defined scaling trigger at €900/month AdSense. Pre-seed of €90–180k only if speed is prioritised.', importance: 'significant', evidence: 'weak' },
      { title: 'Founder domain fit', detail: 'Hands-on WordPress admin and PHP/Laravel experience. Has reproduced and fixed real errors.', importance: 'contributing', evidence: 'partial' },
      { title: 'Low regulatory friction', detail: 'Regulatory 8/10. AdSense compliance and disclaimers manage liability risk.', importance: 'contributing', evidence: 'partial' },
    ],
    risks: [
      { title: 'Existential Google concentration', detail: '100% dependence on organic search and on AdSense for Year 1. An algorithm change or policy violation could remove traffic and monetisation at the same time.', exposure: 'critical', evidence: 'partial' },
      { title: 'Short competitive window', detail: '12–24 months before GoDaddy, WordPress.com and major hosts embed in-context AI help, which could commoditise the core value without users leaving their platform.', exposure: 'high', evidence: 'weak' },
      { title: 'Solo-founder throughput ceiling', detail: '12–15 validated tutorials a week is a hard limit. Scaling depends on reaching €900/month AdSense to fund the first QA contractor.', exposure: 'high', evidence: 'weak' },
      { title: 'Tutorial accuracy liability', detail: "An incorrect fix damages a user's site. Risk register: probability high, impact high.", exposure: 'high', evidence: 'unvalidated' },
      { title: 'Zero-click AI answers', detail: 'ChatGPT, Perplexity and AI Overviews answer in-search. 20–40% traffic reduction in some niches. Register: high / medium.', exposure: 'moderate', evidence: 'partial' },
    ],
    note:
      'S1–S3 and R1–R3 are the source\'s Key Strengths and Key Risks (p.4–5). S4–S5 come from the score breakdown, R4–R5 from the risk register. Severity follows probability × impact; "Critical" is used where the source says "existential". Significance and evidence are ◇ template-derived.',
  },

  actions: {
    intro:
      'Each action exists to produce evidence for a material condition (C01–C07, p.5). Owner is the founder throughout, because the team size is 1 until Month 4.',
    groups: [
      {
        horizon: '0–30 days',
        window: 'Weeks 1–4 · Validate',
        items: [
          { title: 'Run 15–20 structured interviews', why: 'With US SMB WordPress owners, to confirm willingness to pay €9/month and rank error categories.', evidence: 'WTP statements, top error types, current spend', threshold: null, conditions: 'C02' },
          { title: 'Build the staging quality gate', why: '5–8 hosting configurations. This is the gate for all content and cannot be outsourced until proven.', evidence: 'Validated test runs per config', threshold: 'Staging live and validating by Week 4', conditions: 'C07' },
          { title: 'Set kill-switch metrics', why: 'Terminate or pivot thresholds are agreed before any spend.', evidence: 'Analytics, Search Console, AdSense baselines', threshold: '8 kill-switches instrumented (p.15)', conditions: 'All' },
        ],
      },
      {
        horizon: '30–90 days',
        window: 'Weeks 5–12 · Build & test',
        items: [
          { title: 'Publish 50–60 validated tutorials ⚠', why: 'Long-tail, low-difficulty queries, with HowTo schema from day one, to establish baseline SEO authority.', evidence: 'Indexed pages, rankings, time to page 1', threshold: '5,000+ monthly organic visitors by Month 3', conditions: 'C01' },
          { title: 'Beta with 10–15 target customers', why: 'Measure whether tutorials actually solve the problem.', evidence: 'Success rate, time-to-resolution, premium intent', threshold: null, conditions: 'C02 C07' },
          { title: 'Ship premium tier (Stripe)', why: 'Ad-free and priority content at €9/month or €71/year.', evidence: 'Trial and paid conversions', threshold: '€90–270 AdSense and 2–5 premium subscribers at Month 4', conditions: 'C02 C04' },
        ],
      },
      {
        horizon: '90+ days',
        window: 'Months 4–9 · Scale',
        items: [
          { title: 'Hire first QA contractor', why: 'Breaks the solo throughput ceiling.', evidence: 'AdSense monthly revenue', threshold: 'Onboarded by Month 4–5 at €900/month AdSense', conditions: 'C05' },
          { title: 'Prove premium conversion', why: 'Below 1.5% means the pricing or value proposition needs redesign.', evidence: 'Free-to-paid conversion, churn', threshold: '≥ 2% by Month 6; retention 3+ months by Q3', conditions: 'C02 C03' },
          { title: 'Sign a SaaS partnership pilot', why: 'Diversifies revenue away from AdSense policy risk.', evidence: 'Signed pilot agreement', threshold: '≥ 1 pilot by Month 9', conditions: 'C04' },
        ],
      },
    ],
    conflict: 'The 12-week tutorial target is 50–60 in Immediate Actions (p.5) and 60–75 in the Roadmap critical path (p.107).',
  },

  businessModel: {
    note: 'Summaries. Full block detail continues in the appendix (source pp. 5–15).',
    keyPartners: ['AI vendors (OpenAI, Anthropic): drafts, €90–270/mo', 'Plugin/theme vendors: doc review, co-marketing', 'Managed hosts: future white-label', 'AdSense + Stripe: non-negotiable', 'Freelance QA testers at €18–36/h'],
    keyActivities: ['Manual staging validation, 1–2 h each', 'SEO content creation and publishing', 'Platform ops; support triage'],
    keyResources: ['Validated tutorial library (core IP)', 'Founder WordPress expertise (single point of failure)', 'Staging environments; SEO authority'],
    valuePropositions: ['Fix the exact error you Googled in 1–3 min', 'Human-verified on staging, with backup warnings', 'Zero jargon, built for non-developers', 'Free tier; premium €9/mo unlocks simulators, ad-free'],
    customerRelationships: ['Self-service, no account for free tier', 'Automated nurture → 7-day trial', 'Founder email support, 24–48 h SLA'],
    channels: ['Organic Google search: 100% of acquisition', 'Website delivery + Stripe checkout', 'Email digest; future plugin partnerships'],
    customerSegments: ['Primary: US SMBs (1–10 staff) self-managing WordPress, 30–55', 'Secondary: freelancers/agencies with 5–50 sites', 'Tertiary: hobbyists (high volume, low conversion)', 'Excludes enterprise, Wix/Squarespace/Shopify'],
    costStructure: ['Hosting + staging €45–135/mo fixed → €270–450 at 50K visitors', 'AI API €0.90–2.70/tutorial; Stripe 2.9% + €0.27; AdSense ~32% share', 'QA contractors €1,350–2,700/mo post-traction · legal €450–900 one-time · marketing €0 Y1'],
    revenueStreams: ['AdSense (primary Y1): €900–2,700/mo at 50K visitors', 'Premium €9/mo or €90/yr ⚠, 2–5% conversion', 'White-label (Y2) €450–900/mo per partner + €2,700–4,500 setup · affiliate €9–27/conversion'],
    signals: [
      { key: 'Strongest element', title: 'Cost structure', detail: '€0 paid acquisition and €135–225/month MVP make the model bootstrap-viable.', accent: 'market' },
      { key: 'Weakest element', title: 'Revenue streams', detail: 'Year 1 depends on AdSense. The subscription and B2B lines are unproven.', accent: 'risk' },
      { key: 'Most uncertain assumption', title: 'Subscriber LTV €270–540', detail: 'The source notes only €22.50–45 is paid during a 3–6 month subscription. The rest assumes renewals.', accent: 'decision' },
      { key: 'Highest dependency', title: 'Google organic search', detail: '100% of acquisition. Also the source of AdSense monetisation.', accent: 'risk' },
      { key: 'Primary economic risk', title: 'AdSense CPM or suspension', detail: 'An ad-market contraction could cut CPMs 20–40%. Suspension removes the primary revenue.', accent: 'economics' },
    ],
  },

  market: {
    insight:
      'Market size is not the constraint. Even the Year-3 target captures 0.19–0.25% of the serviceable market. The question is how fast a solo founder can capture it through search.',
    diagram: {
      tam: { value: 1800, label: '€1.8B' },
      sam: { value: 285, label: '€285M' },
      som: { value: 0.72, label: 'SOM Y3 ≤ €720k' },
      note: 'Square area ∝ value. SAM is 15.8% of TAM (CAL). The Year-1 SOM (€27k) would be under 1 px and is not drawn.',
    },
    tiers: [
      { key: 'TAM', value: '€1.8B', provenance: 'EST · TOP-DOWN', definition: 'US WordPress maintenance, support and managed hosting for SMBs (1–50 employees).', method: '€1.08B maintenance/support + €360M managed hosting + €350M DIY tools (10% of support spend).', crossCheck: 'Median €90/mo × 12M SMB WordPress sites × 8% buying support ≈ €1.03B baseline.', sources: '[1] [3] [4] [5] [6]' },
      { key: 'SAM', value: '€285M', provenance: 'EST · BOTTOM-UP', definition: 'US small businesses (1–10 staff) self-managing WordPress, searching for fixes, open to free or low-cost tools.', method: '28M SMBs × 18–22% WordPress × 88–92% self-managed × 45–55% with monthly errors ≈ 2.2M × €130/yr = €286M (CAL).', crossCheck: '~16% of TAM; 1.5–3.5M monthly error searches support a 2M+ active base.', sources: '[7] [8] [9] [10]' },
      { key: 'SOM', value: '€18k → €720k', provenance: 'EST · BOTTOM-UP', definition: 'Year 1–3 capture from organic SEO under solo-founder constraints.', method: 'Indexed tutorials × visitors/page × AdSense CPM + premium conversion 1.5–2% → 3–4%.', crossCheck: 'Y1 is 0.006–0.009% of SAM; Y3 is 0.19–0.25%.', sources: '[11] [12] [13] [14]' },
    ],
    somTitle: 'SOM trajectory by year · €k, range low–high',
    somBars: [
      { label: 'Year 1', low: 18, high: 27, display: '€18k–27k' },
      { label: 'Year 2', low: 135, high: 180, display: '€135k–180k' },
      { label: 'Year 3', low: 540, high: 720, display: '€540k–720k' },
    ],
    somNote:
      'Solid = low estimate, tint = range to high estimate. Model estimate based on the founder financial model [11] and SEO velocity benchmarks [13]. 150–180% YoY growth Y1→Y2 per source.',
  },

  financial: {
    fallbackNote:
      'The Financials module returned "N/A" (source p.53). This page brings together the economics stated in the BMC, Market SOM and Technical modules. No P&L, cash flow or break-even was computed.',
    metrics: [
      { value: '€0.30–0.60', label: 'Organic CAC / visitor', tag: { kind: 'USR' } },
      { value: '€270–405', label: 'Premium LTV', conflict: '⚠ €270–540 in BMC' },
      { value: '1.8–3.6 : 1', label: 'LTV : CAC', conflict: '⚠ 2.5–4.5× in SOM' },
      { value: '€90–180k', label: 'Optional pre-seed', tag: { kind: 'EST' } },
    ],
    revenue: {
      title: 'Revenue build by stream, Years 1–3 · €k',
      insight: 'Subscriptions overtake AdSense in Year 2. Year-3 streams add up to more than the stated total.',
      axisMax: 900,
      years: [
        { label: 'Year 1', streams: [{ stream: 'ads', value: 13.5 }, { stream: 'subscriptions', value: 4.5 }], high: 27, stated: '€18k–27k' },
        { label: 'Year 2', streams: [{ stream: 'ads', value: 54 }, { stream: 'subscriptions', value: 81 }], high: 180, stated: '€135k–180k' },
        { label: 'Year 3', streams: [{ stream: 'ads', value: 162 }, { stream: 'subscriptions', value: 378 }, { stream: 'partnerships', value: 72 }], high: 828, stated: '€540k–720k', conflict: '⚠ streams sum to €612k–828k' },
      ],
      note: 'Solid = low estimates · EST [11][12][13]',
    },
    costs: {
      title: 'Infrastructure cost by stage · € / month',
      axisMax: 2250,
      tiers: [
        { stage: 'MVP', scope: '15 tutorials · 1K visitors/mo', low: 135, high: 225, display: '€135–225' },
        { stage: 'Growth', scope: '50 tutorials · 10K visitors/mo', low: 450, high: 810, display: '€450–810' },
        { stage: 'Scale', scope: '200+ tutorials · 100K visitors/mo', low: 1350, high: 2250, display: '€1,350–2,250' },
      ],
    },
    callouts: [
      { label: 'Compliance set-up', value: '€9–18k', note: '+ €4.5–10.8k / yr' },
      { label: 'Full-time threshold', value: '€900–2,700', note: 'net revenue / mo (p.11)' },
    ],
    pnl: null,
    assumptions: [
      { name: 'Free-to-premium conversion', value: '2–5%', type: 'ASM', evidence: 'unvalidated', note: 'Y1 model uses 1.5–2%' },
      { name: 'Premium retention', value: '3–6 mo', type: 'ASM', evidence: 'unvalidated', note: 'SOM model uses 3–4.5 mo' },
      { name: 'Organic CAC per visitor', value: '€0.30–0.60', type: 'USR', evidence: 'weak', note: 'Founder financial model [11]' },
      { name: 'US WordPress niche AdSense CPM', value: '€1.08–1.80', type: 'EXT', evidence: 'partial', note: 'Benchmarks [12]' },
      { name: 'AdSense revenue at 50K visitors', value: '€900–2,700/mo', type: 'USR', evidence: 'weak', note: 'Founder model; first-hire trigger' },
      { name: 'Premium price, annual', value: '€71 ⚠ €90', type: 'USR', evidence: 'weak', note: '€71 (summary, roadmap) vs €90 (BMC)' },
    ],
  },

  competition: {
    insight:
      'The white space is real, but it is not defended. Four of five forces score High. The only lasting advantage named is execution speed on validated content during a 12–18 month window.',
    matrix: {
      title: 'Positioning: price × specificity',
      xAxis: 'PRICE: FREE → PREMIUM (€200+/MO)',
      yAxis: 'SPECIFICITY →',
      quadrants: { tl: 'HIGH SPEC · LOW PRICE', tr: 'HIGH SPEC · PREMIUM', bl: 'GENERIC · FREE', br: 'GENERIC · PREMIUM' },
      positions: [
        { name: 'WP Engine', x: 8, y: 7 },
        { name: 'Kinsta', x: 9, y: 7 },
        { name: 'GoDaddy', x: 6, y: 4 },
        { name: 'WordPress.com', x: 2, y: 4 },
        { name: 'Bluehost', x: 3, y: 3 },
        { name: 'YouTube', x: 1, y: 6 },
        { name: 'WPBeginner / blogs', x: 1, y: 7 },
        { name: 'WP Forums', x: 1, y: 2 },
        { name: 'Freelancers', x: 10, y: 9 },
        { name: 'WalkMe', x: 10, y: 3 },
      ],
      recommended: { label: 'Recommended', x: 2, y: 8.5 },
      note: 'Coordinates as given by the engine (0–10) [15]. Forums and freelancers are indirect alternatives.',
    },
    competitors: [
      { name: 'WP Engine', position: 'Market leader', pricing: '€22–450/mo', threat: 'medium' },
      { name: 'Kinsta', position: 'Challenger', pricing: '€31–1,350/mo', threat: 'medium' },
      { name: 'SiteGround', position: 'Challenger', pricing: '€2.70–13.50/mo', threat: 'low' },
      { name: 'GoDaddy', position: 'Market leader', pricing: '€5.85–22.50/mo', threat: 'high' },
      { name: 'Bluehost', position: 'Challenger', pricing: '€2.70–12.15/mo', threat: 'medium' },
      { name: 'WordPress.com', position: 'Market leader', pricing: '€0–40/mo', threat: 'high' },
      { name: 'Cloudways', position: 'Niche player', pricing: '€9–720/mo', threat: 'low' },
      { name: 'YouTube channels', position: 'Niche player', pricing: 'Free, ad-supported', threat: 'medium' },
      { name: 'WPBeginner & tutorial sites', position: 'Niche player', pricing: 'Free / affiliate', threat: 'high' },
      { name: 'WalkMe / DAPs', position: 'Niche player', pricing: '€9,000–90,000/yr', threat: 'low' },
    ],
    forces: [
      { force: 'New entrants', level: 'high', detail: 'AI tools commoditised; low capital needs' },
      { force: 'Supplier power', level: 'medium', detail: 'AI APIs, AdSense, WordPress.org' },
      { force: 'Buyer power', level: 'high', detail: 'Near-zero switching costs' },
      { force: 'Substitutes', level: 'high', detail: 'In-platform AI help; AI site builders' },
      { force: 'Rivalry', level: 'high', detail: 'Content farms, hosts, YouTube' },
    ],
    impact: 'threatens',
    impactNote:
      'Supports the case through positioning. It threatens the case through defensibility: GoDaddy, WordPress.com and WPBeginner-type sites are each rated High threat.',
  },

  technical: {
    insight:
      'Building it is not the hard part. The stack is standard and the MVP needs about 54 days of must-have work. The binding constraint is the manual validation step, which also scales with headcount.',
    timeline: {
      title: 'Development timeline · weeks',
      totalWeeks: 24,
      milestones: [
        { week: 10, label: 'MVP · wk 10 · 15 tutorials' },
        { week: 16, label: 'BETA · wk 16 · 50 tutorials, paywall' },
        { week: 24, label: 'LAUNCH · wk 24 · 100+ tutorials' },
      ],
    },
    featureTitle: 'MVP build effort · days per feature',
    features: [
      { name: 'AI tutorial generation engine', days: 5, mustHave: true },
      { name: 'Docker staging environment', days: 4, mustHave: true },
      { name: 'Tutorial CRUD API + PostgreSQL', days: 6, mustHave: true },
      { name: 'SEO Next.js tutorial pages', days: 7, mustHave: true },
      { name: 'Step-by-step tutorial UI', days: 5, mustHave: true },
      { name: 'AdSense integration', days: 2, mustHave: true },
      { name: 'Legal disclaimers & backup warnings', days: 1, mustHave: true },
      { name: 'User authentication', days: 4, mustHave: true },
      { name: 'Stripe premium paywall', days: 5, mustHave: true },
      { name: 'Premium content gating', days: 3, mustHave: true },
      { name: 'Search Console + GA4', days: 2, mustHave: true },
      { name: 'Playwright validation tests', days: 6, mustHave: true },
      { name: 'Mobile-responsive design', days: 4, mustHave: true },
      { name: 'Interactive error simulator (3)', days: 10, mustHave: false },
      { name: 'Internal admin dashboard', days: 5, mustHave: false },
      { name: 'Ahrefs keyword research tool', days: 4, mustHave: false },
      { name: 'Redis caching layer', days: 3, mustHave: false },
      { name: 'User feedback mechanism', days: 3, mustHave: false },
      { name: 'Newsletter signup', days: 2, mustHave: false },
      { name: 'CCPA cookie banner', days: 2, mustHave: false },
    ],
    platform: 'Micro-Tutorials platform · Express API + Next.js',
    dependencies: [
      { group: 'AI generation', items: ['OpenAI GPT-4 API (drafts)', 'Backup: Claude / Gemini'], risk: 'Risk #13' },
      { group: 'Validation', items: ['Docker staging on EC2', 'Playwright automated tests'], risk: 'Not built yet' },
      { group: 'Delivery', items: ['Next.js 14 on Vercel', 'CloudFront CDN'], risk: 'SEO-critical SSR' },
      { group: 'Data', items: ['PostgreSQL RDS · S3', 'Redis (ElastiCache)'], risk: 'us-east-1 (CCPA)' },
      { group: 'Monetisation', items: ['Google AdSense', 'Stripe billing'], risk: 'Risk #3' },
    ],
    scaleTriggers: [
      { visitors: '10K', action: 'Upgrade RDS, Redis for top 20 pages, CloudFront for static assets' },
      { visitors: '50K', action: 'AI generation to FastAPI on Lambda; Redis cluster' },
      { visitors: '100K', action: 'Read replicas; SSG/ISR for 90% of pages (−60% server cost)' },
      { visitors: '500K', action: 'Full microservices; auto-scaling API groups' },
    ],
    unknowns: [
      'No staging environment exists yet (score breakdown)',
      'Can automated Playwright tests cut validation from 2 h to 30 min?',
      'Team: 1 → 4 by Month 9 (QA m4, frontend m6, DevOps m9)',
    ],
    conflict: '⚠ The Technical module specifies Next.js + Express. The Roadmap (p.98) says to build the MVP on no-code/low-code tools.',
  },

  regulatory: {
    intro:
      'Regulatory Compliance scores 8/10. The material exposure is contractual and liability-related (AdSense policy, tutorial accuracy) rather than statutory.',
    costs: [
      { value: '€9–18k', label: 'Set-up' },
      { value: '€4.5–10.8k', label: 'Annual' },
      { value: '€4.5–9k', label: 'Legal fees' },
    ],
    regulations: [
      { name: 'CCPA/CPRA + VA, CO, CT, UT privacy acts', applicability: 'Applies. AdSense counts as "sharing".', exposure: 'low', action: 'Cookie consent, Do Not Sell link, rights portal, DPAs, data minimisation', timing: 'Pre-launch', basis: 'Risk #12' },
      { name: 'Google AdSense Program & IVT policies', applicability: 'Applies. Contractual; primary revenue.', exposure: 'high', action: 'Compliant content; no ads on low-value pages; bot detection', timing: 'Continuous', basis: 'Risk #3' },
      { name: 'Content accuracy & professional liability', applicability: 'Applies to every tutorial.', exposure: 'high', action: '"Informational only" disclaimers; backup step; ToS liability cap; E&O €900–2,700/yr', timing: 'Pre-launch', basis: 'Risk #1, #8' },
      { name: 'FTC Act §5 & affiliate disclosure', applicability: 'Applies if affiliate links are used.', exposure: 'undetermined', action: 'Accurate policies; conspicuous affiliate disclosure', timing: 'At affiliate launch', basis: 'Module' },
      { name: 'CAN-SPAM Act', applicability: 'Applies. Email nurture planned.', exposure: 'undetermined', action: 'Opt-out, physical address, accurate subject lines', timing: 'At email launch', basis: 'Module' },
      { name: 'COPPA', applicability: 'Only if minors use the platform.', exposure: 'undetermined', action: 'State "not directed at under-13s"; age-gate if needed', timing: 'Pre-launch', basis: 'Module' },
      { name: 'DMCA', applicability: 'Only if user uploads are enabled.', exposure: 'undetermined', action: 'Takedown process; register agent (~€5.40)', timing: 'With UGC', basis: 'Module' },
      { name: 'State sales tax nexus', applicability: 'Depends on sales per state.', exposure: 'undetermined', action: 'Register where thresholds are met (typ. $100k or 200 transactions)', timing: 'At threshold', basis: 'Module' },
      { name: 'ADA Title III / WCAG 2.1 AA', applicability: 'Best practice, not strictly required.', exposure: 'undetermined', action: 'Follow WCAG 2.1 AA to reduce litigation risk', timing: 'Build', basis: 'Module' },
      { name: 'WordPress trademark', applicability: 'Descriptive use only.', exposure: 'undetermined', action: 'Keep "WordPress" out of the brand name; independent positioning', timing: 'Pre-launch', basis: 'BMC p.12' },
      { name: 'EU AI Act / AI transparency laws', applicability: 'Future: EU expansion or licensing.', exposure: 'undetermined', action: 'Disclose AI-generated content', timing: 'Before EU entry', basis: 'Market p.23' },
    ],
    disclaimer:
      'This register reflects an automated scan of a US-only launch. Applicability, especially COPPA, sales-tax nexus and EU AI Act, needs confirmation by counsel before launch.',
  },

  risk: {
    intro:
      '15 risks in the register. Three sit in the high × high cell: accuracy liability, platform AI help and the founder bottleneck.',
    register: [
      { id: 1, title: 'AI tutorial accuracy liability: an incorrect fix damages a user site', probability: 'high', impact: 'high', category: 'Regulatory', mitigation: 'Manual staging test of every tutorial; prominent disclaimers; backup warnings before risky steps' },
      { id: 2, title: 'WordPress.com or GoDaddy add in-context AI help within 12 months', probability: 'high', impact: 'high', category: 'Strategic', mitigation: 'Build 200+ validated tutorials fast; dominate long-tail SEO before platforms catch up' },
      { id: 3, title: 'AdSense policy violation or account suspension kills primary revenue', probability: 'medium', impact: 'high', category: 'Dependency', mitigation: 'Diversify monetisation early; add affiliate income; never rely 100% on AdSense' },
      { id: 4, title: 'Solo-founder bottleneck: max 12–15 tutorials/week', probability: 'high', impact: 'high', category: 'Execution', mitigation: 'Hire first QA contractor at €900/month AdSense threshold; automate staging tests' },
      { id: 5, title: 'Premium conversion stays below 2%', probability: 'high', impact: 'medium', category: 'Financial', mitigation: 'A/B test premium value props monthly; focus on AdSense revenue until 50K visitors' },
      { id: 6, title: 'WordPress share declines or users shift to no-code platforms', probability: 'medium', impact: 'high', category: 'Market', mitigation: 'Monitor WordPress install trends quarterly; prepare a Shopify/Wix expansion plan' },
      { id: 7, title: 'Google core update tanks organic traffic overnight', probability: 'medium', impact: 'high', category: 'Dependency', mitigation: 'Diversify traffic: YouTube tutorials, Reddit, email list' },
      { id: 8, title: 'User lawsuit after a tutorial causes data loss or downtime', probability: 'medium', impact: 'high', category: 'Regulatory', mitigation: 'Legal review of disclaimers; general liability insurance; mandatory backup step' },
      { id: 9, title: 'ChatGPT or Perplexity answer in-search, bypassing site visits', probability: 'high', impact: 'medium', category: 'Market', mitigation: 'Interactive tools and simulators ChatGPT cannot offer; optimise for zero-click queries' },
      { id: 10, title: 'Runway ends before €900/month AdSense or first paying customers', probability: 'medium', impact: 'high', category: 'Financial', mitigation: 'Bootstrap; operate part-time until traction; no external spend before validation' },
      { id: 11, title: 'Content accuracy decays as WordPress and plugins update', probability: 'high', impact: 'medium', category: 'Technical', mitigation: 'Quarterly refresh cycle; user feedback loop; version-tag tutorials with dates' },
      { id: 12, title: 'CCPA or state privacy laws require costly compliance', probability: 'low', impact: 'medium', category: 'Regulatory', mitigation: 'GDPR-compliant tools from day one; avoid unnecessary personal data' },
      { id: 13, title: 'OpenAI API price hike or outage stops tutorial generation', probability: 'medium', impact: 'medium', category: 'Dependency', mitigation: 'Build the library offline; test Claude/Gemini as backup; cache validated content' },
      { id: 14, title: 'Founder burnout from manual QA with no co-founder', probability: 'medium', impact: 'medium', category: 'Execution', mitigation: 'Strict 15 tutorials/week limit; automate repetitive tasks; hire part-time help early' },
      { id: 15, title: 'One viral bad tutorial on Reddit or Hacker News damages the brand', probability: 'low', impact: 'high', category: 'Customer', mitigation: 'Peer-review high-traffic tutorials; community feedback; quick takedown protocol' },
    ],
    killSwitches: [
      { condition: 'organic traffic < 5,000 visitors/month', when: 'after 6 months and 100+ tutorials', outcome: 'TERMINATE / PIVOT', reason: 'SEO strategy has failed' },
      { condition: 'AdSense < €450/month and premium conversion < 1%', when: 'after 12 months', outcome: 'TERMINATE / PIVOT', reason: 'Monetisation is broken' },
      { condition: 'a lawsuit or viral brand-damaging incident from an inaccurate tutorial', when: 'any time', outcome: 'SHUT DOWN / REBRAND', reason: 'Rebuild under a new brand' },
      { condition: 'WordPress share < 35% of all websites', when: 'within 24 months', outcome: 'KILL-SWITCH', reason: 'Platform dependency is critical' },
      { condition: 'founder cannot commit 20+ hours/week', when: 'for 9+ months', outcome: 'KILL-SWITCH', reason: 'Velocity never reaches viable scale' },
      { condition: 'GoDaddy, WordPress.com or Wix launch in-context AI help and traffic drops 50%+', when: 'within 60 days', outcome: 'KILL-SWITCH', reason: 'The moat is gone' },
      { condition: 'OpenAI API costs > €450/month', when: 'before revenue reaches €900/month', outcome: 'KILL-SWITCH', reason: 'Unit economics are underwater' },
      { condition: 'first QA contractor not hired (cash constraints)', when: 'within 6 months', outcome: 'KILL-SWITCH', reason: 'Scaling path is blocked' },
    ],
    killSwitchSource: 'Source p.96',
  },

  scenarios: {
    intro:
      'The source states several sensitivities but does not re-score the venture under them. Inputs and changed values are shown. The resulting venture state stays empty until the scenario engine runs.',
    baseCase: [
      { key: 'CAC', value: '€0.30–0.60', note: 'per visitor · USR' },
      { key: 'Pricing', value: '€9 / mo', note: '€71 or €90 / yr ⚠' },
      { key: 'Conversion', value: '2–5%', note: 'ASM · Y1 1.5–2%' },
      { key: 'Retention', value: '3–6 mo', note: 'ASM · unvalidated' },
      { key: 'Market', value: '€285M', note: 'SAM · US only' },
      { key: 'Regulatory cost', value: '€9–18k', note: 'setup + €4.5–10.8k/yr' },
    ],
    whatIfs: [
      { question: 'WHAT IF AdSense CPMs fall 20–40%?', basis: 'Recession or ad-market contraction (source p.22).', from: '€1.08–1.80 CPM', to: '€0.65–1.44 CPM', provenance: 'CAL', result: null },
      { question: 'WHAT IF a Google core update cuts rankings 20–60%?', basis: '3–5 core updates a year; 100% of acquisition is organic (p.22).', from: '100% organic traffic', to: '40–80% of baseline', provenance: 'CAL', result: null },
      { question: 'WHAT IF AI Overviews reduce click-through 20–40%?', basis: 'Zero-click answers are already observed in some niches (p.97).', from: 'Baseline visits', to: '60–80% of baseline', provenance: 'CAL', result: null },
      { question: 'WHAT IF retention is 1–2 months, not 3–4.5?', basis: 'Users may cancel after their immediate issue is fixed (p.22).', from: '3–4.5 mo', to: '1–2 mo', provenance: 'ASM', result: null },
      { question: 'WHAT IF a different market is selected?', basis: 'Canada, UK and Australia are named as possible in Years 2–3 but not assessed.', from: 'US', to: '— not assessed', provenance: '—', result: null },
    ],
    contingencies: [
      { trigger: 'AdSense suspended or CPC < €0.45/click', response: 'Shift to affiliate monetisation · Patreon/Ko-fi ad-free tier · B2B white-label for hosts and agencies', pivot: 'Embeddable tutorial widgets for hosts via SaaS licensing' },
      { trigger: 'WordPress.com or GoDaddy launch in-context AI help within 12 months', response: 'Double down on ultra-long-tail queries · premium simulators and diagnostics · expand to Shopify, WooCommerce, Magento', pivot: 'Browser extension for real-time error detection and fixes' },
      { trigger: 'Premium conversion < 1.5% after 6 months and 50K visitors', response: 'Paywall only advanced tools · test €71 annual plan · focus on AdSense and affiliates', pivot: 'Affiliate and partnership revenue model' },
      { trigger: 'Organic traffic −40% from an algorithm update or AI Overviews', response: 'Accelerate YouTube and Reddit · weekly email digest · Chrome extension', pivot: 'Error-monitoring SaaS dashboard with recommendations' },
      { trigger: 'Founder cannot sustain 15 tutorials/week for 3+ months', response: 'Two part-time QA contractors at €450/mo · pause creation, monetise library · crowdsource with moderation', pivot: 'Marketplace where experts publish and monetise tutorials' },
    ],
    contingencySource: 'Source pp. 94–96',
  },

  roadmap: {
    intro:
      "Five stages, each ending in a decision gate. The venture moves on only when the gate's evidence arrives. Two gates have no threshold in the source and need one before work starts.",
    stages: [
      { stage: 'Validate', window: 'Weeks 1–2', objective: 'Confirm the pain and willingness to pay', actions: ['15–20 discovery interviews', 'Staging with 5–8 hosting configs', 'Rank top 10 error queries', 'Define validation workflow'], gate: 'Do SMB owners confirm WTP?', evidence: 'Interview evidence, error priorities', threshold: null },
      { stage: 'Build', window: 'Weeks 3–6', objective: 'Ship the free tier and first tutorials', actions: ['MVP platform (low-code ⚠)', '10 tutorials, then 20–25 published', 'AdSense; schema markup; GA + GSC', 'Launch free tier, no login'], gate: 'Is the quality gate working?', evidence: 'Validated, indexed tutorials', threshold: 'Staging proven by Week 4' },
      { stage: 'Test', window: 'Weeks 7–10', objective: 'Prove tutorials solve real problems', actions: ['10–15 beta testers', 'Premium €9/mo or €71/yr (Stripe)', 'Success rate, time-to-resolution', 'First interactive feature'], gate: 'Do tutorials work, and do users pay?', evidence: 'Success rate, conversion intent', threshold: null },
      { stage: 'Launch', window: 'Weeks 11–12', objective: 'Reach baseline SEO coverage', actions: ['60–75 tutorials total', 'A/B test ad density', 'Beta case studies; email capture'], gate: 'Month-4 success criteria', evidence: 'Traffic, AdSense, subscribers', threshold: '5,000+ visitors/mo · €90–270 AdSense · 2–5 subscribers' },
      { stage: 'Scale', window: 'Months 4–6', objective: 'Break the founder bottleneck', actions: ['QA hire at €900/mo AdSense', '150–200 tutorials', '5–10 partner conversations', 'Optimise conversion funnel'], gate: 'Does SEO-only growth sustain?', evidence: 'Visitors, RPM, conversion, churn', threshold: '25–50K visitors · €450–1,350/mo AdSense · ≥2% conversion' },
    ],
    yearOne: [
      { label: 'Year-1 revenue', value: '€18–27k', note: '€13.5–18k ads · €4.5–9k subs' },
      { label: 'Unique visitors', value: '150–250k', note: 'annual' },
      { label: 'Premium subscribers', value: '100–200', note: '⚠ SOM model: 50–75 by December', conflict: true },
    ],
    okrs: [
      { objective: 'Dominate long-tail WordPress error SEO (US)', keyResults: ['Top 3 for 50+ target keywords by Q4', '150,000+ organic sessions in Year 1', 'Time on page > 2 min; bounce < 60%'] },
      { objective: 'Validate and scale multi-channel monetisation', keyResults: ['€13.5–18k AdSense at RPM > €9', '100–200 subscribers at 2–5% conversion ⚠', '2 SaaS pilots, €900–2,700'] },
      { objective: 'Build scalable, high-quality content operations', keyResults: ['400–500 validated tutorials by year end', '< 5% tutorial error/complaint rate', '1–2 QA contractors onboarded by Q3'] },
    ],
  },

  sources: {
    intro:
      'The source report cites references only in the Market module, and none includes a URL. Every other module is an engine estimate [15]. That gap is shown here rather than hidden.',
    sources: [
      { id: 1, title: 'US web hosting market USD 58.3B (2024)', publisher: 'Statista', date: '2024', url: null, type: 'EXT', usedFor: 'TAM' },
      { id: 2, title: 'WordPress powers 43.4% of all websites', publisher: 'W3Techs', date: 'Apr 2025', url: null, type: 'EXT', usedFor: 'TAM · growth drivers' },
      { id: 3, title: 'Global WordPress maintenance & support market USD 1.2B; NA 7.8% CAGR 2024–30', publisher: null, date: null, url: null, type: 'EXT', usedFor: 'TAM' },
      { id: 4, title: 'Managed WordPress hosting USD 400M globally, 20% CAGR', publisher: null, date: null, url: null, type: 'EXT', usedFor: 'TAM' },
      { id: 5, title: 'WordPress hosting market €9.8B (2024) → €18.1B (2033)', publisher: null, date: null, url: null, type: 'EXT', usedFor: 'TAM · growth' },
      { id: 6, title: 'US accounts for 89% of web hosting services market growth', publisher: 'IMARC Group', date: null, url: null, type: 'EXT', usedFor: 'TAM' },
      { id: 7, title: '28M US small businesses (1–10 employees)', publisher: 'US Small Business Administration', date: null, url: null, type: 'EXT', usedFor: 'SAM' },
      { id: 8, title: 'WordPress adoption 18–22% in US SMB segment', publisher: null, date: null, url: null, type: 'EXT', usedFor: 'SAM' },
      { id: 9, title: '1.5M–3.5M monthly US WordPress error queries', publisher: 'Google Trends · SEMrush', date: null, url: null, type: 'EXT', usedFor: 'SAM · demand' },
      { id: 10, title: 'Maintenance spend USD 15–500/mo; DIY tools €90–130/yr', publisher: 'Founder research', date: null, url: null, type: 'USR', usedFor: 'SAM' },
      { id: 11, title: 'CAC €0.30–0.60, €9/mo, conversion 1.5–4%, retention 3–4.5 mo', publisher: 'Founder financial model', date: null, url: null, type: 'USR', usedFor: 'SOM · unit economics' },
      { id: 12, title: 'AdSense CPM USD 1.2–2.0, US WordPress niche', publisher: null, date: null, url: null, type: 'EXT', usedFor: 'SOM · revenue' },
      { id: 13, title: 'SEO velocity: 10–100 visitors/page over 12–24 months', publisher: 'Ahrefs · SEMrush', date: null, url: null, type: 'EXT', usedFor: 'SOM' },
      { id: 14, title: 'Niche content platforms €18–45k Y1, €90–180k Y2 ARR', publisher: 'Indie Hackers · MicroConf', date: null, url: null, type: 'EXT', usedFor: 'SOM cross-check' },
      { id: 15, title: 'Scores, competitor assessments, risk register, regulatory scan', publisher: 'Validisory engine', date: '3 Feb 2026', url: null, type: 'EST', usedFor: 'All modules' },
    ],
    methodology: [
      { title: 'Scoring', text: 'Eight dimensions are scored 0–10 and combined into a 0–100 score. Weights are not disclosed. The unweighted mean would be 57.5, so weighting lowers the result to 51.5.' },
      { title: 'Currency', text: 'Values are shown in € as in the source, which converted USD figures (e.g. USD 58.3B → €52.5B). The conversion rate is not stated.' },
      { title: 'Conflicts flagged · 6', text: 'LTV, LTV:CAC, annual price, competitive window, Y3 SOM total and Y1 subscriber target. Each is marked ⚠ where it appears.' },
    ],
  },

  icp: {
    number: '03.2',
    title: 'Customer & ideal customer profile',
    shortTitle: 'Customer & ICP',
    purpose: 'Purpose: who feels the pain, what triggers a search, and what they will pay.',
    keyFinding:
      'The customer and trigger are well defined and visible in search data. Whether they will pay, and keep paying, after the crisis is over has not been tested.',
    metrics: [
      { value: '2.2M', label: 'SAM businesses', tag: { kind: 'EST' } },
      { value: '45–55%', label: 'Sites with monthly errors', tag: { kind: 'EST' } },
      { value: '€90–900', label: 'Downtime cost / day', tag: { kind: 'EST' } },
      { value: '€0–120', label: 'DIY tool budget / year', tag: { kind: 'USR', text: 'USR [10]' } },
    ],
    profile: [
      { key: 'Primary customer', text: 'US small-business owner (1–10 staff) self-managing WordPress with no IT: restaurants, salons, contractors, dental practices, retailers. Age 30–55 (BMC) / 35–55 (demographics).', evidence: 'partial' },
      { key: 'Problem', text: 'Cryptic errors, plugin conflicts (20–30 plugins per site), white screen, SSL and database connection failures. Existing content is too long, outdated or written for developers.', evidence: 'partial' },
      { key: 'Trigger', text: 'Site-down crisis. 45–55% of self-managed sites hit errors monthly; downtime costs €90–900/day for e-commerce and lead-gen sites.', evidence: 'weak' },
      { key: 'Current alternative', text: 'Google + long blog posts or 20–40 min YouTube videos; forums; freelancers at €90–450 one-off; managed-host tickets with 4–24 h response.', evidence: 'partial' },
      { key: 'Pain severity', text: 'Urgent when the site is down. ⚠ The dimension score calls the pain "nice-to-have". The two readings are not yet reconciled.', evidence: 'weak' },
      { key: 'Willingness to pay', text: '€0–120/yr for DIY tools vs €180–6,000/yr managed. 1.5–4% expected to pay €9/month.', evidence: 'unvalidated' },
      { key: 'Buying behaviour', text: 'Searches the exact error message; prefers visual steps; trust signals and rollback guidance are critical; low tolerance for trial and error.', evidence: 'weak' },
      { key: 'Acquisition channel', text: 'Organic Google search: 100% of acquisition in Year 1. No paid budget.', evidence: 'partial' },
    ],
    segments: [
      { segment: 'Primary', who: 'US SMB owners, self-managed WordPress', role: 'Core premium target; urgent site-down scenarios', spend: '€27–450/mo on hosting & maintenance' },
      { segment: 'Secondary', who: 'Freelance developers & agencies (5–50 sites)', role: 'Quick edge-case fixes; value time over cost', spend: null },
      { segment: 'Tertiary', who: 'Hobbyists & DIY site builders', role: 'High search volume, low premium conversion', spend: 'Prefer free, ad-supported' },
    ],
    meaning: [
      'Acquisition fits the customer. They search the exact error text, which is what long-tail SEO targets.',
      'Premium value is crisis-driven. Without ongoing value, retention defaults to the length of one fix.',
      'The budget gap (€0–120 DIY vs €180–6,000 managed) supports €9/month only if trust is earned first.',
    ],
    assumptions: [
      { kind: 'ASM', text: '1.5–4% of visitors will pay €9/month' },
      { kind: 'ASM', text: 'Recurring need beyond the first crisis' },
      { kind: 'EXT', text: 'Search demand 1.5–3.5M/month [9]' },
    ],
    impact: 'constrains',
    impactNote:
      'Customer definition supports the case. Untested willingness to pay limits it to Conditional-Go until interviews (action 1) report.',
  },

  pageSources: {
    decision: 'Source pp. 1–5',
    glance: 'Source pp. 1–2',
    'decision-case': 'Source pp. 4–5, 88–98, 107–108',
    summary: 'Source pp. 2–4',
    'strengths-risks': 'Source pp. 1–5, 88–91',
    actions: 'Source pp. 5, 98–108',
    'business-model': 'Source pp. 5–15',
    market: 'Source pp. 15–24',
    financial: 'Source pp. 3–20, 53, 66–67, 80',
    competition: 'Source pp. 28–53',
    technical: 'Source pp. 53–72, 98',
    regulatory: 'Source pp. 12, 72–80',
    risk: 'Source pp. 88–98',
    scenarios: 'Source pp. 21–28, 94–98',
    roadmap: 'Source pp. 98–109',
    sources: 'Source pp. 15–21',
    icp: 'Source pp. 5–7, 24–28',
    'risk-register': 'Source pp. 88–94',
  },
};

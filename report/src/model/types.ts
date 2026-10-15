/**
 * Validisory report data contract.
 *
 * Every page renders from this structure; nothing venture-specific is
 * hard-coded in components. Values are semantic (evidence 'partial',
 * exposure 'high') and components map them to visual states.
 *
 * Conventions
 * - `null` means "not provided by source": components render a hatched,
 *   labelled empty state instead of inventing a value.
 * - Text may contain inline source refs written as `[n]`; they render as
 *   links to the matching source card.
 * - `⚠` in text marks a source conflict and is kept verbatim.
 */

export type Evidence = 'strong' | 'partial' | 'weak' | 'unvalidated';
export type Exposure = 'low' | 'moderate' | 'high' | 'critical' | 'undetermined';
export type Importance = 'material' | 'significant' | 'contributing';
export type Impact = 'supports' | 'constrains' | 'threatens' | 'neutral';
export type Verdict = 'STOP' | 'NO-GO' | 'REVALIDATE' | 'CONDITIONAL-GO' | 'GO';
export type Level = 'low' | 'medium' | 'high';
/** Data provenance: external source, user-provided, model estimate, assumption, derived calculation. */
export type Provenance = 'EXT' | 'USR' | 'EST' | 'ASM' | 'CAL';
export type Family = 'decision' | 'market' | 'economics' | 'risk' | 'reference';

export interface Metric {
  value: string;
  label: string;
  /** Provenance tag text, e.g. 'EST' or 'USR [10]'. */
  tag?: { kind: Provenance; text?: string };
  /** Source-conflict note shown instead of a provenance tag. */
  conflict?: string;
}

export interface NumberedItem {
  title: string;
  detail: string;
}

export interface ReportMeta {
  ventureName: string;
  description: string;
  plan: string;
  assessedAt: string;
  /** Optional market / geography line on the cover. */
  market: string | null;
  reportId: string;
  tagline: string;
  coverNote: string;
}

export type SectionKey =
  | 'decision'
  | 'case'
  | 'market'
  | 'business-model'
  | 'financial'
  | 'competition'
  | 'technical'
  | 'regulatory'
  | 'risk'
  | 'scenarios'
  | 'roadmap'
  | 'sources';

export type PageKey =
  | 'cover'
  | 'contents'
  | 'decision'
  | 'glance'
  | 'decision-case'
  | 'summary'
  | 'strengths-risks'
  | 'actions'
  | 'business-model'
  | 'market'
  | 'financial'
  | 'competition'
  | 'technical'
  | 'regulatory'
  | 'risk'
  | 'scenarios'
  | 'roadmap'
  | 'sources'
  | 'icp'
  | 'risk-register';

export interface TocEntry {
  key: SectionKey;
  title: string;
  family: Family;
  density: 'EXECUTIVE' | 'ANALYTICAL' | 'REFERENCE';
  summary: string;
}

export interface DecisionData {
  verdict: Verdict;
  rationale: string;
  rationaleBasis: string;
  /** 0–100, or null when the engine returned no score. */
  score: number | null;
  /** Overall evidence quality (template-derived). */
  evidenceQuality: Evidence;
  scoreNote: string;
  drivers: NumberedItem[];
  constraints: NumberedItem[];
  questions: NumberedItem[];
  /** Rich text; **bold** marks thresholds. */
  primaryKillSwitch: string;
}

export interface Dimension {
  label: string;
  score: number; // 0–10
  finding: string;
  evidence: Evidence;
  basis: string;
  /** Page holding the supporting analysis. */
  see: PageKey;
}

export interface Condition {
  title: string;
  assessment: string;
  refs: string;
  evidence: Evidence;
  importance: Importance;
  exposure: Exposure;
}

export interface SummaryBlock {
  key: string;
  accent: Family;
  text: string;
}

export interface MarginStat {
  value: string;
  label: string;
  source: string;
  accent: Family;
}

export interface StrengthItem {
  title: string;
  detail: string;
  importance: Importance;
  evidence: Evidence;
}

export interface RiskItem {
  title: string;
  detail: string;
  exposure: Exposure;
  evidence: Evidence;
}

export interface ActionItem {
  title: string;
  why: string;
  evidence: string;
  /** null → "Threshold not provided by source" empty state. */
  threshold: string | null;
  /** Material conditions the action produces evidence for. */
  conditions: string;
}

export interface ActionGroup {
  horizon: string;
  window: string;
  items: ActionItem[];
}

export interface BusinessModel {
  note: string;
  keyPartners: string[];
  keyActivities: string[];
  keyResources: string[];
  valuePropositions: string[];
  customerRelationships: string[];
  channels: string[];
  customerSegments: string[];
  costStructure: string[];
  revenueStreams: string[];
  signals: { key: string; title: string; detail: string; accent: Family }[];
}

export interface MarketTier {
  key: 'TAM' | 'SAM' | 'SOM';
  value: string;
  provenance: string;
  definition: string;
  method: string;
  crossCheck: string;
  sources: string;
}

export interface RangeBar {
  label: string;
  low: number;
  high: number;
  display: string;
}

export interface MarketData {
  insight: string;
  /** Area-proportional diagram; values share one unit (here €M). */
  diagram: {
    tam: { value: number; label: string };
    sam: { value: number; label: string };
    som: { value: number; label: string };
    note: string;
  };
  tiers: MarketTier[];
  somTitle: string;
  somBars: RangeBar[];
  somNote: string;
}

export type RevenueStream = 'ads' | 'subscriptions' | 'partnerships';

export interface RevenueYear {
  label: string;
  /** Low-estimate stacked segments, bottom to top, in chart units. */
  streams: { stream: RevenueStream; value: number }[];
  high: number;
  stated: string;
  /** Present when streams do not reconcile with the stated total. */
  conflict?: string;
}

export interface Assumption {
  name: string;
  value: string;
  type: Provenance;
  evidence: Evidence;
  note: string;
}

export interface FinancialData {
  /** Shown when the Financials module returned no data. */
  fallbackNote: string | null;
  metrics: Metric[];
  revenue: { title: string; insight: string; axisMax: number; years: RevenueYear[]; note: string };
  costs: {
    title: string;
    axisMax: number;
    tiers: { stage: string; scope: string; low: number; high: number; display: string }[];
  };
  callouts: { label: string; value: string; note: string }[];
  /** Break-even, runway and P&L: null → not computed by engine. */
  pnl: null | { title: string; text: string };
  assumptions: Assumption[];
}

export interface Competitor {
  name: string;
  position: string;
  pricing: string;
  threat: Level;
}

export interface CompetitionData {
  insight: string;
  matrix: {
    title: string;
    xAxis: string;
    yAxis: string;
    quadrants: { tl: string; tr: string; bl: string; br: string };
    /** Engine coordinates on a 0–10 grid. */
    positions: { name: string; x: number; y: number }[];
    recommended: { label: string; x: number; y: number };
    note: string;
  };
  competitors: Competitor[];
  forces: { force: string; level: Level; detail: string }[];
  impact: Impact;
  impactNote: string;
}

export interface TechnicalData {
  insight: string;
  timeline: { title: string; totalWeeks: number; milestones: { week: number; label: string }[] };
  featureTitle: string;
  features: { name: string; days: number; mustHave: boolean }[];
  platform: string;
  dependencies: { group: string; items: string[]; risk: string }[];
  scaleTriggers: { visitors: string; action: string }[];
  unknowns: string[];
  conflict?: string;
}

export interface Regulation {
  name: string;
  applicability: string;
  exposure: Exposure;
  action: string;
  timing: string;
  basis: string;
}

export interface RegulatoryData {
  intro: string;
  costs: { value: string; label: string }[];
  regulations: Regulation[];
  disclaimer: string;
}

export interface Risk {
  id: number;
  title: string;
  probability: Level;
  impact: Level;
  category: string;
  mitigation: string;
  /** Not provided by the sample source; reserved columns. */
  trigger?: string | null;
  owner?: string | null;
  evidence?: Evidence | null;
}

export interface KillSwitch {
  condition: string;
  when: string;
  outcome: string;
  reason: string;
}

export interface RiskData {
  intro: string;
  register: Risk[];
  killSwitches: KillSwitch[];
  killSwitchSource: string;
}

export interface WhatIf {
  question: string;
  basis: string;
  from: string;
  to: string;
  provenance: Provenance | '—';
  /** Re-scored venture state; null → not computed. */
  result: { score: number; verdict: Verdict } | null;
}

export interface ScenarioData {
  intro: string;
  baseCase: { key: string; value: string; note: string }[];
  whatIfs: WhatIf[];
  contingencies: { trigger: string; response: string; pivot: string }[];
  contingencySource: string;
}

export interface RoadmapStage {
  stage: string;
  window: string;
  objective: string;
  actions: string[];
  gate: string;
  evidence: string;
  /** null → "not provided by source". */
  threshold: string | null;
}

export interface RoadmapData {
  intro: string;
  stages: RoadmapStage[];
  yearOne: { label: string; value: string; note: string; conflict?: boolean }[];
  okrs: { objective: string; keyResults: string[] }[];
}

export interface Source {
  id: number;
  title: string;
  publisher: string | null;
  date: string | null;
  url: string | null;
  type: Provenance;
  usedFor: string;
}

export interface SourcesData {
  intro: string;
  sources: Source[];
  methodology: { title: string; text: string }[];
}

/** Generic analysis module (sample: Customer & ICP). */
export interface AnalysisModule {
  number: string;
  title: string;
  /** Header breadcrumb label. */
  shortTitle: string;
  purpose: string;
  keyFinding: string;
  metrics: Metric[];
  profile: { key: string; text: string; evidence: Evidence }[];
  segments: { segment: string; who: string; role: string; spend: string | null }[];
  meaning: string[];
  assumptions: { kind: Provenance; text: string }[];
  impact: Impact;
  impactNote: string;
}

export interface ReportData {
  meta: ReportMeta;
  toc: TocEntry[];
  decision: DecisionData;
  glance: { intro: string; dimensions: Dimension[] };
  decisionCase: { intro: string; conditions: Condition[]; reading: string };
  summary: { blocks: SummaryBlock[]; marginStats: MarginStat[] };
  strengthsRisks: { strengths: StrengthItem[]; risks: RiskItem[]; note: string };
  actions: { intro: string; groups: ActionGroup[]; conflict?: string };
  businessModel: BusinessModel;
  market: MarketData;
  financial: FinancialData;
  competition: CompetitionData;
  technical: TechnicalData;
  regulatory: RegulatoryData;
  risk: RiskData;
  scenarios: ScenarioData;
  roadmap: RoadmapData;
  sources: SourcesData;
  icp: AnalysisModule;
  /** Source-report page range per page, shown in the footer. */
  pageSources: Partial<Record<PageKey, string>>;
}

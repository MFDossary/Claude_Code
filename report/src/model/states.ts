import { color, hatch } from '../theme/tokens';
import type { Evidence, Exposure, Impact, Importance, Level, Provenance, Verdict } from './types';

/* Evidence strength: 3 pips, filled by strength; UNVALIDATED is all dashed. */
const EVIDENCE: Record<Evidence, [label: string, filled: number]> = {
  strong: ['STRONG', 3],
  partial: ['PARTIAL', 2],
  weak: ['WEAK', 1],
  unvalidated: ['UNVALIDATED', 0],
};

export interface Pip {
  filled: boolean;
  dashed: boolean;
}

export function evidenceState(e: Evidence): { label: string; pips: Pip[] } {
  const [label, n] = EVIDENCE[e];
  return {
    label,
    pips: [0, 1, 2].map((i) => ({ filled: i < n, dashed: e === 'unvalidated' })),
  };
}

/* Exposure / severity: 4 segments plus a tinted chip; CRITICAL inverts. */
const EXPOSURE: Record<Exposure, [label: string, filled: number]> = {
  low: ['LOW', 1],
  moderate: ['MODERATE', 2],
  high: ['HIGH', 3],
  critical: ['CRITICAL', 4],
  undetermined: ['NOT YET DETERMINED', 0],
};

export interface Segment {
  bg: string;
  image: string;
}

export function exposureState(x: Exposure): { label: string; bg: string; fg: string; segs: Segment[] } {
  const [label, n] = EXPOSURE[x];
  const crit = x === 'critical';
  const none = x === 'undetermined';
  return {
    label,
    bg: crit ? color.critical : none ? color.white : color.copperSoft,
    fg: crit ? color.white : none ? color.muted : color.copperInk,
    segs: [0, 1, 2, 3].map((i) => ({
      bg: none ? color.white : i < n ? (crit ? color.criticalTint : color.copper) : color.copperTint,
      image: none ? hatch.fine : 'none',
    })),
  };
}

export const levelToExposure: Record<Level, Exposure> = { low: 'low', medium: 'moderate', high: 'high' };
export const levelRank: Record<Level, number> = { low: 1, medium: 2, high: 3 };

/** Probability × impact score (1–9) and the severity it maps to. */
export function riskScore(p: Level, i: Level): number {
  return levelRank[p] * levelRank[i];
}
export function severity(score: number): Exposure {
  return score >= 9 ? 'high' : score >= 4 ? 'moderate' : 'low';
}

export const importanceLabel: Record<Importance, string> = {
  material: '◆◆◆ MATERIAL',
  significant: '◆◆◇ SIGNIFICANT',
  contributing: '◆◇◇ CONTRIBUTING',
};

export const impactState: Record<Impact, { label: string; glyph: string; accent: string }> = {
  supports: { label: 'SUPPORTS', glyph: '▲', accent: color.teal },
  constrains: { label: 'CONSTRAINS', glyph: '◆', accent: color.gold },
  threatens: { label: 'THREATENS', glyph: '▼', accent: color.copper },
  neutral: { label: 'NEUTRAL', glyph: '○', accent: color.ruleStrong },
};

/** Dimension impact rule: ≥7 supports, 5–6 constrains, ≤4 threatens. */
export function impactFromScore(score: number): Impact {
  return score >= 7 ? 'supports' : score >= 5 ? 'constrains' : 'threatens';
}

export const verdictOrder: Verdict[] = ['STOP', 'NO-GO', 'REVALIDATE', 'CONDITIONAL-GO', 'GO'];

export const verdictStyle: Record<Verdict, { bg: string; fg: string }> = {
  STOP: { bg: color.ink, fg: color.white },
  'NO-GO': { bg: color.copperInk, fg: color.white },
  REVALIDATE: { bg: color.lilac, fg: color.brand },
  'CONDITIONAL-GO': { bg: color.gold, fg: color.ink },
  GO: { bg: color.tealInk, fg: color.white },
};

/** Provenance tag styles (design system: EXT / USR / EST / ASM / CAL). */
export const provenanceStyle: Record<Provenance, { bg: string; fg: string; border: string }> = {
  EXT: { bg: color.ink, fg: color.white, border: 'none' },
  USR: { bg: color.white, fg: color.ink, border: `1px solid ${color.ink}` },
  EST: { bg: color.lilac, fg: color.brand, border: 'none' },
  ASM: { bg: color.white, fg: color.brand, border: `1px dashed ${color.brand}` },
  CAL: { bg: color.track, fg: color.ink, border: `1px solid ${color.ruleStrong}` },
};

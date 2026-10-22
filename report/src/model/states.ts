import { color, hatch } from '../theme/tokens';
import type { Evidence, Exposure, Impact, Importance, Level, Provenance, Verdict } from './types';

/* Evidence strength: 3 pips, filled by strength; UNVALIDATED is all dashed. */
const EVIDENCE: Record<Evidence, [label: string, filled: number]> = {
  strong: ['Strong', 3],
  partial: ['Partial', 2],
  weak: ['Weak', 1],
  unvalidated: ['Unvalidated', 0],
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

/* Exposure / severity: 4 copper strokes on white; CRITICAL inverts to a navy chip. */
const EXPOSURE: Record<Exposure, [label: string, filled: number]> = {
  low: ['Low', 1],
  moderate: ['Moderate', 2],
  high: ['High', 3],
  critical: ['Critical', 4],
  undetermined: ['Not yet determined', 0],
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
    bg: crit ? color.navy : 'transparent',
    fg: crit ? color.white : none ? color.muted : color.ink,
    segs: [0, 1, 2, 3].map((i) => ({
      bg: none ? color.white : i < n ? color.copper : crit ? color.navyRule : color.strokeOff,
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
  material: '◆◆◆ Material',
  significant: '◆◆◇ Significant',
  contributing: '◆◇◇ Contributing',
};

export const impactState: Record<Impact, { label: string; glyph: string; accent: string }> = {
  supports: { label: 'Supports', glyph: '▲', accent: color.teal },
  constrains: { label: 'Constrains', glyph: '◆', accent: color.gold },
  threatens: { label: 'Threatens', glyph: '▼', accent: color.copper },
  neutral: { label: 'Neutral', glyph: '○', accent: color.strokeOff },
};

/** Dimension impact rule: ≥7 supports, 5–6 constrains, ≤4 threatens. */
export function impactFromScore(score: number): Impact {
  return score >= 7 ? 'supports' : score >= 5 ? 'constrains' : 'threatens';
}

export const verdictOrder: Verdict[] = ['STOP', 'NO-GO', 'REVALIDATE', 'CONDITIONAL-GO', 'GO'];

/**
 * Verdict marks: the cut-corner shape is the only one that carries a decision.
 * Fill strength follows confidence: solid (GO), tone (conditional or
 * revalidate), outline (NO-GO, STOP). `navy` is the same mark on a navy field.
 */
export type VerdictFill = 'solid' | 'tone' | 'outline';
export const verdictFill: Record<Verdict, VerdictFill> = {
  GO: 'solid',
  'CONDITIONAL-GO': 'tone',
  REVALIDATE: 'tone',
  'NO-GO': 'outline',
  STOP: 'outline',
};
export const verdictNote: Record<Verdict, string> = {
  GO: 'Build the next step',
  'CONDITIONAL-GO': 'Proceed through the gates',
  REVALIDATE: 'Collect the evidence first',
  'NO-GO': 'Park it or pivot',
  STOP: 'A kill-switch has fired',
};
export function verdictStyle(v: Verdict, onNavy = false): { bg: string; fg: string; note: string; border: string } {
  const f = verdictFill[v];
  if (onNavy) {
    return f === 'solid'
      ? { bg: color.white, fg: color.navy, note: color.muted, border: 'none' }
      : f === 'tone'
        ? { bg: color.navyRule, fg: color.white, note: color.onNavyMuted, border: 'none' }
        : { bg: 'transparent', fg: color.white, note: color.onNavyMuted, border: `2px solid ${color.white}` };
  }
  return f === 'solid'
    ? { bg: color.navy, fg: color.white, note: color.onNavyMuted, border: 'none' }
    : f === 'tone'
      ? { bg: color.field, fg: color.navy, note: color.muted, border: 'none' }
      : { bg: color.white, fg: color.navy, note: color.muted, border: `2px solid ${color.navy}` };
}

/** Provenance tags follow the same fill logic: solid, tone, outline, dashed. */
export const provenanceStyle: Record<Provenance, { bg: string; fg: string; border: string }> = {
  EXT: { bg: color.navy, fg: color.white, border: 'none' },
  USR: { bg: color.white, fg: color.navy, border: `1px solid ${color.navy}` },
  EST: { bg: '#E7E7F3', fg: color.navy, border: 'none' },
  ASM: { bg: color.white, fg: color.navy, border: `1px dashed ${color.navy}` },
  CAL: { bg: color.rowRule, fg: color.navy, border: 'none' },
};

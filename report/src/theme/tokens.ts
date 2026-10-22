import type { Family } from '../model/types';

/**
 * Validisory report design tokens: the approved "Signal Strokes" concept
 * (Validisory Admin Panel, approved 22 Oct 2026) on the Validisory design
 * system (Brand Book v2).
 *
 * - Grounds, not boxes: navy field (the signal), white (the detail),
 *   grey-2 (the workbench). Hairlines only for tables and rules.
 * - Navy is the ink. Teal, gold and copper are accents only: stroke tips,
 *   chart series and status strokes, never grounds or running text.
 * - Gold marks the signal tip, the last filled stroke of a meter.
 * - Lilac is not a Validisory colour (Brand Book v2) and is not used.
 */
export const color = {
  // Brand
  navy: '#0B0A81',
  navyRaised: '#121197', // raised surface on a navy field (navy-3)
  navyRule: '#1919AE', // rules and empty strokes on a navy field (navy-5)
  onNavyMuted: '#BBBADC', // secondary text on navy (8.1:1)
  white: '#FFFFFF',

  // Accents (strokes, series, status only)
  teal: '#0F8B8D',
  gold: '#C9A227',
  copper: '#B87333',
  /** Warning text for source conflicts (⚠) only. */
  warn: '#8A4F1C',

  // Ink and neutrals on white
  ink: '#0B0A81', // primary text = navy
  muted: '#4F4FA4', // secondary text (7.0:1 on white)
  hairline: '#CECEE6', // 1px rules, table borders
  rowRule: '#EDEDED', // row separators (grey-3)
  field: '#F6F6F6', // the workbench ground (grey-2)
  strokeOff: '#DADADA', // empty strokes on white (grey-5)
  border: '#6D6CB3', // control and outline borders (≥3:1)
  tint: '#9D9DCE', // light navy: second series, range extensions
} as const;

/** Navy ramp for heatmaps (light → dark); white text from step 4. */
export const heatRamp = ['#E7E7F3', '#CECEE6', '#9D9DCE', '#6D6CB3', '#3C3B9A'] as const;

export const font = {
  display: "'Space Grotesk'",
  body: 'Montserrat, sans-serif',
} as const;

/** Diagonal hatch: the "data not provided" empty-state pattern. */
export const hatch = {
  fine: `repeating-linear-gradient(135deg,${color.hairline} 0 2px,${color.white} 2px 4px)`,
  slot: `repeating-linear-gradient(135deg,${color.rowRule} 0 4px,${color.white} 4px 8px)`,
  wide: `repeating-linear-gradient(135deg,${color.field} 0 6px,${color.white} 6px 12px)`,
} as const;

/**
 * Section families. `label` is the sentence-case chapter name; `accent` is
 * the colour of the family's marker stroke (never text or a ground).
 */
export const family: Record<Family, { label: string; accent: string }> = {
  decision: { label: 'Decision intelligence', accent: color.navy },
  market: { label: 'Market & customer', accent: color.teal },
  economics: { label: 'Economics & execution', accent: color.gold },
  risk: { label: 'Risk & regulatory', accent: color.copper },
  reference: { label: 'Reference', accent: color.muted },
};

import type { Family } from '../model/types';

/**
 * Validisory report design tokens.
 * Brand colours come from the Validisory brand guideline; neutrals and tints
 * are the report system's semantic surfaces.
 */
export const color = {
  // Brand
  brand: '#0B0A81', // deep ink blue: primary, decision intelligence
  lilac: '#DFC6FF', // brand accent
  lilacSoft: '#F1E8FF',
  teal: '#0F8B8D', // market & customer
  tealInk: '#0B6466',
  tealSoft: '#E2F1F1',
  tealTint: '#9FD0D1',
  gold: '#C9A227', // economics & execution
  goldInk: '#7A6214',
  goldSoft: '#F7F0DA',
  goldTint: '#EADFB9',
  goldMid: '#DCC36F',
  copper: '#B87333', // risk & regulatory
  copperInk: '#8A4F1C',
  copperSoft: '#F6EADF',
  copperTint: '#E8D3C0',
  critical: '#7A2E14',
  criticalTint: '#F1DDD3',
  periwinkle: '#5B5AB8',

  // Ink + neutrals
  ink: '#12113A',
  text: '#2B2A4A',
  muted: '#4A4968',
  subtle: '#6E6D88',
  faint: '#B9B8E6',
  rule: '#E3E1EE',
  ruleSoft: '#EFEDF5',
  ruleFaint: '#F3F1F8',
  ruleStrong: '#C9C6DC',
  surface: '#F5F4FA',
  track: '#ECEAF5',
  white: '#FFFFFF',
  coverRule: '#4A49A8',
  coverText: '#E9E2FF',
} as const;

export const font = {
  display: "'Space Grotesk'",
  body: 'Montserrat, sans-serif',
} as const;

/** Diagonal hatch: the "data not provided" empty-state pattern. */
export const hatch = {
  fine: `repeating-linear-gradient(135deg,${color.ruleStrong} 0 2px,${color.white} 2px 4px)`,
  slot: `repeating-linear-gradient(135deg,${color.track} 0 4px,${color.white} 4px 8px)`,
  wide: `repeating-linear-gradient(135deg,${color.surface} 0 6px,${color.white} 6px 12px)`,
} as const;

/** Section families. Each analytical family owns one accent. */
export const family: Record<Family, { label: string; accent: string; ink: string }> = {
  decision: { label: 'DECISION INTELLIGENCE', accent: color.brand, ink: color.brand },
  market: { label: 'MARKET & CUSTOMER', accent: color.teal, ink: color.tealInk },
  economics: { label: 'ECONOMICS & EXECUTION', accent: color.gold, ink: color.goldInk },
  risk: { label: 'RISK & REGULATORY', accent: color.copper, ink: color.copperInk },
  reference: { label: 'REFERENCE', accent: color.subtle, ink: color.muted },
};

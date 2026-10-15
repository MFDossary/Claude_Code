import { Fragment, type CSSProperties, type ReactNode } from 'react';
import { color, font, hatch } from '../theme/tokens';
import {
  evidenceState,
  exposureState,
  impactState,
  provenanceStyle,
} from '../model/states';
import type { Evidence, Exposure, Impact, Provenance } from '../model/types';

/** Space Grotesk text style: the display/label face. */
export function sg(size: number, weight = 400, letterSpacing?: string, extra?: CSSProperties): CSSProperties {
  return { fontFamily: font.display, fontWeight: weight, fontSize: size, letterSpacing, ...extra };
}

/** Uppercase tracked label (section labels, column heads). */
export function Label({
  children,
  size = 9,
  weight = 700,
  tracking = '0.14em',
  tone = color.subtle,
  style,
}: {
  children: ReactNode;
  size?: number;
  weight?: number;
  tracking?: string;
  tone?: string;
  style?: CSSProperties;
}) {
  return <span style={{ ...sg(size, weight, tracking), color: tone, ...style }}>{children}</span>;
}

/**
 * Inline rich text used in data strings:
 *   **bold**         → <b>
 *   [label](#anchor) → in-document link
 *   [n]              → link to source card n (keeps surrounding colour)
 */
export function Rich({ text }: { text: string }) {
  const out: ReactNode[] = [];
  const re = /\*\*(.+?)\*\*|\[([^\]]+)\]\((#[\w-]+)\)|\[(\d+)\]/g;
  let last = 0;
  let m: RegExpExecArray | null;
  let k = 0;
  while ((m = re.exec(text))) {
    if (m.index > last) out.push(text.slice(last, m.index));
    if (m[1] !== undefined) out.push(<b key={k++}>{m[1]}</b>);
    else if (m[2] !== undefined) out.push(<a key={k++} href={m[3]}>{m[2]}</a>);
    else out.push(<a key={k++} className="ref" href={`#src-${m[4]}`}>[{m[4]}]</a>);
    last = m.index + m[0].length;
  }
  if (last < text.length) out.push(text.slice(last));
  return <>{out.map((n, i) => <Fragment key={i}>{n}</Fragment>)}</>;
}

/* ───────── Evidence strength ───────── */

export function EvidencePips({ evidence, size = 7, gap = 2 }: { evidence: Evidence; size?: number; gap?: number }) {
  const { pips } = evidenceState(evidence);
  return (
    <span style={{ display: 'flex', gap }}>
      {pips.map((p, i) => (
        <span
          key={i}
          style={{
            width: size,
            height: size,
            background: p.filled ? color.brand : 'transparent',
            border: `1px ${p.dashed ? 'dashed' : 'solid'} ${color.brand}`,
          }}
        />
      ))}
    </span>
  );
}

/** EvidenceBadge: pips + label. Sizing varies by density; chrome via `style`. */
export function EvidenceBadge({
  evidence,
  pip = 7,
  pipGap = 2,
  gap = 5,
  size = 9.5,
  tracking = '0.06em',
  suffix,
  style,
}: {
  evidence: Evidence;
  pip?: number;
  pipGap?: number;
  gap?: number;
  size?: number;
  tracking?: string;
  suffix?: string;
  style?: CSSProperties;
}) {
  const { label } = evidenceState(evidence);
  return (
    <span style={{ display: 'flex', gap, alignItems: 'center', ...sg(size, 700, tracking), color: color.brand, ...style }}>
      <EvidencePips evidence={evidence} size={pip} gap={pipGap} />
      {label}
      {suffix}
    </span>
  );
}

/* ───────── Exposure / severity ───────── */

export function ExposureChip({
  exposure,
  label,
  seg = [8, 5],
  segGap = 2,
  gap = 5,
  size = 9.5,
  tracking = '0.06em',
  pad = '3px 6px',
  hatched = true,
  style,
}: {
  exposure: Exposure;
  /** Override the state label (e.g. threat level text). */
  label?: string;
  seg?: [number, number];
  segGap?: number;
  gap?: number;
  size?: number;
  tracking?: string;
  pad?: string;
  /** Draw the hatch for NOT YET DETERMINED segments. */
  hatched?: boolean;
  style?: CSSProperties;
}) {
  const x = exposureState(exposure);
  return (
    <span
      style={{
        display: 'flex',
        gap,
        alignItems: 'center',
        background: x.bg,
        padding: pad,
        ...sg(size, 700, tracking),
        color: x.fg,
        ...style,
      }}
    >
      <span style={{ display: 'flex', gap: segGap }}>
        {x.segs.map((s, i) => (
          <span
            key={i}
            style={{ width: seg[0], height: seg[1], background: s.bg, backgroundImage: hatched ? s.image : undefined }}
          />
        ))}
      </span>
      {label ?? x.label}
    </span>
  );
}

/* ───────── Decision impact ───────── */

export function ImpactTag({ impact, style }: { impact: Impact; style?: CSSProperties }) {
  const s = impactState[impact];
  return (
    <span
      style={{
        borderLeft: `4px solid ${s.accent}`,
        background: color.surface,
        padding: '4px 8px',
        ...sg(10, 700, '0.1em'),
        ...style,
      }}
    >
      {s.glyph} {s.label}
    </span>
  );
}

/** Module footer band: "DECISION IMPACT · note · tag". */
export function DecisionImpact({
  label,
  impact,
  note,
  labelSize = 9.5,
  noteSize = 10.5,
  padTop = 10,
}: {
  label: string;
  impact: Impact;
  note: string;
  labelSize?: number;
  noteSize?: number;
  padTop?: number;
}) {
  return (
    <div
      style={{
        marginTop: 'auto',
        display: 'grid',
        gridTemplateColumns: '120px minmax(0,1fr) auto',
        gap: 14,
        alignItems: 'center',
        borderTop: `2px solid ${color.ink}`,
        paddingTop: padTop,
      }}
    >
      <span style={sg(labelSize, 700, '0.12em')}>{label}</span>
      <span style={{ fontSize: noteSize, lineHeight: 1.45, color: color.muted }}>{note}</span>
      <ImpactTag impact={impact} />
    </div>
  );
}

/* ───────── Provenance ───────── */

export function ProvTag({
  kind,
  text,
  size = 8.5,
  pad = '1px 5px',
  tracking = '0.08em',
  boxed = false,
  style,
}: {
  kind: Provenance;
  text?: string;
  size?: number;
  pad?: string;
  tracking?: string;
  /** Reserve a 1px border on every kind so tags in a list align. */
  boxed?: boolean;
  style?: CSSProperties;
}) {
  const p = provenanceStyle[kind];
  const border = p.border === 'none' && boxed ? '1px solid transparent' : p.border;
  return (
    <span
      style={{
        alignSelf: 'flex-start',
        background: p.bg,
        color: p.fg,
        border,
        padding: pad,
        ...sg(size, 700, tracking),
        ...style,
      }}
    >
      {text ?? kind}
    </span>
  );
}

/** Source-conflict marker (⚠): dashed copper outline. */
export function ConflictTag({ children, style }: { children: ReactNode; style?: CSSProperties }) {
  return (
    <span
      style={{
        alignSelf: 'flex-start',
        border: `1px dashed ${color.copperInk}`,
        color: color.copperInk,
        padding: '1px 5px',
        ...sg(8.5, 700, '0.06em'),
        ...style,
      }}
    >
      {children}
    </span>
  );
}

/** Empty-state slot for data the source does not provide. */
export function EmptySlot({ children, style }: { children: ReactNode; style?: CSSProperties }) {
  return (
    <span style={{ backgroundImage: hatch.slot, border: `1px solid ${color.ruleStrong}`, ...style }}>{children}</span>
  );
}

/* ───────── Layout helpers ───────── */

export function PageTitle({ children, size = 30, style }: { children: ReactNode; size?: number; style?: CSSProperties }) {
  // The page h1 doubles as the PDF bookmark. pre-wrap keeps the space at a
  // wrapped line end, which Chromium otherwise drops from the outline title.
  return (
    <h1 style={{ margin: 0, ...sg(size, 700, '-0.015em'), lineHeight: 1.1, whiteSpace: 'pre-wrap', ...style }}>{children}</h1>
  );
}

export function Lede({ children, size = 12, maxWidth = 560, style }: { children: ReactNode; size?: number; maxWidth?: number | 'none'; style?: CSSProperties }) {
  return (
    <p style={{ margin: 0, maxWidth, fontSize: size, lineHeight: 1.55, color: color.muted, ...style }}>{children}</p>
  );
}

/** Tinted insight callout under a page title. */
export function Insight({ children, tone }: { children: ReactNode; tone: string }) {
  return (
    <div style={{ background: tone, padding: '10px 14px', ...sg(13, 500), lineHeight: 1.45 }}>{children}</div>
  );
}

/** Ruled section heading: bold tracked title left, meta right. */
export function RuledHead({ title, meta, metaStyle, pad = 6 }: { title: ReactNode; meta?: ReactNode; metaStyle?: CSSProperties; pad?: number }) {
  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'baseline',
        borderBottom: `2px solid ${color.ink}`,
        paddingBottom: pad,
      }}
    >
      <span style={sg(12, 700, '0.14em')}>{title}</span>
      {meta && <span style={{ fontSize: 9, color: color.subtle, ...metaStyle }}>{meta}</span>}
    </div>
  );
}

/** Chart / block title. */
export function ChartTitle({ children, size = 12, style }: { children: ReactNode; size?: number; style?: CSSProperties }) {
  return <span style={{ ...sg(size, 700), ...style }}>{children}</span>;
}

export const col: CSSProperties = { display: 'flex', flexDirection: 'column' };

export function Stack({ gap, children, style }: { gap: number; children: ReactNode; style?: CSSProperties }) {
  return <div style={{ ...col, gap, ...style }}>{children}</div>;
}

/** Table header band (dark ink row). */
export function TableHead({
  columns,
  cells,
  pad = '7px 12px',
  gap = 10,
  size = 8.5,
}: {
  columns: string;
  cells: ReactNode[];
  pad?: string;
  gap?: number;
  size?: number;
}) {
  return (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: columns,
        gap,
        padding: pad,
        background: color.ink,
        color: color.white,
        ...sg(size, 600, '0.12em'),
      }}
    >
      {cells.map((c, i) => (
        <Fragment key={i}>{c}</Fragment>
      ))}
    </div>
  );
}

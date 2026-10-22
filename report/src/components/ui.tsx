import { Fragment, type CSSProperties, type ReactNode } from 'react';
import { color, font, hatch } from '../theme/tokens';
import {
  evidenceState,
  exposureState,
  impactState,
  provenanceStyle,
  verdictNote,
  verdictStyle,
} from '../model/states';
import type { Evidence, Exposure, Impact, Provenance, Verdict } from '../model/types';

/** Space Grotesk text style: the display/label face. */
export function sg(size: number, weight = 400, letterSpacing?: string, extra?: CSSProperties): CSSProperties {
  return { fontFamily: font.display, fontWeight: weight, fontSize: size, letterSpacing, ...extra };
}

/** Montserrat text style: the reading face (labels, chips, body). */
export function ms(size: number, weight = 400, extra?: CSSProperties): CSSProperties {
  return { fontFamily: font.body, fontWeight: weight, fontSize: size, ...extra };
}

/** Tracked label (column heads and small markers). */
export function Label({
  children,
  size = 9,
  weight = 700,
  tracking = '0.14em',
  tone = color.muted,
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

/* ───────── Signal strokes ───────── */

/** Space a skewed stroke needs on each side so a row of them never clips. */
const lean = (h: number) => Math.ceil(h / 2);

/**
 * The stroke meter: the three 45° strokes of the Validisory mark as an
 * instrument. Filled strokes are navy (white on a navy field), the last
 * filled stroke, the signal tip, is gold, empty strokes are grey. With
 * `high`, strokes between the value and `high` show the range in a tint.
 */
export function Strokes({
  value,
  of = 100,
  n = 20,
  high,
  w = 6,
  h = 16,
  gap = 3,
  onNavy = false,
  tip = true,
  label,
  style,
}: {
  value: number;
  of?: number;
  n?: number;
  /** Upper end of a range, in the same unit as `value`. */
  high?: number;
  w?: number;
  h?: number;
  gap?: number;
  onNavy?: boolean;
  /** Mark the last filled stroke gold. */
  tip?: boolean;
  /** Accessible description; omit for decorative meters. */
  label?: string;
  style?: CSSProperties;
}) {
  const filled = Math.max(value > 0 ? 1 : 0, Math.round((value / of) * n));
  const upto = high === undefined ? filled : Math.max(filled, Math.round((high / of) * n));
  const on = onNavy ? color.white : color.navy;
  const off = onNavy ? color.navyRule : color.strokeOff;
  const range = onNavy ? color.border : color.tint;
  return (
    <span
      role={label ? 'img' : undefined}
      aria-label={label}
      aria-hidden={label ? undefined : true}
      style={{ display: 'flex', gap, padding: `0 ${lean(h)}px`, ...style }}
    >
      {Array.from({ length: n }, (_, i) => (
        <span
          key={i}
          style={{
            flex: 'none',
            width: w,
            height: h,
            transform: 'skewX(-45deg)',
            background: i < filled ? (tip && i === filled - 1 && high === undefined ? color.gold : on) : i < upto ? range : off,
          }}
        />
      ))}
    </span>
  );
}

/** One skewed stroke: bullets, status dots and legend keys. */
export function StrokeMark({ color: c, w = 5, h = 10, dashed = false, style }: { color: string; w?: number; h?: number; dashed?: boolean; style?: CSSProperties }) {
  return (
    <span
      aria-hidden="true"
      style={{
        flex: 'none',
        display: 'inline-block',
        width: w,
        height: h,
        margin: `0 ${lean(h) / 2}px`,
        transform: 'skewX(-45deg)',
        background: dashed ? 'transparent' : c,
        border: dashed ? `1px dashed ${c}` : undefined,
        ...style,
      }}
    />
  );
}

/** The brand motif: two white strokes and a gold tip (navy grounds). */
export function SignalMotif({ w = 14, h = 42, gap = 7, light = color.white }: { w?: number; h?: number; gap?: number; light?: string }) {
  return (
    <span aria-hidden="true" style={{ display: 'flex', gap, padding: `0 ${lean(h)}px` }}>
      {[light, light, color.gold].map((c, i) => (
        <span key={i} style={{ width: w, height: h, background: c, transform: 'skewX(-45deg)' }} />
      ))}
    </span>
  );
}

/** Verdict mark: the cut corner is the only shape that carries a decision. */
export function VerdictMark({
  verdict,
  size = 40,
  onNavy = false,
  note = true,
  style,
}: {
  verdict: Verdict;
  size?: number;
  onNavy?: boolean;
  note?: boolean;
  style?: CSSProperties;
}) {
  const v = verdictStyle(verdict, onNavy);
  const cut = Math.round(size * 0.4);
  return (
    <span
      style={{
        alignSelf: 'flex-start',
        display: 'flex',
        flexDirection: 'column',
        gap: 2,
        background: v.bg,
        color: v.fg,
        border: v.border,
        padding: `${Math.round(size * 0.3)}px ${Math.round(size * 0.5)}px ${Math.round(size * 0.26)}px`,
        clipPath: `polygon(0 0, calc(100% - ${cut}px) 0, 100% ${cut}px, 100% 100%, 0 100%)`,
        ...style,
      }}
    >
      <span style={{ ...sg(size, 700, '-0.01em'), lineHeight: 1 }}>{verdict}</span>
      {note && <span style={{ ...ms(Math.max(9, size * 0.28), 500), color: v.note }}>{verdictNote[verdict]}</span>}
    </span>
  );
}

/* ───────── Evidence strength ───────── */

/** Three skewed strokes: filled by strength; UNVALIDATED is all dashed. */
export function EvidencePips({ evidence, size = 7, gap = 2 }: { evidence: Evidence; size?: number; gap?: number }) {
  const { pips } = evidenceState(evidence);
  const h = Math.round(size * 1.6);
  const w = Math.max(3, Math.round(size * 0.7));
  return (
    <span aria-hidden="true" style={{ display: 'flex', gap: gap + 1, padding: `0 ${lean(h)}px` }}>
      {pips.map((p, i) => (
        <span
          key={i}
          style={{
            width: w,
            height: h,
            transform: 'skewX(-45deg)',
            background: p.filled ? color.navy : p.dashed ? 'transparent' : color.strokeOff,
            border: p.dashed ? `1px dashed ${color.navy}` : undefined,
          }}
        />
      ))}
    </span>
  );
}

/** EvidenceBadge: strokes + label. Sizing varies by density; chrome via `style`. */
export function EvidenceBadge({
  evidence,
  pip = 7,
  pipGap = 2,
  gap = 5,
  size = 9.5,
  suffix,
  style,
}: {
  evidence: Evidence;
  pip?: number;
  pipGap?: number;
  gap?: number;
  size?: number;
  /** Kept for call-site compatibility; badges are set in Montserrat untracked. */
  tracking?: string;
  suffix?: string;
  style?: CSSProperties;
}) {
  const { label } = evidenceState(evidence);
  return (
    <span style={{ display: 'flex', gap, alignItems: 'center', ...ms(size, 600), color: color.navy, ...style }}>
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
  pad,
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
  /** Draw the hatch for NOT YET DETERMINED strokes. */
  hatched?: boolean;
  style?: CSSProperties;
}) {
  const x = exposureState(exposure);
  // Strokes read better taller than the old flat segments.
  const w = Math.max(3, seg[0] - 2);
  const h = Math.max(9, seg[1] * 2);
  return (
    <span
      style={{
        display: 'flex',
        gap,
        alignItems: 'center',
        background: x.bg,
        padding: x.bg === 'transparent' ? '2px 0' : pad ?? '2px 6px',
        ...ms(size, 600),
        color: x.fg,
        ...style,
      }}
    >
      <span style={{ display: 'flex', gap: segGap + 1, padding: `0 ${lean(h)}px` }}>
        {x.segs.map((s, i) => (
          <span
            key={i}
            style={{ width: w, height: h, transform: 'skewX(-45deg)', background: s.bg, backgroundImage: hatched ? s.image : undefined, outline: s.image !== 'none' && hatched ? `1px solid ${color.hairline}` : undefined }}
          />
        ))}
      </span>
      {label ?? x.label}
    </span>
  );
}

/* ───────── Decision impact ───────── */

/** Status pill with an accent stroke (the concept's Verified / Partly chips). */
export function StatusPill({ accent, children, size = 10, style }: { accent: string; children: ReactNode; size?: number; style?: CSSProperties }) {
  return (
    <span
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: 7,
        padding: '3px 11px 3px 8px',
        border: `1px solid ${color.hairline}`,
        borderRadius: 999,
        background: color.white,
        ...ms(size, 600),
        color: color.navy,
        whiteSpace: 'nowrap',
        ...style,
      }}
    >
      <StrokeMark color={accent} w={5} h={11} />
      {children}
    </span>
  );
}

export function ImpactTag({ impact, size = 10, style }: { impact: Impact; size?: number; style?: CSSProperties }) {
  const s = impactState[impact];
  return (
    <StatusPill accent={s.accent} size={size} style={style}>
      {s.label}
    </StatusPill>
  );
}

/** Module footer band: "Decision impact · note · pill" on a grey field. */
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
        background: color.field,
        padding: `${padTop}px 14px`,
      }}
    >
      <span style={{ ...ms(labelSize + 1, 600), color: color.navy }}>{label}</span>
      <span style={{ fontSize: noteSize, lineHeight: 1.45, color: color.muted }}>{note}</span>
      <ImpactTag impact={impact} />
    </div>
  );
}

/** "6 · DECISION IMPACT" → "6 · Decision impact". */
export const sentence = (t: string) => t.charAt(0) + t.slice(1).toLowerCase();

/* ───────── Provenance ───────── */

export function ProvTag({
  kind,
  text,
  size = 8.5,
  pad = '1px 5px',
  tracking = '0.06em',
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

/** Source-conflict marker (⚠): dashed copper-ink outline. */
export function ConflictTag({ children, style }: { children: ReactNode; style?: CSSProperties }) {
  return (
    <span
      style={{
        alignSelf: 'flex-start',
        border: `1px dashed ${color.warn}`,
        color: color.warn,
        padding: '1px 5px',
        ...ms(8.5, 600),
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
    <span style={{ backgroundImage: hatch.slot, border: `1px solid ${color.hairline}`, ...style }}>{children}</span>
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

/** Insight callout: the page's one-line signal on a grey field. */
export function Insight({ children }: { children: ReactNode; tone?: string }) {
  return (
    <div style={{ display: 'flex', gap: 10, alignItems: 'flex-start', background: color.field, padding: '10px 14px', ...ms(12.5, 500), lineHeight: 1.5 }}>
      <StrokeMark color={color.gold} w={5} h={13} style={{ marginTop: 3 }} />
      <span>{children}</span>
    </div>
  );
}

/** Eyebrow above a title: "Chapter · Section", muted sentence case. */
export function Eyebrow({ children, onNavy = false }: { children: ReactNode; onNavy?: boolean }) {
  return <span style={{ ...ms(11, 500), color: onNavy ? color.onNavyMuted : color.muted }}>{children}</span>;
}

/** Ruled section heading: bold tracked title left, meta right. */
export function RuledHead({ title, meta, metaStyle, pad = 6 }: { title: ReactNode; meta?: ReactNode; metaStyle?: CSSProperties; pad?: number }) {
  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'baseline',
        borderBottom: `1px solid ${color.navy}`,
        paddingBottom: pad,
      }}
    >
      <span style={sg(13, 700)}>{typeof title === 'string' ? sentence(title) : title}</span>
      {meta && <span style={{ fontSize: 9, color: color.muted, ...metaStyle }}>{meta}</span>}
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

/** Table header band: grey-2 field, navy text, navy rule beneath. */
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
        background: color.field,
        color: color.navy,
        borderBottom: `1px solid ${color.navy}`,
        ...sg(size, 700, '0.1em'),
      }}
    >
      {cells.map((c, i) => (
        <Fragment key={i}>{c}</Fragment>
      ))}
    </div>
  );
}

import type { ReactNode } from 'react';
import { useReport } from '../report-context';
import { color } from '../theme/tokens';
import { Page } from '../components/Page';
import { DecisionImpact, EvidenceBadge, PageTitle, ProvTag, Rich, TableHead, sg } from '../components/ui';
import { usePageSource, useSection, type PageProps } from './section';

const SEG_COLS = '76px minmax(0,1.2fr) minmax(0,1.2fr) minmax(0,1fr)';

/**
 * AnalysisModule template, applied to Customer & ICP:
 * 1 key finding → 2 key metrics → 3 analysis → 4 what this means →
 * 5 evidence / assumptions → 6 decision impact.
 */
export function IcpModule({ page }: PageProps) {
  const { icp: m } = useReport();
  const sec = useSection('market');
  return (
    <Page page={page} label="Analysis Module ICP" {...sec} section={`MODULE ${m.number} · ${m.shortTitle}`} source={usePageSource('icp')} bodyGap={12} bodyPad="20px 0 14px">
      <div style={{ display: 'grid', gridTemplateColumns: '64px minmax(0,1fr)', gap: 14, alignItems: 'end' }}>
        <span style={{ ...sg(40, 700), lineHeight: 0.9, color: color.teal }}>{m.number}</span>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
          <PageTitle size={26}>{m.title}</PageTitle>
          <span style={{ fontSize: 11, color: color.muted }}>{m.purpose}</span>
        </div>
      </div>
      <div style={{ background: color.lilacSoft, padding: '10px 14px', display: 'grid', gridTemplateColumns: '96px minmax(0,1fr)', gap: 12 }}>
        <span style={{ ...sg(9, 700, '0.14em'), color: color.brand, paddingTop: 2 }}>1 · KEY FINDING</span>
        <span style={{ ...sg(13, 500), lineHeight: 1.4 }}>{m.keyFinding}</span>
      </div>
      <Step label="2 · KEY METRICS" gap={5}>
        <div style={{ display: 'grid', gridTemplateColumns: `repeat(${m.metrics.length},minmax(0,1fr))`, gap: 1, background: color.rule, border: `1px solid ${color.rule}` }}>
          {m.metrics.map((x) => (
            <div key={x.label} style={{ background: color.white, padding: '9px 10px', display: 'flex', flexDirection: 'column', gap: 3 }}>
              <span style={{ ...sg(20, 700), lineHeight: 1 }}>{x.value}</span>
              <span style={{ ...sg(8, 400, '0.1em'), color: color.muted }}>{x.label}</span>
              {x.tag && <ProvTag kind={x.tag.kind} text={x.tag.text} size={7.5} pad="0 4px" tracking="normal" />}
            </div>
          ))}
        </div>
      </Step>
      <Step label="3 · ANALYSIS · ICP PROFILE" gap={5}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2,minmax(0,1fr))', gap: 4 }}>
          {m.profile.map((p) => (
            <div key={p.key} style={{ border: `1px solid ${color.rule}`, padding: '7px 10px', display: 'flex', flexDirection: 'column', gap: 3 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 6 }}>
                <span style={{ ...sg(8.5, 700, '0.12em'), color: color.tealInk }}>{p.key}</span>
                <EvidenceBadge evidence={p.evidence} pip={5} pipGap={1} gap={3} size={7.5} />
              </div>
              <span style={{ fontSize: 9.5, lineHeight: 1.4, color: color.text }}>{p.text}</span>
            </div>
          ))}
        </div>
        <div style={{ border: `1px solid ${color.rule}` }}>
          <TableHead columns={SEG_COLS} gap={8} pad="5px 10px" size={7.5} cells={[<span>SEGMENT</span>, <span>WHO</span>, <span>ROLE IN MODEL</span>, <span>SPEND</span>]} />
          {m.segments.map((s) => (
            <div
              key={s.segment}
              style={{ display: 'grid', gridTemplateColumns: SEG_COLS, gap: 8, padding: '5px 10px', borderBottom: `1px solid ${color.ruleSoft}`, fontSize: 9, lineHeight: 1.35 }}
            >
              <b style={sg(9, 700)}>{s.segment}</b>
              <span>{s.who}</span>
              <span style={{ color: color.muted }}>{s.role}</span>
              <span style={{ color: color.muted }}>{s.spend ?? '— not provided'}</span>
            </div>
          ))}
        </div>
      </Step>
      <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0,1fr) minmax(0,1fr)', gap: 14 }}>
        <Step label="4 · WHAT THIS MEANS" gap={4}>
          {m.meaning.map((t) => (
            <span key={t} style={{ fontSize: 9.5, lineHeight: 1.45 }}>
              • {t}
            </span>
          ))}
        </Step>
        <Step label="5 · EVIDENCE / ASSUMPTIONS" gap={4}>
          {m.assumptions.map((a) => (
            <span key={a.text} style={{ fontSize: 9.5, lineHeight: 1.45 }}>
              <ProvTag kind={a.kind} size={8} pad="0 3px" tracking="normal" style={{ alignSelf: 'auto' }} /> <Rich text={a.text} />
            </span>
          ))}
        </Step>
      </div>
      <DecisionImpact label="6 · DECISION IMPACT" impact={m.impact} note={m.impactNote} labelSize={9} noteSize={10} padTop={9} />
    </Page>
  );
}

function Step({ label, gap, children }: { label: string; gap: number; children: ReactNode }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap }}>
      <span style={{ ...sg(9, 700, '0.14em'), color: color.subtle }}>{label}</span>
      {children}
    </div>
  );
}

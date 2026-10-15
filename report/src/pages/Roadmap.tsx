import { useReport } from '../report-context';
import { color } from '../theme/tokens';
import { Page } from '../components/Page';
import { ChartTitle, Lede, PageTitle, sg } from '../components/ui';
import { usePageSource, useSection, type PageProps } from './section';

/** ActionRoadmap: staged decision system with gates, plus Year-1 targets. */
export function Roadmap({ page }: PageProps) {
  const { roadmap: r } = useReport();
  return (
    <Page page={page} label="Execution Roadmap" {...useSection('roadmap')} section="EXECUTION ROADMAP" source={usePageSource('roadmap')} bodyGap={14}>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
        <PageTitle>Execution roadmap</PageTitle>
        <Lede>{r.intro}</Lede>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: `repeat(${r.stages.length},minmax(0,1fr))`, gap: 6 }}>
        {r.stages.map((s) => (
          <div key={s.stage} style={{ display: 'flex', flexDirection: 'column', gap: 0, border: `1px solid ${color.rule}` }}>
            <div style={{ background: color.goldSoft, padding: '9px 10px', display: 'flex', flexDirection: 'column', gap: 2, borderTop: `3px solid ${color.gold}` }}>
              <span style={sg(13, 700, '0.08em')}>{s.stage}</span>
              <span style={{ fontSize: 9, color: color.goldInk, fontWeight: 600 }}>{s.window}</span>
            </div>
            <div style={{ padding: '9px 10px', display: 'flex', flexDirection: 'column', gap: 6, flex: 1 }}>
              <span style={{ ...sg(10.5, 600), lineHeight: 1.3 }}>{s.objective}</span>
              {s.actions.map((a) => (
                <span key={a} style={{ fontSize: 9, lineHeight: 1.35, color: color.muted, paddingLeft: 7, borderLeft: `1px solid ${color.ruleStrong}` }}>
                  {a}
                </span>
              ))}
            </div>
            <div style={{ borderTop: `1px solid ${color.rule}`, padding: '9px 10px', display: 'flex', flexDirection: 'column', gap: 5, background: color.white }}>
              <span style={{ ...sg(8, 700, '0.12em'), color: color.ink }}>◆ DECISION GATE</span>
              <span style={{ fontSize: 9.5, fontWeight: 600, lineHeight: 1.3 }}>{s.gate}</span>
              <span style={{ fontSize: 8.5, color: color.subtle, lineHeight: 1.3 }}>Evidence: {s.evidence}</span>
              <span
                style={{
                  fontSize: 9,
                  lineHeight: 1.35,
                  padding: '4px 6px',
                  background: color.surface,
                  fontWeight: 600,
                }}
              >
                {s.threshold ?? '— not provided by source'}
              </span>
            </div>
          </div>
        ))}
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: '200px minmax(0,1fr)', gap: 18 }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 1, background: color.rule, border: `1px solid ${color.rule}`, alignSelf: 'start' }}>
          {r.yearOne.map((y) => (
            <div key={y.label} style={{ background: color.white, padding: '10px 12px' }}>
              <span style={{ ...sg(8, 600, '0.12em'), color: color.subtle, display: 'block' }}>{y.label}</span>
              <span style={sg(19, 700)}>{y.value}</span>
              <span style={{ fontSize: 9, color: y.conflict ? color.copperInk : color.muted, display: 'block' }}>{y.note}</span>
            </div>
          ))}
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
          <ChartTitle>Year-one OKRs</ChartTitle>
          {r.okrs.map((o) => (
            <div key={o.objective} style={{ display: 'grid', gridTemplateColumns: 'minmax(0,0.9fr) minmax(0,1.6fr)', gap: 12, borderTop: `1px solid ${color.rule}`, paddingTop: 7 }}>
              <span style={{ ...sg(11, 700), lineHeight: 1.3 }}>{o.objective}</span>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
                {o.keyResults.map((k) => (
                  <span key={k} style={{ fontSize: 9.5, lineHeight: 1.35, color: color.text }}>
                    KR · {k}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </Page>
  );
}

import { useReport } from '../report-context';
import { color } from '../theme/tokens';
import { Page } from '../components/Page';
import { ms, ChartTitle, Lede, PageTitle, sg, StrokeMark, Strokes } from '../components/ui';
import { usePageSource, useSection, type PageProps } from './section';

/** ActionRoadmap: staged decision system with gates, plus Year-1 targets. */
export function Roadmap({ page }: PageProps) {
  const { roadmap: r } = useReport();
  return (
    <Page page={page} label="Execution Roadmap" {...useSection('roadmap')} section="Execution roadmap" source={usePageSource('roadmap')} bodyGap={14}>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
        <PageTitle>Execution roadmap</PageTitle>
        <Lede>{r.intro}</Lede>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: `repeat(${r.stages.length},minmax(0,1fr))`, gap: 6 }}>
        {r.stages.map((s, i) => (
          <div key={s.stage} style={{ display: 'flex', flexDirection: 'column', gap: 0, background: color.field }}>
            {/* Journey rail: four strokes per stage; the gold tip marks the stage the venture is in now (the first). */}
            <div style={{ background: color.navy, color: color.white, padding: '10px 10px 9px', display: 'flex', flexDirection: 'column', gap: 6 }}>
              <Strokes value={i === 0 ? 1 : 0} of={4} n={4} w={5} h={14} gap={4} onNavy />
              <span style={sg(14, 700)}>{s.stage}</span>
              <span style={{ ...ms(9.5, 500), color: color.onNavyMuted }}>{s.window}</span>
            </div>
            <div style={{ padding: '9px 10px', display: 'flex', flexDirection: 'column', gap: 6, flex: 1 }}>
              <span style={{ ...sg(10.5, 600), lineHeight: 1.3 }}>{s.objective}</span>
              {s.actions.map((a) => (
                <span key={a} style={{ fontSize: 9, lineHeight: 1.35, color: color.muted, paddingLeft: 7, borderLeft: `1px solid ${color.border}` }}>
                  {a}
                </span>
              ))}
            </div>
            <div style={{ borderTop: `2px solid ${color.white}`, padding: '9px 10px', display: 'flex', flexDirection: 'column', gap: 5 }}>
              <span style={{ display: 'flex', alignItems: 'center', gap: 6, ...ms(9.5, 600), color: color.ink }}>
                <StrokeMark color={color.gold} w={3} h={9} />
                Decision gate
              </span>
              <span style={{ fontSize: 9.5, fontWeight: 600, lineHeight: 1.3 }}>{s.gate}</span>
              <span style={{ fontSize: 8.5, color: color.muted, lineHeight: 1.3 }}>Evidence: {s.evidence}</span>
              <span
                style={{
                  fontSize: 9,
                  lineHeight: 1.35,
                  padding: '4px 6px',
                  background: color.white,
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
        <div style={{ display: 'flex', flexDirection: 'column', gap: 4, alignSelf: 'start' }}>
          {r.yearOne.map((y) => (
            <div key={y.label} style={{ background: color.field, padding: '10px 12px' }}>
              <span style={{ ...ms(8.5, 600), color: color.muted, display: 'block' }}>{y.label}</span>
              <span style={sg(19, 700)}>{y.value}</span>
              <span style={{ fontSize: 9, color: y.conflict ? color.warn : color.muted, display: 'block' }}>{y.note}</span>
            </div>
          ))}
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
          <ChartTitle>Year-one OKRs</ChartTitle>
          {r.okrs.map((o) => (
            <div key={o.objective} style={{ display: 'grid', gridTemplateColumns: 'minmax(0,0.9fr) minmax(0,1.6fr)', gap: 12, borderTop: `1px solid ${color.hairline}`, paddingTop: 7 }}>
              <span style={{ ...sg(11, 700), lineHeight: 1.3 }}>{o.objective}</span>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
                {o.keyResults.map((k) => (
                  <span key={k} style={{ fontSize: 9.5, lineHeight: 1.35, color: color.ink }}>
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

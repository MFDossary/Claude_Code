import { useReport } from '../report-context';
import { color, family } from '../theme/tokens';
import { Page } from '../components/Page';
import { ms, PageTitle, Rich, sg, StrokeMark } from '../components/ui';
import { usePageSource, useSection, type PageProps } from './section';

/** Executive summary: structured editorial blocks + margin KeyMetrics. */
export function ExecutiveSummary({ page }: PageProps) {
  const { summary } = useReport();
  return (
    <Page page={page} label="Executive Summary" {...useSection('case')} section="Executive summary" source={usePageSource('summary')} bodyGap={18} bodyPad="24px 0 14px">
      <PageTitle>Executive summary</PageTitle>
      <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0,1fr) 196px', gap: 28, flex: 1, minHeight: 0 }}>
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          {summary.blocks.map((b) => (
            <div key={b.key} style={{ display: 'grid', gridTemplateColumns: '118px minmax(0,1fr)', gap: 16, padding: '11px 0', borderTop: `1px solid ${color.hairline}` }}>
              <span style={{ display: 'flex', alignItems: 'flex-start', gap: 8, ...ms(11, 600), paddingTop: 1 }}>
                <StrokeMark color={family[b.accent].accent} w={4} h={11} style={{ marginTop: 2 }} />
                {b.key}
              </span>
              <p style={{ margin: 0, fontSize: 12, lineHeight: 1.6, color: color.ink, textWrap: 'pretty' }}>
                <Rich text={b.text} />
              </p>
            </div>
          ))}
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', background: color.navy, color: color.white, padding: '6px 16px', alignSelf: 'start', clipPath: 'polygon(0 0, calc(100% - 16px) 0, 100% 16px, 100% 100%, 0 100%)' }}>
          {summary.marginStats.map((m) => (
            <div
              key={m.label}
              style={{
                padding: '12px 0',
                borderBottom: `1px solid ${color.navyRule}`,
                display: 'flex',
                flexDirection: 'column',
                gap: 3,
              }}
            >
              <span style={{ display: 'flex', alignItems: 'center', gap: 8, ...sg(26, 700, '-0.02em'), lineHeight: 1, fontVariantNumeric: 'tabular-nums' }}>
                {m.value}
                <StrokeMark color={family[m.accent].accent === color.navy ? color.white : family[m.accent].accent} w={4} h={14} />
              </span>
              <span style={{ ...ms(9.5, 600), lineHeight: 1.35 }}>{m.label}</span>
              <span style={{ fontSize: 9, color: color.onNavyMuted }}>
                <Rich text={m.source} />
              </span>
            </div>
          ))}
        </div>
      </div>
    </Page>
  );
}

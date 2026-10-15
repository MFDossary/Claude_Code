import { useReport } from '../report-context';
import { color, family } from '../theme/tokens';
import { Page } from '../components/Page';
import { PageTitle, Rich, sg } from '../components/ui';
import { usePageSource, useSection, type PageProps } from './section';

/** Executive summary: structured editorial blocks + margin KeyMetrics. */
export function ExecutiveSummary({ page }: PageProps) {
  const { summary } = useReport();
  return (
    <Page page={page} label="Executive Summary" {...useSection('case')} section="EXECUTIVE SUMMARY" source={usePageSource('summary')} bodyGap={18} bodyPad="24px 0 14px">
      <PageTitle>Executive summary</PageTitle>
      <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0,1fr) 196px', gap: 28, flex: 1, minHeight: 0 }}>
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          {summary.blocks.map((b) => (
            <div key={b.key} style={{ display: 'grid', gridTemplateColumns: '118px minmax(0,1fr)', gap: 16, padding: '11px 0', borderTop: `1px solid ${color.rule}` }}>
              <span style={{ ...sg(10, 700, '0.14em'), color: family[b.accent].accent, paddingTop: 2 }}>{b.key}</span>
              <p style={{ margin: 0, fontSize: 12, lineHeight: 1.6, color: color.text, textWrap: 'pretty' }}>
                <Rich text={b.text} />
              </p>
            </div>
          ))}
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 1, background: color.rule, alignSelf: 'start' }}>
          {summary.marginStats.map((m) => (
            <div
              key={m.label}
              style={{
                background: color.white,
                padding: '12px 0 12px 14px',
                borderLeft: `3px solid ${family[m.accent].accent}`,
                display: 'flex',
                flexDirection: 'column',
                gap: 3,
              }}
            >
              <span style={{ ...sg(26, 700, '-0.02em'), lineHeight: 1, fontVariantNumeric: 'tabular-nums' }}>{m.value}</span>
              <span style={{ ...sg(9, 600, '0.12em'), color: color.muted, lineHeight: 1.35 }}>{m.label}</span>
              <span style={{ fontSize: 9, color: color.subtle }}>
                <Rich text={m.source} />
              </span>
            </div>
          ))}
        </div>
      </div>
    </Page>
  );
}

import { useReport } from '../report-context';
import { color } from '../theme/tokens';
import { Page } from '../components/Page';
import { ChartTitle, Insight, PageTitle, Rich, sg } from '../components/ui';
import { usePageSource, useSection, type PageProps } from './section';

const SIZE = 300;

/** MarketSizing: area-proportional TAM/SAM/SOM squares + auditable method. */
export function MarketOpportunity({ page }: PageProps) {
  const { market: m } = useReport();
  const { tam, sam, som } = m.diagram;
  // Square side ∝ √value so that area ∝ value.
  const side = (v: number) => Math.round(SIZE * Math.sqrt(v / tam.value));
  const samSide = side(sam.value);
  const somSide = side(som.value);
  const max = Math.max(...m.somBars.map((b) => b.high));
  const pct = (v: number) => `${(v / max) * 100}%`;

  return (
    <Page page={page} label="Market Opportunity" {...useSection('market')} section="MARKET OPPORTUNITY" source={usePageSource('market')} bodyGap={16}>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
        <PageTitle>Market opportunity</PageTitle>
        <Insight tone={color.tealSoft}>{m.insight}</Insight>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: `${SIZE}px minmax(0,1fr)`, gap: 24, alignItems: 'start' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          <ChartTitle size={11}>TAM → SAM → SOM, area-proportional</ChartTitle>
          <div style={{ width: SIZE, height: SIZE, background: color.tealSoft, position: 'relative' }}>
            <div style={{ position: 'absolute', left: 0, bottom: 0, width: samSide, height: samSide, background: color.teal }} />
            {somSide >= 1 && <div style={{ position: 'absolute', left: 0, bottom: 0, width: somSide, height: somSide, background: color.ink }} />}
            <span style={{ position: 'absolute', right: 12, top: 10, ...sg(11, 700), color: color.tealInk, textAlign: 'right' }}>
              TAM
              <br />
              <span style={{ fontSize: 22, color: color.ink }}>{tam.label}</span>
            </span>
            <span style={{ position: 'absolute', left: 8, bottom: samSide + 7, ...sg(11, 700), color: color.tealInk }}>
              SAM <span style={{ fontSize: 16, color: color.ink }}>{sam.label}</span>
            </span>
            <span style={{ position: 'absolute', left: 12, bottom: 8, ...sg(9, 700), color: color.white, lineHeight: 1.3 }}>
              {som.label}
              <br />({somSide} px square)
            </span>
          </div>
          <span style={{ fontSize: 9.5, color: color.subtle, lineHeight: 1.4 }}>{m.diagram.note}</span>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          {m.tiers.map((t) => (
            <div key={t.key} style={{ display: 'grid', gridTemplateColumns: '52px minmax(0,1fr)', gap: 12, borderTop: `1px solid ${color.rule}`, paddingTop: 10 }}>
              <span style={{ ...sg(14, 700), color: color.tealInk }}>{t.key}</span>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 5 }}>
                <div style={{ display: 'flex', gap: 8, alignItems: 'baseline', flexWrap: 'wrap' }}>
                  <span style={sg(22, 700, '-0.01em')}>{t.value}</span>
                  <span style={{ background: color.lilac, color: color.brand, padding: '2px 6px', ...sg(8.5, 700, '0.1em') }}>{t.provenance}</span>
                </div>
                <span style={{ fontSize: 10.5, lineHeight: 1.45, color: color.text }}>
                  <b>Definition</b> {t.definition}
                </span>
                <span style={{ fontSize: 10.5, lineHeight: 1.45, color: color.muted }}>
                  <b style={{ color: color.ink }}>Method</b> {t.method}
                </span>
                <span style={{ fontSize: 10.5, lineHeight: 1.45, color: color.muted }}>
                  <b style={{ color: color.ink }}>Cross-check</b> {t.crossCheck}
                </span>
                <span style={{ fontSize: 9.5, color: color.subtle }}>
                  Sources <Rich text={t.sources} />
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
        <ChartTitle size={11}>{m.somTitle}</ChartTitle>
        {m.somBars.map((b) => (
          <div key={b.label} style={{ display: 'grid', gridTemplateColumns: '52px minmax(0,1fr) 110px', gap: 10, alignItems: 'center' }}>
            <span style={sg(11, 600)}>{b.label}</span>
            <div style={{ height: 14, background: color.surface, position: 'relative' }}>
              <span style={{ position: 'absolute', left: 0, top: 0, bottom: 0, width: pct(b.low), background: color.teal }} />
              <span style={{ position: 'absolute', left: pct(b.low), top: 0, bottom: 0, width: pct(b.high - b.low), background: color.tealTint }} />
            </div>
            <span style={{ ...sg(12, 700), textAlign: 'right', fontVariantNumeric: 'tabular-nums' }}>{b.display}</span>
          </div>
        ))}
        <span style={{ fontSize: 9.5, color: color.subtle }}>
          <Rich text={m.somNote} />
        </span>
      </div>
    </Page>
  );
}

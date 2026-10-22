import { useReport } from '../report-context';
import { color } from '../theme/tokens';
import { Page } from '../components/Page';
import { ChartTitle, Insight, PageTitle, Rich, sg, ms, ProvTag, Strokes } from '../components/ui';
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

  return (
    <Page page={page} label="Market Opportunity" {...useSection('market')} section="Market opportunity" source={usePageSource('market')} bodyGap={16}>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
        <PageTitle>Market opportunity</PageTitle>
        <Insight tone={color.field}>{m.insight}</Insight>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: `${SIZE}px minmax(0,1fr)`, gap: 24, alignItems: 'start' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          <ChartTitle size={11}>TAM → SAM → SOM, area-proportional</ChartTitle>
          <div style={{ width: SIZE, height: SIZE, background: color.field, position: 'relative' }}>
            <div style={{ position: 'absolute', left: 0, bottom: 0, width: samSide, height: samSide, background: color.navy }} />
            {somSide >= 1 && <div style={{ position: 'absolute', left: 0, bottom: 0, width: somSide, height: somSide, background: color.gold }} />}
            <span style={{ position: 'absolute', right: 12, top: 10, ...sg(11, 700), color: color.ink, textAlign: 'right' }}>
              TAM
              <br />
              <span style={{ fontSize: 22, color: color.ink }}>{tam.label}</span>
            </span>
            <span style={{ position: 'absolute', left: 8, bottom: samSide + 7, ...sg(11, 700), color: color.ink }}>
              SAM <span style={{ fontSize: 16, color: color.ink }}>{sam.label}</span>
            </span>
            <span style={{ position: 'absolute', left: 14, bottom: 8, ...ms(9.5, 600), color: color.white, lineHeight: 1.3 }}>
              {som.label}
              <br />({somSide} px square)
            </span>
          </div>
          <span style={{ fontSize: 9.5, color: color.muted, lineHeight: 1.4 }}>{m.diagram.note}</span>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          {m.tiers.map((t) => (
            <div key={t.key} style={{ display: 'grid', gridTemplateColumns: '52px minmax(0,1fr)', gap: 12, borderTop: `1px solid ${color.hairline}`, paddingTop: 10 }}>
              <span style={{ ...sg(14, 700), color: color.ink }}>{t.key}</span>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 5 }}>
                <div style={{ display: 'flex', gap: 8, alignItems: 'baseline', flexWrap: 'wrap' }}>
                  <span style={sg(22, 700, '-0.01em')}>{t.value}</span>
                  <ProvTag kind="EST" text={t.provenance} size={8.5} pad="2px 6px" style={{ alignSelf: 'auto' }} />
                </div>
                <span style={{ fontSize: 10.5, lineHeight: 1.45, color: color.ink }}>
                  <b>Definition</b> {t.definition}
                </span>
                <span style={{ fontSize: 10.5, lineHeight: 1.45, color: color.muted }}>
                  <b style={{ color: color.ink }}>Method</b> {t.method}
                </span>
                <span style={{ fontSize: 10.5, lineHeight: 1.45, color: color.muted }}>
                  <b style={{ color: color.ink }}>Cross-check</b> {t.crossCheck}
                </span>
                <span style={{ fontSize: 9.5, color: color.muted }}>
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
            <Strokes value={b.low} high={b.high} of={max} n={40} w={5} h={14} gap={4} label={`${b.label}: ${b.display}`} />
            <span style={{ ...sg(12, 700), textAlign: 'right', fontVariantNumeric: 'tabular-nums' }}>{b.display}</span>
          </div>
        ))}
        <span style={{ fontSize: 9.5, color: color.muted }}>
          <Rich text={m.somNote} />
        </span>
      </div>
    </Page>
  );
}

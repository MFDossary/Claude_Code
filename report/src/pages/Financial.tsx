import { useReport } from '../report-context';
import { color, hatch } from '../theme/tokens';
import { Page } from '../components/Page';
import { ms, ChartTitle, ConflictTag, EvidenceBadge, PageTitle, ProvTag, Rich, TableHead, sg, Strokes } from '../components/ui';
import type { RevenueStream } from '../model/types';
import { usePageSource, useSection, type PageProps } from './section';

const STREAM: Record<RevenueStream, { label: string; color: string }> = {
  ads: { label: 'AdSense', color: color.navy },
  subscriptions: { label: 'Subscriptions', color: color.teal },
  partnerships: { label: 'SaaS partnerships', color: color.gold },
};

const CHART_H = 200;
const ASM_COLS = 'minmax(0,1.4fr) 104px 44px 112px minmax(0,1.2fr)';

/** FinancialProjection + unit-economics metrics + assumption table. */
export function Financial({ page }: PageProps) {
  const { financial: f } = useReport();
  const rev = f.revenue;
  const k = CHART_H / rev.axisMax;
  const px = (v: number) => `${Math.max(1, Math.round(v * k))}px`;
  const ticks = [3, 2, 1, 0].map((i) => (rev.axisMax / 3) * i);
  const usedStreams = (Object.keys(STREAM) as RevenueStream[]).filter((s) => rev.years.some((y) => y.streams.some((x) => x.stream === s)));

  return (
    <Page page={page} label="Financial Feasibility" {...useSection('financial')} section="Financial feasibility" source={usePageSource('financial')} bodyGap={14}>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
        <PageTitle>Financial feasibility</PageTitle>
        {f.fallbackNote && (
          <div
            style={{
              display: 'flex',
              gap: 10,
              alignItems: 'center',
              backgroundImage: hatch.wide,
              border: `1px solid ${color.hairline}`,
              padding: '8px 12px',
              fontSize: 10.5,
              color: color.muted,
            }}
          >
            <span style={{ ...ms(9.5, 600), color: color.ink }}>Fallback section</span>
            <span>{f.fallbackNote}</span>
          </div>
        )}
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: `repeat(${f.metrics.length},minmax(0,1fr))`, gap: 4 }}>
        {f.metrics.map((m) => (
          <div key={m.label} style={{ background: color.field, padding: 12, display: 'flex', flexDirection: 'column', gap: 4 }}>
            <span style={{ ...sg(24, 700), lineHeight: 1 }}>{m.value}</span>
            <span style={{ ...ms(9, 600), color: color.muted }}>{m.label}</span>
            {m.conflict ? <ConflictTag>{m.conflict}</ConflictTag> : m.tag && <ProvTag kind={m.tag.kind} text={m.tag.text} />}
          </div>
        ))}
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0,1.15fr) minmax(0,1fr)', gap: 22 }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          <ChartTitle>{rev.title}</ChartTitle>
          <span style={{ fontSize: 10, color: color.muted, lineHeight: 1.4 }}>{rev.insight}</span>
          <div style={{ display: 'grid', gridTemplateColumns: '34px minmax(0,1fr)', gap: 6 }}>
            <div style={{ height: CHART_H, display: 'flex', flexDirection: 'column', justifyContent: 'space-between', ...sg(8.5), color: color.muted, textAlign: 'right' }}>
              {ticks.map((t) => (
                <span key={t}>{Math.round(t)}</span>
              ))}
            </div>
            <div
              style={{
                height: CHART_H,
                display: 'grid',
                gridTemplateColumns: `repeat(${rev.years.length},1fr)`,
                gap: 18,
                borderBottom: `1px solid ${color.ink}`,
                backgroundImage: `linear-gradient(${color.rowRule} 1px,transparent 1px)`,
                backgroundSize: `100% ${Math.floor((CHART_H / 3) * 100) / 100}px`,
                padding: '0 10px',
              }}
            >
              {rev.years.map((y) => {
                let base = 0;
                return (
                  <div key={y.label} style={{ position: 'relative', height: CHART_H }}>
                    <div style={{ position: 'absolute', left: '12%', right: '12%', bottom: 0, height: px(y.high), border: `1px dashed ${color.ink}` }} />
                    {y.streams.map((s) => {
                      const b = base;
                      base += s.value;
                      return (
                        <div
                          key={s.stream}
                          style={{ position: 'absolute', left: '12%', right: '12%', bottom: px(b), height: px(s.value), background: STREAM[s.stream].color }}
                        />
                      );
                    })}
                  </div>
                );
              })}
            </div>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '34px minmax(0,1fr)', gap: 6 }}>
            <span />
            <div style={{ display: 'grid', gridTemplateColumns: `repeat(${rev.years.length},1fr)`, gap: 18, padding: '0 10px' }}>
              {rev.years.map((y) => (
                <div key={y.label} style={{ display: 'flex', flexDirection: 'column', gap: 2, textAlign: 'center' }}>
                  <span style={sg(10.5, 700)}>{y.label}</span>
                  <span style={sg(10)}>{y.stated}</span>
                  <span style={{ fontSize: 8.5, color: color.warn, lineHeight: 1.3 }}>{y.conflict ?? ''}</span>
                </div>
              ))}
            </div>
          </div>
          <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', fontSize: 9, color: color.muted }}>
            {usedStreams.map((s) => (
              <span key={s} style={{ display: 'flex', gap: 4, alignItems: 'center' }}>
                <span style={{ width: 9, height: 9, background: STREAM[s].color }} />
                {STREAM[s].label}
              </span>
            ))}
            <span style={{ display: 'flex', gap: 4, alignItems: 'center' }}>
              <span style={{ width: 9, height: 9, border: `1px dashed ${color.ink}` }} />
              High estimate
            </span>
            <span>
              <Rich text={rev.note} />
            </span>
          </div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            <ChartTitle>{f.costs.title}</ChartTitle>
            {f.costs.tiers.map((c) => (
              <div key={c.stage} style={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 10 }}>
                  <span>
                    <b style={sg(10, 700)}>{c.stage}</b> <span style={{ color: color.muted }}>{c.scope}</span>
                  </span>
                  <span style={sg(10, 700)}>{c.display}</span>
                </div>
                <Strokes value={c.low} high={c.high} of={f.costs.axisMax} n={30} w={4} h={11} gap={3} label={`${c.stage}: ${c.display} per month`} />
              </div>
            ))}
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8 }}>
            {f.callouts.map((c) => (
              <div key={c.label} style={{ background: color.field, padding: 10, display: 'flex', flexDirection: 'column', gap: 3 }}>
                <span style={{ ...ms(9, 600), color: color.ink }}>{c.label}</span>
                <span style={sg(17, 700)}>{c.value}</span>
                <span style={{ fontSize: 9.5, color: color.muted }}>{c.note}</span>
              </div>
            ))}
            {f.pnl ? (
              <div style={{ gridColumn: '1 / -1', background: color.field, padding: 10, display: 'flex', flexDirection: 'column', gap: 3 }}>
                <span style={{ ...ms(9, 600), color: color.muted }}>{f.pnl.title}</span>
                <span style={{ fontSize: 10, color: color.muted }}>{f.pnl.text}</span>
              </div>
            ) : (
              <div
                style={{
                  gridColumn: '1 / -1',
                  backgroundImage: hatch.slot,
                  border: `1px solid ${color.hairline}`,
                  padding: 10,
                  display: 'flex',
                  flexDirection: 'column',
                  gap: 3,
                }}
              >
                <span style={{ ...ms(9, 600), color: color.muted }}>Break-even · cash runway · monthly P&amp;L</span>
                <span style={{ fontSize: 10, color: color.muted }}>Not computed by engine. The component renders here when the Financials module returns data.</span>
              </div>
            )}
          </div>
        </div>
      </div>

      <div>
        <TableHead
          columns={ASM_COLS}
          pad="7px 12px"
          cells={[<span>ASSUMPTION</span>, <span style={{ textAlign: 'right' }}>VALUE</span>, <span>TYPE</span>, <span>EVIDENCE</span>, <span>NOTE</span>]}
        />
        {f.assumptions.map((a) => (
          <div
            key={a.name}
            style={{
              display: 'grid',
              gridTemplateColumns: ASM_COLS,
              gap: 10,
              padding: '7px 12px',
              borderBottom: `1px solid ${color.rowRule}`,
              fontSize: 10.5,
              alignItems: 'center',
            }}
          >
            <span>{a.name}</span>
            <span style={{ textAlign: 'right', ...sg(10.5, 700), fontVariantNumeric: 'tabular-nums' }}>{a.value}</span>
            <span style={sg(9, 700, '0.08em')}>{a.type}</span>
            <EvidenceBadge evidence={a.evidence} pip={6} gap={4} size={9} />
            <span style={{ fontSize: 9.5, color: color.muted }}>
              <Rich text={a.note} />
            </span>
          </div>
        ))}
      </div>
    </Page>
  );
}

import { useReport } from '../report-context';
import { color, hatch } from '../theme/tokens';
import { Page } from '../components/Page';
import { ms, Lede, PageTitle, RuledHead, TableHead, VerdictMark, sg } from '../components/ui';
import { usePageSource, useSection, type PageProps } from './section';

const COLS = 'minmax(0,1.5fr) minmax(0,0.9fr) 20px minmax(0,0.9fr) 40px 150px';

/** ScenarioAnalysis: base case → state, what-ifs with decision delta. */
export function Scenarios({ page }: PageProps) {
  const { scenarios: s, decision } = useReport();
  const box = { fontSize: 9.5, lineHeight: 1.35, padding: '7px 9px' } as const;
  const tag = (c: string) => ({ ...ms(8.5, 600), color: c, display: 'block' as const });
  return (
    <Page page={page} label="Scenario Analysis" {...useSection('scenarios')} section="Scenario analysis" source={usePageSource('scenarios')} bodyGap={14}>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
        <PageTitle>What if?</PageTitle>
        <Lede>{s.intro}</Lede>
      </div>
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: `repeat(${s.baseCase.length},minmax(0,1fr)) 150px`,
          gap: 1,
          background: color.hairline,
          border: `1px solid ${color.hairline}`,
        }}
      >
        {s.baseCase.map((b) => (
          <div key={b.key} style={{ background: color.field, padding: 10, display: 'flex', flexDirection: 'column', gap: 3 }}>
            <span style={{ ...ms(8.5, 600), color: color.muted }}>{b.key}</span>
            <span style={sg(15, 700)}>{b.value}</span>
            <span style={{ fontSize: 8.5, color: color.muted }}>{b.note}</span>
          </div>
        ))}
        <div style={{ background: color.navy, color: color.white, padding: 10, display: 'flex', flexDirection: 'column', gap: 3 }}>
          <span style={{ ...ms(8.5, 600), color: color.onNavyMuted }}>Base case → state</span>
          <span style={sg(20, 700)}>{decision.score ?? '—'}</span>
          <VerdictMark verdict={decision.verdict} size={11} onNavy note={false} />
        </div>
      </div>
      <div>
        <TableHead
          columns={COLS}
          gap={8}
          pad="7px 10px"
          size={8}
          cells={[<span>SCENARIO · STATED BASIS</span>, <span>BASE</span>, <span />, <span>SCENARIO</span>, <span>TYPE</span>, <span>VENTURE STATE · Δ</span>]}
        />
        {s.whatIfs.map((w) => (
          <div
            key={w.question}
            style={{
              display: 'grid',
              gridTemplateColumns: COLS,
              gap: 8,
              padding: '9px 10px',
              borderBottom: `1px solid ${color.rowRule}`,
              fontSize: 10,
              lineHeight: 1.4,
              alignItems: 'center',
            }}
          >
            <span style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
              <b style={sg(11, 700)}>{w.question}</b>
              <span style={{ color: color.muted, fontSize: 9.5 }}>{w.basis}</span>
            </span>
            <span style={sg(10, 600)}>{w.from}</span>
            <span style={{ color: color.muted }}>→</span>
            <span style={{ ...sg(10, 700), color: color.ink }}>{w.to}</span>
            <span style={sg(8.5, 700)}>{w.provenance}</span>
            {w.result ? (
              <span style={{ display: 'flex', gap: 6, alignItems: 'center', ...sg(8.5, 700, '0.04em') }}>
                <VerdictMark verdict={w.result.verdict} size={10} note={false} />
                {w.result.score} ({formatDelta(w.result.score - (decision.score ?? 0))})
              </span>
            ) : (
              <span
                style={{
                  backgroundImage: hatch.slot,
                  border: `1px solid ${color.hairline}`,
                  padding: '5px 7px',
                  ...sg(8.5, 600, '0.04em'),
                  color: color.muted,
                }}
              >
                — Not computed
              </span>
            )}
          </div>
        ))}
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
        <RuledHead title="Contingency triggers · trigger → response → pivot" meta={s.contingencySource} pad={5} />
        {s.contingencies.map((c, i) => (
          <div key={i} style={{ display: 'grid', gridTemplateColumns: 'minmax(0,1fr) 14px minmax(0,1.5fr) 14px minmax(0,0.9fr)', gap: 6, alignItems: 'stretch' }}>
            <div style={{ background: color.field, ...box }}>
              <b style={tag(color.ink)}>Trigger {i + 1}</b>
              {c.trigger}
            </div>
            <span style={{ alignSelf: 'center', color: color.muted, fontSize: 11 }}>→</span>
            <div style={{ background: color.field, color: color.ink, ...box }}>
              <b style={tag(color.ink)}>Response</b>
              {c.response}
            </div>
            <span style={{ alignSelf: 'center', color: color.muted, fontSize: 11 }}>→</span>
            <div style={{ background: color.field, ...box }}>
              <b style={tag(color.navy)}>Pivot option</b>
              {c.pivot}
            </div>
          </div>
        ))}
      </div>
    </Page>
  );
}

const formatDelta = (d: number) => `${d >= 0 ? '+' : '−'}${Math.abs(d).toFixed(1)}`;

import { useReport } from '../report-context';
import { color } from '../theme/tokens';
import { Page } from '../components/Page';
import { Lede, PageTitle, RuledHead, sg } from '../components/ui';
import { riskScore } from '../model/states';
import type { Level } from '../model/types';
import { pageHref, pageNo, usePageSource, useSection, type PageProps } from './section';

/** Cell tint by probability × impact score (1–9). */
const SHADE: Record<number, string> = { 1: '#FCF8F4', 2: '#FBF5EF', 3: color.copperSoft, 4: color.copperSoft, 6: '#EBCBB0', 9: '#D9A47A' };
const IMPACT_ROWS: Level[] = ['high', 'medium', 'low'];
const PROB_COLS: Level[] = ['low', 'medium', 'high'];

/** RiskMatrix (probability × impact), keyed list, DecisionTriggers. */
export function RiskSystem({ page }: PageProps) {
  const { risk } = useReport();
  const keyed = [...risk.register].sort((a, b) => a.id - b.id);
  return (
    <Page page={page} label="Risk Matrix" {...useSection('risk')} section="RISK SYSTEM" source={usePageSource('risk')} bodyGap={14}>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
        <PageTitle>Risk system</PageTitle>
        <Lede>
          {risk.intro} Full register on <a href={pageHref('risk-register')}>p.{pageNo('risk-register')} →</a>
        </Lede>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: '330px minmax(0,1fr)', gap: 22 }}>
        <div style={{ display: 'grid', gridTemplateColumns: '18px minmax(0,1fr)', gap: 4 }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <span style={{ transform: 'rotate(-90deg)', whiteSpace: 'nowrap', ...sg(8.5, 400, '0.12em'), color: color.muted }}>IMPACT →</span>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gridTemplateRows: 'repeat(3,92px)', gap: 3 }}>
              {IMPACT_ROWS.flatMap((im) =>
                PROB_COLS.map((pr) => {
                  const s = riskScore(pr, im);
                  const items = risk.register.filter((r) => r.probability === pr && r.impact === im);
                  return (
                    <div
                      key={`${im}-${pr}`}
                      style={{ background: SHADE[s], padding: 6, display: 'flex', flexWrap: 'wrap', gap: 4, alignContent: 'flex-start' }}
                    >
                      {items.map((r) => (
                        <span
                          key={r.id}
                          style={{
                            width: 22,
                            height: 22,
                            borderRadius: '50%',
                            background: s >= 9 ? color.critical : color.white,
                            color: s >= 9 ? color.white : color.ink,
                            border: `1px solid ${color.ink}`,
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            ...sg(10, 700),
                          }}
                        >
                          {r.id}
                        </span>
                      ))}
                    </div>
                  );
                }),
              )}
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', ...sg(8.5, 400, '0.1em'), color: color.muted, textAlign: 'center' }}>
              <span>LOW</span>
              <span>MEDIUM</span>
              <span>HIGH</span>
            </div>
            <span style={{ ...sg(8.5, 400, '0.12em'), color: color.muted, textAlign: 'center' }}>PROBABILITY →</span>
          </div>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          {keyed.map((r) => (
            <div
              key={r.id}
              style={{
                display: 'grid',
                gridTemplateColumns: '22px minmax(0,1fr) 70px',
                gap: 6,
                fontSize: 9.5,
                lineHeight: 1.3,
                padding: '3px 0',
                borderBottom: `1px solid ${color.ruleFaint}`,
                alignItems: 'baseline',
              }}
            >
              <span style={{ ...sg(9.5, 700), color: color.copperInk }}>{r.id}</span>
              <span>{r.title}</span>
              <span style={{ ...sg(8, 400, '0.08em'), color: color.subtle, textAlign: 'right' }}>{r.category} ◇</span>
            </div>
          ))}
        </div>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
        <RuledHead title="DECISION TRIGGERS · KILL-SWITCHES" meta={risk.killSwitchSource} pad={5} />
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2,minmax(0,1fr))', gap: 5 }}>
          {risk.killSwitches.map((k, i) => (
            <div key={i} style={{ display: 'grid', gridTemplateColumns: 'minmax(0,1fr) 118px', border: `1px solid ${color.rule}` }}>
              <div style={{ padding: '7px 10px', display: 'flex', flexDirection: 'column', gap: 2, fontSize: 9.5, lineHeight: 1.35 }}>
                <span>
                  <b style={kw}>IF</b>
                  {k.condition}
                </span>
                <span style={{ color: color.muted }}>
                  <b style={kw}>WHEN</b>
                  {k.when}
                </span>
              </div>
              <div style={{ background: color.ink, color: color.white, padding: '7px 8px', display: 'flex', flexDirection: 'column', justifyContent: 'center', gap: 2 }}>
                <span style={sg(9.5, 700, '0.04em')}>→ {k.outcome}</span>
                <span style={{ fontSize: 8.5, color: color.ruleStrong, lineHeight: 1.3 }}>{k.reason}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Page>
  );
}

const kw = { ...sg(8.5, 700, '0.08em'), color: color.copperInk, marginRight: 4 };

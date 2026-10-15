import { useReport } from '../report-context';
import { color } from '../theme/tokens';
import { Page } from '../components/Page';
import { EvidencePips, Rich, sg } from '../components/ui';
import { evidenceState, verdictOrder, verdictStyle } from '../model/states';
import type { NumberedItem } from '../model/types';
import { pageHref, pageNo, usePageSource, useSection, type PageProps } from './section';

/** DecisionSummary: verdict, score, evidence quality, top-3 lists, kill-switch. */
export function ExecutiveDecision({ page }: PageProps) {
  const { decision: d, decisionCase, risk } = useReport();
  const sec = useSection('decision');
  const v = verdictStyle[d.verdict];
  const conds = decisionCase.conditions;
  const strong = conds.filter((c) => c.evidence === 'strong').length;
  const unval = conds.filter((c) => c.evidence === 'unvalidated').length;

  return (
    <Page page={page} label="Executive Decision" {...sec} section="EXECUTIVE DECISION" source={usePageSource('decision')} bodyGap={22} bodyPad="24px 0 14px">
      <h1 style={{ margin: 0, ...sg(10, 600, '0.14em'), color: color.brand }}>THE DECISION</h1>
      <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0,1.25fr) minmax(0,1fr)', gap: 28, alignItems: 'stretch' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          <span style={{ alignSelf: 'flex-start', background: v.bg, color: v.fg, ...sg(40, 700, '-0.01em'), lineHeight: 1, padding: '14px 18px 12px' }}>
            {d.verdict}
          </span>
          <div style={{ display: 'grid', gridTemplateColumns: `repeat(${verdictOrder.length},1fr)`, gap: 3 }}>
            {verdictOrder.map((o) => {
              const on = o === d.verdict;
              return (
                <div key={o} style={{ display: 'flex', flexDirection: 'column', gap: 5 }}>
                  <span style={{ height: 6, background: on ? v.bg : color.track }} />
                  <span style={{ ...sg(8.5, on ? 700 : 500, '0.08em'), color: on ? color.ink : color.subtle }}>{o}</span>
                </div>
              );
            })}
          </div>
          <p style={{ margin: 0, ...sg(16, 500), lineHeight: 1.45, color: color.ink, textWrap: 'pretty' }}>{d.rationale}</p>
          <span style={{ fontSize: 10, color: color.subtle }}>{d.rationaleBasis}</span>
        </div>
        <div style={{ background: color.surface, padding: 20, display: 'flex', flexDirection: 'column', gap: 14 }}>
          <span style={{ ...sg(9.5, 600, '0.14em'), color: color.subtle }}>GO / NO-GO SCORE</span>
          {d.score === null ? (
            <span style={{ ...sg(12, 600), color: color.muted }}>— Score not returned by engine</span>
          ) : (
            <>
              <div style={{ display: 'flex', alignItems: 'baseline', gap: 6 }}>
                <span style={{ ...sg(76, 700, '-0.035em'), lineHeight: 0.85, color: color.brand }}>{d.score}</span>
                <span style={{ ...sg(18), color: color.subtle }}>/ 100</span>
              </div>
              <div style={{ position: 'relative', height: 30 }}>
                <div style={{ position: 'absolute', left: 0, right: 0, top: 10, height: 8, background: color.rule }} />
                <div style={{ position: 'absolute', left: 0, width: `${d.score}%`, top: 10, height: 8, background: color.brand }} />
                <div style={{ position: 'absolute', left: `${d.score}%`, top: 4, width: 2, height: 20, background: color.brand }} />
                <div style={{ position: 'absolute', left: 0, right: 0, top: 22, display: 'flex', justifyContent: 'space-between', ...sg(8.5), color: color.subtle }}>
                  {[0, 25, 50, 75, 100].map((t) => (
                    <span key={t}>{t}</span>
                  ))}
                </div>
              </div>
            </>
          )}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 6, borderTop: `1px solid ${color.rule}`, paddingTop: 12 }}>
            <span style={{ ...sg(9.5, 600, '0.14em'), color: color.subtle }}>EVIDENCE QUALITY ◇</span>
            <div style={{ display: 'flex', gap: 6, alignItems: 'center' }}>
              <EvidencePips evidence={d.evidenceQuality} size={9} />
              <span style={{ ...sg(13, 700, '0.06em'), color: color.brand }}>{evidenceState(d.evidenceQuality).label}</span>
            </div>
            <span style={{ fontSize: 11, lineHeight: 1.45, color: color.muted }}>
              {strong} of {conds.length} material conditions are strongly evidenced and {unval} are unvalidated.{' '}
              <a href={pageHref('decision-case')}>See p.{pageNo('decision-case')} →</a>
            </span>
          </div>
          <span style={{ fontSize: 9.5, color: color.subtle, lineHeight: 1.4 }}>{d.scoreNote}</span>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,minmax(0,1fr))', gap: 16, marginTop: 6 }}>
        <TopList title="▲ DECISION DRIVERS" rule={`3px solid ${color.teal}`} ink={color.tealInk} items={d.drivers} />
        <TopList title="▼ CONSTRAINTS" rule={`3px solid ${color.copper}`} ink={color.copperInk} items={d.constraints} />
        <TopList title="? UNANSWERED QUESTIONS" rule={`3px dashed ${color.brand}`} ink={color.brand} items={d.questions} />
      </div>
      <div
        style={{
          marginTop: 'auto',
          background: color.ink,
          color: color.white,
          display: 'grid',
          gridTemplateColumns: 'auto minmax(0,1fr) auto',
          gap: 18,
          alignItems: 'center',
          padding: '14px 18px',
        }}
      >
        <span style={{ ...sg(10, 700, '0.14em'), color: color.lilac }}>PRIMARY KILL-SWITCH</span>
        <span style={{ fontSize: 12, lineHeight: 1.45 }}>
          <Rich text={d.primaryKillSwitch} />
        </span>
        <a href={pageHref('risk')} style={{ color: color.lilac, fontSize: 11, whiteSpace: 'nowrap' }}>
          All {risk.killSwitches.length} → p.{pageNo('risk')}
        </a>
      </div>
    </Page>
  );
}

function TopList({ title, rule, ink, items }: { title: string; rule: string; ink: string; items: NumberedItem[] }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 10, borderTop: rule, paddingTop: 12 }}>
      <span style={{ ...sg(10, 700, '0.14em'), color: ink }}>{title}</span>
      {items.length === 0 && <span style={{ fontSize: 11, color: color.muted }}>None identified</span>}
      {items.slice(0, 3).map((it, i) => (
        <div key={i} style={{ display: 'grid', gridTemplateColumns: '18px minmax(0,1fr)', gap: 6 }}>
          <span style={{ ...sg(12, 700), color: ink }}>{i + 1}</span>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
            <span style={{ ...sg(13, 700), lineHeight: 1.25 }}>{it.title}</span>
            <span style={{ fontSize: 11, lineHeight: 1.45, color: color.muted }}>{it.detail}</span>
          </div>
        </div>
      ))}
    </div>
  );
}

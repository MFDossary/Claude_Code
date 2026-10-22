import { useReport } from '../report-context';
import { color } from '../theme/tokens';
import { Page } from '../components/Page';
import { EvidencePips, Eyebrow, ms, Rich, sg, StrokeMark, Strokes, VerdictMark } from '../components/ui';
import { evidenceState, verdictOrder } from '../model/states';
import type { NumberedItem } from '../model/types';
import { pageHref, pageNo, usePageSource, useSection, type PageProps } from './section';

/**
 * DecisionSummary, Signal Strokes layout: the page opens on a navy field with
 * the one number that matters (score + stroke meter + verdict mark), then the
 * reasons follow on white.
 */
export function ExecutiveDecision({ page }: PageProps) {
  const { decision: d, decisionCase, risk, glance } = useReport();
  const sec = useSection('decision');
  const conds = decisionCase.conditions;
  const strong = conds.filter((c) => c.evidence === 'strong').length;
  const unval = conds.filter((c) => c.evidence === 'unvalidated').length;
  const current = verdictOrder.indexOf(d.verdict);

  return (
    <Page page={page} label="Executive Decision" {...sec} section="Executive decision" source={usePageSource('decision')} bodyGap={20} bodyPad="0 0 14px">
      {/* Navy signal field, full bleed under the running header. */}
      <section
        style={{
          margin: '0 -44px 0 -48px',
          background: color.navy,
          color: color.white,
          padding: '24px 44px 26px 48px',
          display: 'flex',
          flexDirection: 'column',
          gap: 18,
        }}
      >
        <h1 style={{ margin: 0, ...ms(12, 500), color: color.onNavyMuted }}>Decision · the verdict</h1>
        <div style={{ display: 'grid', gridTemplateColumns: '250px minmax(0,1fr)', gap: 32, alignItems: 'end' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            {d.score === null ? (
              <span style={{ ...ms(13, 500), color: color.onNavyMuted }}>— Score not returned by engine</span>
            ) : (
              <>
                <span style={{ ...sg(112, 700, '-0.05em'), lineHeight: 0.86 }}>{d.score}</span>
                <Strokes value={d.score} n={20} w={6} h={22} gap={4} onNavy label={`Go / No-Go score ${d.score} of 100`} />
                <span style={{ ...ms(11, 500), color: color.onNavyMuted }}>Go / No-Go score out of 100</span>
              </>
            )}
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
            <VerdictMark verdict={d.verdict} size={34} onNavy />
            <p style={{ margin: 0, ...ms(14, 500), lineHeight: 1.5, textWrap: 'pretty' }}>{d.rationale}</p>
            <span style={{ ...ms(10), color: color.onNavyMuted }}>{d.rationaleBasis}</span>
          </div>
        </div>
        <dl style={{ margin: 0, display: 'grid', gridTemplateColumns: 'repeat(2,minmax(0,1fr))', gap: '7px 32px', paddingTop: 16, borderTop: `1px solid ${color.navyRule}` }}>
          {glance.dimensions.map((x) => (
            <div key={x.label} style={{ display: 'grid', gridTemplateColumns: '128px auto 1fr', alignItems: 'center', gap: 10 }}>
              <dt style={{ ...ms(10.5), color: color.onNavyMuted }}>{x.label}</dt>
              <dd style={{ margin: 0 }}>
                <Strokes value={x.score} of={10} n={10} w={5} h={12} gap={3} onNavy />
              </dd>
              <dd style={{ margin: 0, ...sg(12, 700) }}>{x.score}</dd>
            </div>
          ))}
        </dl>
      </section>

      <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0,1.2fr) minmax(0,1fr)', gap: 24, alignItems: 'start' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          <Eyebrow>Where this verdict sits</Eyebrow>
          <div role="img" aria-label={`Verdict ${d.verdict}, step ${current + 1} of ${verdictOrder.length}`} style={{ display: 'grid', gridTemplateColumns: `repeat(${verdictOrder.length},minmax(0,1fr))`, gap: 6 }}>
            {verdictOrder.map((o, i) => (
              <div key={o} style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                <Strokes value={i <= current ? 4 : 0} of={4} n={4} w={4} h={13} gap={3} tip={i === current} />
                <span style={{ ...ms(8.5, i === current ? 700 : 500), color: i === current ? color.navy : color.muted }}>{o}</span>
              </div>
            ))}
          </div>
          <span style={{ ...ms(9.5), color: color.muted, lineHeight: 1.4 }}>{d.scoreNote}</span>
        </div>
        <div style={{ background: color.field, padding: '12px 14px', display: 'flex', flexDirection: 'column', gap: 6 }}>
          <span style={{ ...ms(11, 600) }}>Evidence quality ◇</span>
          <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
            <EvidencePips evidence={d.evidenceQuality} size={9} />
            <span style={{ ...sg(16, 700) }}>{evidenceState(d.evidenceQuality).label}</span>
          </div>
          <span style={{ fontSize: 10.5, lineHeight: 1.45, color: color.muted }}>
            {strong} of {conds.length} material conditions are strongly evidenced and {unval} are unvalidated.{' '}
            <a href={pageHref('decision-case')}>See p.{pageNo('decision-case')} →</a>
          </span>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,minmax(0,1fr))', gap: 20 }}>
        <TopList title="What drives it" accent={color.navy} items={d.drivers} />
        <TopList title="What constrains it" accent={color.copper} items={d.constraints} />
        <TopList title="Still unanswered" accent={color.navy} dashed items={d.questions} />
      </div>

      <div
        style={{
          marginTop: 'auto',
          background: color.navy,
          color: color.white,
          display: 'grid',
          gridTemplateColumns: 'auto minmax(0,1fr) auto',
          gap: 18,
          alignItems: 'center',
          padding: '14px 18px',
          clipPath: 'polygon(0 0, calc(100% - 16px) 0, 100% 16px, 100% 100%, 0 100%)',
        }}
      >
        <span style={{ ...ms(11, 600), color: color.onNavyMuted }}>Primary kill-switch</span>
        <span style={{ fontSize: 12, lineHeight: 1.45 }}>
          <Rich text={d.primaryKillSwitch} />
        </span>
        <a href={pageHref('risk')} style={{ color: color.white, fontSize: 11, whiteSpace: 'nowrap' }}>
          All {risk.killSwitches.length} → p.{pageNo('risk')}
        </a>
      </div>
    </Page>
  );
}

/** Top-3 list with stroke bullets (navy = driver, copper = constraint, dashed = open). */
function TopList({ title, accent, dashed = false, items }: { title: string; accent: string; dashed?: boolean; items: NumberedItem[] }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 10, borderTop: `1px solid ${color.navy}`, paddingTop: 10 }}>
      <span style={{ ...sg(13, 700) }}>{title}</span>
      {items.length === 0 && <span style={{ fontSize: 11, color: color.muted }}>None identified</span>}
      {items.slice(0, 3).map((it, i) => (
        <div key={i} style={{ display: 'grid', gridTemplateColumns: '16px minmax(0,1fr)', gap: 6 }}>
          <StrokeMark color={accent} dashed={dashed} w={5} h={11} style={{ marginTop: 3 }} />
          <div style={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
            <span style={{ ...ms(12, 600), lineHeight: 1.3 }}>{it.title}</span>
            <span style={{ fontSize: 10.5, lineHeight: 1.45, color: color.muted }}>{it.detail}</span>
          </div>
        </div>
      ))}
    </div>
  );
}

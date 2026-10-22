import { useReport } from '../report-context';
import { color } from '../theme/tokens';
import { Page } from '../components/Page';
import { EvidenceBadge, ExposureChip, Lede, PageTitle, Rich, sg, ms } from '../components/ui';
import { importanceLabel } from '../model/states';
import type { Evidence } from '../model/types';
import { usePageSource, useSection, type PageProps } from './section';

const COLS = '44px minmax(0,1fr) 112px 100px 112px';

/** The decision case: MaterialCondition rows (signature component). */
export function DecisionCase({ page }: PageProps) {
  const { decisionCase } = useReport();
  const conds = decisionCase.conditions;
  const count = (e: Evidence) => conds.filter((c) => c.evidence === e).length;
  const profile = [
    { e: 'strong' as const, n: count('strong'), style: { background: color.navy } },
    { e: 'partial' as const, n: count('partial'), style: { background: color.border } },
    { e: 'weak' as const, n: count('weak'), style: { background: color.hairline } },
    { e: 'unvalidated' as const, n: count('unvalidated'), style: { border: `1px dashed ${color.navy}`, background: color.white } },
  ];
  const cell = { padding: '12px 10px', borderLeft: `2px solid ${color.white}` };

  return (
    <Page page={page} label="Decision Case" {...useSection('case')} section="The decision case" source={usePageSource('decision-case')} bodyGap={16} bodyPad="13px 0 14px">
      <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0,1fr) 230px', gap: 24, alignItems: 'end' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          <PageTitle>What must be true for this venture to work?</PageTitle>
          <Lede size={12.5} maxWidth="none">{decisionCase.intro}</Lede>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
          <span style={{ ...ms(11, 600) }}>Evidence profile ◇</span>
          <div role="img" aria-label={profile.map((p) => `${p.n} ${p.e}`).join(', ')} style={{ display: 'flex', gap: 5, padding: '0 9px' }}>
            {profile.flatMap((p) =>
              Array.from({ length: p.n }, (_, k) => (
                <span key={`${p.e}${k}`} style={{ width: 9, height: 18, transform: 'skewX(-45deg)', ...p.style }} />
              )),
            )}
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', ...ms(9.5, 500), color: color.muted }}>
            <span>{profile[0].n} strong</span>
            <span>{profile[1].n} partial</span>
            <span>{profile[2].n} weak</span>
            <span>{profile[3].n} unvalidated</span>
          </div>
        </div>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
        <div style={{ display: 'grid', gridTemplateColumns: COLS, gap: 0, ...ms(9, 600), color: color.muted, padding: '0 0 2px' }}>
          <span />
          <span style={{ paddingLeft: 14 }}>CONDITION · CURRENT ASSESSMENT</span>
          <span style={{ paddingLeft: 10 }}>EVIDENCE</span>
          <span style={{ paddingLeft: 10 }}>IMPORTANCE</span>
          <span style={{ paddingLeft: 10 }}>EXPOSURE IF WRONG</span>
        </div>
        {conds.map((c, i) => (
          <div key={i} style={{ display: 'grid', gridTemplateColumns: COLS, background: color.field, alignItems: 'stretch' }}>
            <div
              style={{
                background: color.navy,
                color: color.white,
                ...sg(18, 700),
                display: 'flex',
                alignItems: 'flex-start',
                justifyContent: 'center',
                paddingTop: 12,
              }}
            >
              {String(i + 1).padStart(2, '0')}
            </div>
            <div style={{ padding: '7px 12px', display: 'flex', flexDirection: 'column', gap: 2 }}>
              <span style={{ ...sg(12.5, 700, '0.01em'), lineHeight: 1.2 }}>{c.title}</span>
              <span style={{ fontSize: 9.5, lineHeight: 1.4, color: color.muted }}>
                <Rich text={c.assessment} /> <span style={{ color: color.muted }}>· <Rich text={c.refs} /></span>
              </span>
            </div>
            <div style={cell}>
              <EvidenceBadge evidence={c.evidence} pip={6} gap={4} size={9} />
            </div>
            <div style={{ ...cell, ...ms(9.5, 600), lineHeight: 1.5 }}>{importanceLabel[c.importance]}</div>
            <div style={{ padding: 10, borderLeft: `2px solid ${color.white}` }}>
              <ExposureChip exposure={c.exposure} style={{ display: 'inline-flex' }} />
            </div>
          </div>
        ))}
      </div>
      <div style={{ marginTop: 'auto', background: color.navy, color: color.white, padding: '12px 16px', display: 'grid', gridTemplateColumns: '80px minmax(0,1fr)', gap: 12, clipPath: 'polygon(0 0, calc(100% - 14px) 0, 100% 14px, 100% 100%, 0 100%)' }}>
        <span style={{ ...ms(11, 600), color: color.onNavyMuted }}>Reading</span>
        <span style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
          <span style={{ ...ms(12, 500), lineHeight: 1.45 }}>{decisionCase.reading}</span>
          <span style={{ fontSize: 8.5, color: color.onNavyMuted }}>
            ◇ States are template-derived. Exposure maps the risk register (probability × impact). "Critical" means the source calls it existential.
          </span>
        </span>
      </div>
    </Page>
  );
}

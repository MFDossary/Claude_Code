import { useReport } from '../report-context';
import { color } from '../theme/tokens';
import { Page } from '../components/Page';
import { EvidenceBadge, ExposureChip, Lede, PageTitle, Rich, sg } from '../components/ui';
import { importanceLabel } from '../model/states';
import type { Evidence } from '../model/types';
import { usePageSource, useSection, type PageProps } from './section';

const COLS = '44px minmax(0,1fr) 106px 102px 116px';

/** The decision case: MaterialCondition rows (signature component). */
export function DecisionCase({ page }: PageProps) {
  const { decisionCase } = useReport();
  const conds = decisionCase.conditions;
  const count = (e: Evidence) => conds.filter((c) => c.evidence === e).length;
  const profile = [
    { e: 'strong' as const, n: count('strong'), style: { background: color.ink } },
    { e: 'partial' as const, n: count('partial'), style: { background: color.brand } },
    { e: 'weak' as const, n: count('weak'), style: { background: color.periwinkle } },
    { e: 'unvalidated' as const, n: count('unvalidated'), style: { border: `1px dashed ${color.brand}`, background: color.white } },
  ];
  const cell = { padding: '12px 10px', borderLeft: `1px solid ${color.ruleSoft}` };

  return (
    <Page page={page} label="Decision Case" {...useSection('case')} section="THE DECISION CASE" source={usePageSource('decision-case')} bodyGap={16} bodyPad="13px 0 14px">
      <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0,1fr) 230px', gap: 24, alignItems: 'end' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          <PageTitle>What must be true for this venture to work?</PageTitle>
          <Lede size={12.5} maxWidth="none">{decisionCase.intro}</Lede>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
          <span style={{ ...sg(9, 600, '0.14em'), color: color.subtle }}>EVIDENCE PROFILE ◇</span>
          <div style={{ display: 'flex', height: 14, gap: 2 }}>
            {profile.filter((p) => p.n > 0).map((p) => (
              <span key={p.e} style={{ flex: p.n, ...p.style }} />
            ))}
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', ...sg(9, 600), color: color.muted }}>
            <span>{profile[0].n} STRONG</span>
            <span>{profile[1].n} PARTIAL</span>
            <span>{profile[2].n} WEAK</span>
            <span>{profile[3].n} UNVAL.</span>
          </div>
        </div>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
        <div style={{ display: 'grid', gridTemplateColumns: COLS, gap: 0, ...sg(8.5, 600, '0.14em'), color: color.subtle, padding: '0 0 2px' }}>
          <span />
          <span style={{ paddingLeft: 14 }}>CONDITION · CURRENT ASSESSMENT</span>
          <span style={{ paddingLeft: 10 }}>EVIDENCE</span>
          <span style={{ paddingLeft: 10 }}>IMPORTANCE</span>
          <span style={{ paddingLeft: 10 }}>EXPOSURE IF WRONG</span>
        </div>
        {conds.map((c, i) => (
          <div key={i} style={{ display: 'grid', gridTemplateColumns: COLS, border: `1px solid ${color.rule}`, alignItems: 'stretch' }}>
            <div
              style={{
                background: color.brand,
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
                <Rich text={c.assessment} /> <span style={{ color: color.subtle }}>· <Rich text={c.refs} /></span>
              </span>
            </div>
            <div style={cell}>
              <EvidenceBadge evidence={c.evidence} />
            </div>
            <div style={{ ...cell, ...sg(9.5, 700, '0.06em'), lineHeight: 1.5 }}>{importanceLabel[c.importance]}</div>
            <div style={{ padding: 10, borderLeft: `1px solid ${color.ruleSoft}` }}>
              <ExposureChip exposure={c.exposure} style={{ display: 'inline-flex' }} />
            </div>
          </div>
        ))}
      </div>
      <div style={{ marginTop: 'auto', background: color.lilacSoft, padding: '10px 14px', display: 'grid', gridTemplateColumns: '90px minmax(0,1fr)', gap: 12 }}>
        <span style={{ ...sg(10, 700, '0.14em'), color: color.brand }}>READING</span>
        <span style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
          <span style={{ ...sg(12, 500), lineHeight: 1.4 }}>{decisionCase.reading}</span>
          <span style={{ fontSize: 8.5, color: color.muted }}>
            ◇ States are template-derived. Exposure maps the risk register (probability × impact). "Critical" means the source calls it existential.
          </span>
        </span>
      </div>
    </Page>
  );
}

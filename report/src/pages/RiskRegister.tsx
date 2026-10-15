import { useReport } from '../report-context';
import { color } from '../theme/tokens';
import { Page } from '../components/Page';
import { ExposureChip, PageTitle, TableHead, sg } from '../components/ui';
import { riskScore, severity } from '../model/states';
import { pageHref, pageNo, usePageSource, useSection, type PageProps } from './section';

const COLS = '24px minmax(0,1.5fr) 74px 50px 50px 92px minmax(0,1.6fr)';

/** Appendix A.1: full risk register, sorted by probability × impact. */
export function RiskRegister({ page }: PageProps) {
  const { risk } = useReport();
  const { sectionIndex } = useSection('sources');
  const rows = risk.register
    .map((r) => ({ ...r, score: riskScore(r.probability, r.impact) }))
    .sort((a, b) => b.score - a.score || a.id - b.id);
  return (
    <Page
      page={page}
      label="Appendix Risk Register"
      number="A"
      family="reference"
      familyLabel="APPENDIX"
      sectionIndex={sectionIndex}
      section="A.1 RISK REGISTER"
      source={usePageSource('risk-register')}
      bodyGap={12}
    >
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'end', gap: 20 }}>
        <PageTitle size={26}>A.1 Risk register</PageTitle>
        <span style={{ fontSize: 9.5, color: color.subtle }}>
          Sorted by probability × impact · keyed to the matrix on <a href={pageHref('risk')}>p.{pageNo('risk')}</a> · reference density
        </span>
      </div>
      <div style={{ border: `1px solid ${color.rule}` }}>
        <TableHead
          columns={COLS}
          gap={8}
          pad="7px 10px"
          size={8}
          cells={[<span>#</span>, <span>RISK</span>, <span>CATEGORY ◇</span>, <span>PROB.</span>, <span>IMPACT</span>, <span>SEVERITY ◇</span>, <span>MITIGATION</span>]}
        />
        {rows.map((r) => (
          <div
            key={r.id}
            style={{
              display: 'grid',
              gridTemplateColumns: COLS,
              gap: 8,
              padding: '7px 10px',
              borderBottom: `1px solid ${color.ruleSoft}`,
              fontSize: 9.5,
              lineHeight: 1.4,
              alignItems: 'start',
            }}
          >
            <span style={{ ...sg(9.5, 700), color: color.copperInk }}>{r.id}</span>
            <span style={{ fontWeight: 600 }}>{r.title}</span>
            <span style={{ color: color.muted }}>{r.category}</span>
            <span style={sg(8.5, 600)}>{r.probability.toUpperCase()}</span>
            <span style={sg(8.5, 600)}>{r.impact.toUpperCase()}</span>
            <ExposureChip
              exposure={severity(r.score)}
              seg={[5, 5]}
              segGap={1}
              gap={3}
              size={8}
              tracking="0.04em"
              pad="2px 5px"
              hatched={false}
              style={{ justifySelf: 'start' }}
            />
            <span style={{ color: color.text }}>{r.mitigation}</span>
          </div>
        ))}
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0,1fr) minmax(0,1fr)', gap: 12, fontSize: 9, lineHeight: 1.45, color: color.muted }}>
        <span>
          <b style={{ color: color.ink }}>Not provided by source:</b> trigger, owner and evidence strength per risk. The register component reserves these
          columns and drops them only when the field is null for every row.
        </span>
        <span>
          <b style={{ color: color.ink }}>Continuation:</b> registers longer than one page repeat the header band and add "(continued)" to the title, with at
          least 3 rows per fragment.
        </span>
      </div>
    </Page>
  );
}

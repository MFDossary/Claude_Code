import { useReport } from '../report-context';
import { color } from '../theme/tokens';
import { Page } from '../components/Page';
import { ms, ExposureChip, Lede, PageTitle, TableHead, sg } from '../components/ui';
import { usePageSource, useSection, type PageProps } from './section';

const COLS = 'minmax(0,1.15fr) minmax(0,1fr) 128px minmax(0,1.35fr) 66px 56px';

/** Regulatory exposure register (reference density). */
export function Regulatory({ page }: PageProps) {
  const { regulatory: r } = useReport();
  return (
    <Page page={page} label="Regulatory Exposure" {...useSection('regulatory')} section="Regulatory exposure" source={usePageSource('regulatory')} bodyGap={14}>
      <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0,1fr) auto', gap: 20, alignItems: 'end' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          <PageTitle>Regulatory exposure</PageTitle>
          <Lede maxWidth={470}>{r.intro}</Lede>
        </div>
        <div style={{ display: 'flex', gap: 4 }}>
          {r.costs.map((c) => (
            <div key={c.label} style={{ background: color.field, padding: '10px 12px', display: 'flex', flexDirection: 'column', gap: 2 }}>
              <span style={sg(18, 700)}>{c.value}</span>
              <span style={{ ...ms(8.5, 600), color: color.muted }}>{c.label}</span>
            </div>
          ))}
        </div>
      </div>
      <div>
        <TableHead
          columns={COLS}
          gap={8}
          pad="7px 10px"
          size={8}
          cells={[<span>REGULATION</span>, <span>APPLICABILITY</span>, <span>EXPOSURE ◇</span>, <span>REQUIRED ACTION</span>, <span>TIMING</span>, <span>BASIS</span>]}
        />
        {r.regulations.map((x) => (
          <div
            key={x.name}
            style={{
              display: 'grid',
              gridTemplateColumns: COLS,
              gap: 8,
              padding: '8px 10px',
              borderBottom: `1px solid ${color.rowRule}`,
              fontSize: 9.5,
              lineHeight: 1.4,
              alignItems: 'start',
            }}
          >
            <span style={sg(10.5, 700)}>{x.name}</span>
            <span style={{ color: color.muted }}>{x.applicability}</span>
            <ExposureChip
              exposure={x.exposure}
              seg={[6, 5]}
              segGap={1}
              gap={4}
              size={8}
              tracking="0.04em"
              pad="2px 5px"
              style={{ justifySelf: 'start', border: `1px solid ${color.hairline}` }}
            />
            <span>{x.action}</span>
            <span style={{ color: color.muted }}>{x.timing}</span>
            <span style={{ color: color.muted, fontSize: 9 }}>{x.basis}</span>
          </div>
        ))}
      </div>
      <div style={{ marginTop: 'auto', display: 'grid', gridTemplateColumns: 'minmax(0,1fr) minmax(0,1fr)', gap: 12 }}>
        <div style={{ background: color.field, padding: '10px 12px', fontSize: 9.5, lineHeight: 1.45, color: color.ink }}>
          <b style={{ ...ms(9, 600), color: color.ink }}>How exposure is set ◇</b>
          <br />
          Where a regulation maps to a risk-register entry, exposure follows its probability × impact. Every other row is "Not yet determined". The source
          lists these obligations but does not rate them.
        </div>
        <div style={{ background: color.field, padding: '10px 12px', fontSize: 9.5, lineHeight: 1.45, color: color.ink }}>
          <b style={ms(10, 600)}>Not legal advice</b>
          <br />
          {r.disclaimer}
        </div>
      </div>
    </Page>
  );
}

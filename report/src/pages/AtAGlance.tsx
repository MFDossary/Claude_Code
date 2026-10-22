import { useReport } from '../report-context';
import { color } from '../theme/tokens';
import { Page } from '../components/Page';
import { EvidenceBadge, ImpactTag, Lede, ms, PageTitle, sg, Strokes } from '../components/ui';
import { impactFromScore } from '../model/states';
import { pageHref, usePageSource, useSection, type PageProps } from './section';

/** Venture at a glance: one DimensionScoreCard per evaluation dimension. */
export function AtAGlance({ page }: PageProps) {
  const { glance } = useReport();
  return (
    <Page page={page} label="Venture at a Glance" {...useSection('case')} section="Venture at a glance" source={usePageSource('glance')} bodyGap={20} bodyPad="24px 0 14px">
      <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
        <PageTitle>Venture at a glance</PageTitle>
        <Lede size={13}>{glance.intro}</Lede>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2,minmax(0,1fr))', gap: 12 }}>
        {glance.dimensions.map((d) => {
          return (
            <div key={d.label} style={{ background: color.field, padding: '12px 14px', display: 'flex', flexDirection: 'column', gap: 7 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', gap: 8 }}>
                <span style={sg(14.5, 700)}>{d.label}</span>
                <span style={{ ...sg(26, 700, '-0.02em'), color: color.navy, lineHeight: 1 }}>
                  {d.score}
                  <span style={{ ...ms(11, 500), color: color.muted }}> / 10</span>
                </span>
              </div>
              <Strokes value={d.score} of={10} n={10} w={6} h={12} gap={5} label={`${d.label} ${d.score} of 10`} />
              <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
                <ImpactTag impact={impactFromScore(d.score)} size={9.5} />
                <EvidenceBadge
                  evidence={d.evidence}
                  tracking="0.1em"
                  suffix=" ◇"
                  style={{ background: color.white, border: `1px solid ${color.hairline}`, borderRadius: 999, padding: '3px 10px' }}
                />
              </div>
              <span style={{ fontSize: 11, lineHeight: 1.45, color: color.ink, minHeight: 32 }}>{d.finding}</span>
              <span style={{ fontSize: 9.5, color: color.muted, lineHeight: 1.35 }}>
                Evidence basis: {d.basis} · <a href={pageHref(d.see)}>See analysis →</a>
              </span>
            </div>
          );
        })}
      </div>
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'minmax(0,1fr) minmax(0,1fr)',
          gap: 16,
          marginTop: 'auto',
          fontSize: 10,
          lineHeight: 1.5,
          color: color.muted,
          background: color.white,
          borderTop: `1px solid ${color.hairline}`,
          padding: '12px 0 0',
        }}
      >
        <span>
          <b style={{ color: color.ink }}>Why no radar:</b> there is only one profile. Bars compare better and print legibly. A radar is used only
          when comparing two or more profiles, such as a re-validation.
        </span>
        <span>
          <b style={{ color: color.ink }}>◇ Template-derived:</b> the source scores each dimension but does not rate evidence or decision impact.
          These marks are derived from the quoted basis. Impact rule: ≥7 supports, 5–6 constrains, ≤4 threatens.
        </span>
      </div>
    </Page>
  );
}

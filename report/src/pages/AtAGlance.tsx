import { useReport } from '../report-context';
import { color } from '../theme/tokens';
import { Page } from '../components/Page';
import { EvidenceBadge, Lede, PageTitle, sg } from '../components/ui';
import { impactFromScore, impactState } from '../model/states';
import { pageHref, usePageSource, useSection, type PageProps } from './section';

/** Venture at a glance: one DimensionScoreCard per evaluation dimension. */
export function AtAGlance({ page }: PageProps) {
  const { glance } = useReport();
  return (
    <Page page={page} label="Venture at a Glance" {...useSection('case')} section="VENTURE AT A GLANCE" source={usePageSource('glance')} bodyGap={20} bodyPad="24px 0 14px">
      <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
        <PageTitle>Venture at a glance</PageTitle>
        <Lede size={13}>{glance.intro}</Lede>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2,minmax(0,1fr))', gap: 12 }}>
        {glance.dimensions.map((d) => {
          const imp = impactState[impactFromScore(d.score)];
          return (
            <div key={d.label} style={{ border: `1px solid ${color.rule}`, padding: '14px 16px', display: 'flex', flexDirection: 'column', gap: 9 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', gap: 8 }}>
                <span style={sg(14.5, 700)}>{d.label}</span>
                <span style={{ ...sg(24, 700), color: color.brand, lineHeight: 1 }}>
                  {d.score}
                  <span style={{ fontSize: 12, color: color.subtle }}>/10</span>
                </span>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(10,1fr)', gap: 2 }}>
                {Array.from({ length: 10 }, (_, i) => (
                  <span key={i} style={{ height: 6, background: i < d.score ? color.brand : color.track }} />
                ))}
              </div>
              <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
                <span style={{ borderLeft: `4px solid ${imp.accent}`, background: color.surface, padding: '3px 7px', ...sg(9.5, 700, '0.1em') }}>
                  {imp.glyph} {imp.label}
                </span>
                <EvidenceBadge
                  evidence={d.evidence}
                  tracking="0.1em"
                  suffix=" ◇"
                  style={{ border: `1px solid ${color.ruleStrong}`, padding: '3px 7px' }}
                />
              </div>
              <span style={{ fontSize: 11.5, lineHeight: 1.5, color: color.text, minHeight: 34 }}>{d.finding}</span>
              <span style={{ fontSize: 9.5, color: color.subtle, lineHeight: 1.35 }}>
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
          background: color.surface,
          padding: '12px 14px',
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

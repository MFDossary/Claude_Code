import { useReport } from '../report-context';
import { color, font } from '../theme/tokens';
import { ms, sg, SignalMotif } from '../components/ui';
import { pageId, type PageProps } from './section';

/** ReportCover: restrained, brand-blue, no charts. */
export function Cover({ page }: PageProps) {
  const { meta } = useReport();
  const facts: { k: string; v: string; small?: boolean }[] = [
    { k: 'Plan', v: meta.plan },
    { k: 'Assessed', v: meta.assessedAt },
    ...(meta.market ? [{ k: 'Market', v: meta.market }] : []),
    { k: 'Report ID', v: meta.reportId, small: true },
  ];
  return (
    <section className="page" id={pageId(page)} data-screen-label={`${String(page).padStart(2, '0')} Cover`}>
      <div
        style={{
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          padding: '56px 56px 48px',
          background: color.navy,
          color: color.white,
          fontFamily: font.body,
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
          <img src="assets/validisory-logo-white.svg" alt="Validisory" style={{ height: 34, width: 'auto', display: 'block' }} />
          <div style={{ ...ms(11, 600), border: `1px solid ${color.border}`, borderRadius: 999, color: color.white, padding: '5px 14px' }}>
            Confidential
          </div>
        </div>
        <div style={{ marginTop: 'auto', display: 'flex', flexDirection: 'column', gap: 24 }}>
          <SignalMotif />
          <span style={{ ...ms(15, 500), color: color.onNavyMuted }}>Venture validation report</span>
          <h1 style={{ margin: 0, ...sg(68, 700, '-0.03em'), lineHeight: 1 }}>{meta.ventureName}</h1>
          <p style={{ margin: 0, maxWidth: 520, fontSize: 16, lineHeight: 1.6, color: color.white, textWrap: 'pretty' }}>
            {meta.description}
          </p>
        </div>
        <div
          style={{
            marginTop: 72,
            display: 'grid',
            gridTemplateColumns: `repeat(${facts.length},minmax(0,1fr))`,
            gap: 20,
            borderTop: `1px solid ${color.navyRule}`,
            paddingTop: 18,
          }}
        >
          {facts.map((f) => (
            <div key={f.k} style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
              <span style={{ ...ms(11, 500), color: color.onNavyMuted }}>{f.k}</span>
              <span
                style={
                  f.small
                    ? { ...sg(11, 600), lineHeight: 1.35, wordBreak: 'break-all' }
                    : sg(14, 600)
                }
              >
                {f.v}
              </span>
            </div>
          ))}
        </div>
        <div style={{ marginTop: 28, fontSize: 10.5, color: color.onNavyMuted, lineHeight: 1.5 }}>
          {meta.tagline} · {meta.coverNote}
        </div>
      </div>
    </section>
  );
}

import { useReport } from '../report-context';
import { color, font } from '../theme/tokens';
import { sg } from '../components/ui';
import { pageId, type PageProps } from './section';

/** ReportCover: restrained, brand-blue, no charts. */
export function Cover({ page }: PageProps) {
  const { meta } = useReport();
  const facts: { k: string; v: string; small?: boolean }[] = [
    { k: 'PLAN', v: meta.plan },
    { k: 'ASSESSED', v: meta.assessedAt },
    ...(meta.market ? [{ k: 'MARKET', v: meta.market }] : []),
    { k: 'REPORT ID', v: meta.reportId, small: true },
  ];
  return (
    <section className="page" id={pageId(page)} data-screen-label={`${String(page).padStart(2, '0')} Cover`}>
      <div
        style={{
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          padding: '56px 56px 48px',
          background: color.brand,
          color: color.white,
          fontFamily: font.body,
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
          <img src="assets/validisory-logo-white.svg" alt="Validisory" style={{ height: 34, width: 'auto', display: 'block' }} />
          <div style={{ ...sg(10, 600, '0.16em'), border: `1px solid ${color.lilac}`, color: color.lilac, padding: '6px 10px' }}>
            CONFIDENTIAL
          </div>
        </div>
        <div style={{ marginTop: 'auto', display: 'flex', flexDirection: 'column', gap: 22 }}>
          <span style={{ ...sg(12, 600, '0.18em'), color: color.lilac }}>VENTURE VALIDATION REPORT</span>
          <h1 style={{ margin: 0, ...sg(64, 700, '-0.025em'), lineHeight: 1 }}>{meta.ventureName}</h1>
          <p style={{ margin: 0, maxWidth: 520, fontSize: 16, lineHeight: 1.55, color: color.coverText, textWrap: 'pretty' }}>
            {meta.description}
          </p>
        </div>
        <div
          style={{
            marginTop: 72,
            display: 'grid',
            gridTemplateColumns: `repeat(${facts.length},minmax(0,1fr))`,
            gap: 20,
            borderTop: `1px solid ${color.coverRule}`,
            paddingTop: 18,
          }}
        >
          {facts.map((f) => (
            <div key={f.k} style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
              <span style={{ ...sg(9.5, 400, '0.14em'), color: color.faint }}>{f.k}</span>
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
        <div style={{ marginTop: 28, fontSize: 10, color: color.faint, lineHeight: 1.5 }}>
          {meta.tagline} · {meta.coverNote}
        </div>
      </div>
    </section>
  );
}

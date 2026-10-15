import { useReport } from '../report-context';
import { color, family } from '../theme/tokens';
import { Page } from '../components/Page';
import { PageTitle, sg } from '../components/ui';
import { PAGE_ORDER, SECTION_PAGE, pageHref, pageNo, type PageProps } from './section';

/** Linked table of contents with reading levels and a mark legend. */
export function Contents({ page }: PageProps) {
  const { toc } = useReport();
  const levels = [
    { k: 'LEVEL 1 · 60 SECONDS', t: 'Decision', d: `Page ${pageNo('decision')}. Verdict, score, drivers, constraints.`, bg: color.brand, fg: color.white, kc: color.lilac, dc: color.coverText },
    { k: 'LEVEL 2 · 10 MINUTES', t: 'Why', d: `Pages ${pageNo('glance')}–${pageNo('actions')}. Conditions, evidence, strengths, risks, actions.`, bg: color.lilacSoft, fg: color.ink, kc: color.brand, dc: color.muted },
    { k: 'LEVEL 3 · REFERENCE', t: 'Depth', d: `Pages ${pageNo('business-model')}–${PAGE_ORDER.length}. Analysis modules, sources, appendix.`, bg: color.white, fg: color.ink, kc: color.muted, dc: color.muted },
  ];
  return (
    <Page page={page} label="Contents" section="CONTENTS" bodyGap={26} bodyPad="28px 0 16px">
          <PageTitle size={34} style={{ lineHeight: 1.05 }}>Contents</PageTitle>
          <nav style={{ display: 'flex', flexDirection: 'column' }}>
            {toc.map((s, i) => {
              const f = family[s.family];
              return (
                <a
                  key={s.key}
                  href={pageHref(SECTION_PAGE[s.key])}
                  style={{
                    display: 'grid',
                    gridTemplateColumns: '44px 4px minmax(0,1fr) minmax(0,1.1fr) 40px',
                    gap: 14,
                    alignItems: 'center',
                    padding: '11px 0',
                    borderBottom: `1px solid ${color.ruleSoft}`,
                    color: color.ink,
                    textDecoration: 'none',
                  }}
                >
                  <span style={{ ...sg(20, 700), color: f.ink }}>{String(i + 1).padStart(2, '0')}</span>
                  <span style={{ height: 28, background: f.accent }} />
                  <span style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                    <span style={sg(15, 700)}>{s.title}</span>
                    <span style={{ ...sg(8.5, 400, '0.14em'), color: color.subtle }}>
                      {f.label} · {s.density}
                    </span>
                  </span>
                  <span style={{ fontSize: 11, color: color.muted, lineHeight: 1.4 }}>{s.summary}</span>
                  <span style={{ ...sg(13, 700), textAlign: 'right' }}>{String(pageNo(SECTION_PAGE[s.key])).padStart(2, '0')}</span>
                </a>
              );
            })}
          </nav>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(3,minmax(0,1fr))',
              gap: 1,
              background: color.rule,
              border: `1px solid ${color.rule}`,
            }}
          >
            {levels.map((l) => (
              <div key={l.k} style={{ background: l.bg, color: l.fg, padding: 14, display: 'flex', flexDirection: 'column', gap: 4 }}>
                <span style={{ ...sg(10, 700, '0.14em'), color: l.kc }}>{l.k}</span>
                <span style={sg(14, 700)}>{l.t}</span>
                <span style={{ fontSize: 11, lineHeight: 1.45, color: l.dc }}>{l.d}</span>
              </div>
            ))}
          </div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 16, alignItems: 'center', fontSize: 10, color: color.muted }}>
            <span style={{ ...sg(9, 600, '0.14em'), color: color.subtle }}>READING THE MARKS</span>
            <span style={{ display: 'flex', gap: 5, alignItems: 'center' }}>
              <span style={{ display: 'flex', gap: 2 }}>
                <span style={{ width: 7, height: 7, background: color.brand }} />
                <span style={{ width: 7, height: 7, background: color.brand }} />
                <span style={{ width: 7, height: 7, border: `1px solid ${color.brand}` }} />
              </span>
              Evidence strength
            </span>
            <span>◆◆◇ Importance</span>
            <span style={{ display: 'flex', gap: 5, alignItems: 'center' }}>
              <span style={{ display: 'flex', gap: 2 }}>
                <span style={{ width: 9, height: 5, background: color.copper }} />
                <span style={{ width: 9, height: 5, background: color.copper }} />
                <span style={{ width: 9, height: 5, background: color.copperTint }} />
                <span style={{ width: 9, height: 5, background: color.copperTint }} />
              </span>
              Exposure
            </span>
            <span style={{ border: `1px dashed ${color.brand}`, padding: '1px 5px', ...sg(9, 700), color: color.brand }}>ASM</span>
            <span>Assumption</span>
            <span style={{ border: `1px solid ${color.ruleStrong}`, padding: '1px 5px', ...sg(9, 700) }}>◇</span>
            <span>Template-derived state</span>
            <span style={{ ...sg(10, 700), color: color.brand }}>[n]</span>
            <span>Source, p.{pageNo('sources')}</span>
          </div>
    </Page>
  );
}

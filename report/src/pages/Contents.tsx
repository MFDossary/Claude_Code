import { useReport } from '../report-context';
import { color, family } from '../theme/tokens';
import { Page } from '../components/Page';
import { EvidencePips, ExposureChip, ms, PageTitle, ProvTag, sg, StrokeMark, Strokes } from '../components/ui';
import { PAGE_ORDER, SECTION_PAGE, pageHref, pageNo, type PageProps } from './section';

/** Linked table of contents with reading levels and a mark legend. */
export function Contents({ page }: PageProps) {
  const { toc } = useReport();
  const levels = [
    { k: 'Level 1 · 60 seconds', t: 'Decision', d: `Page ${pageNo('decision')}. Verdict, score, drivers, constraints.`, bg: color.navy, fg: color.white, kc: color.onNavyMuted, dc: color.white, border: 'none' },
    { k: 'Level 2 · 10 minutes', t: 'Why', d: `Pages ${pageNo('glance')}–${pageNo('actions')}. Conditions, evidence, strengths, risks, actions.`, bg: color.field, fg: color.ink, kc: color.muted, dc: color.muted, border: 'none' },
    { k: 'Level 3 · reference', t: 'Depth', d: `Pages ${pageNo('business-model')}–${PAGE_ORDER.length}. Analysis modules, sources, appendix.`, bg: color.white, fg: color.ink, kc: color.muted, dc: color.muted, border: `1px solid ${color.hairline}` },
  ];
  return (
    <Page page={page} label="Contents" section="Contents" bodyGap={24} bodyPad="28px 0 16px">
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
                gridTemplateColumns: '40px 92px minmax(0,1fr) minmax(0,1.1fr) 32px',
                gap: 14,
                alignItems: 'center',
                padding: '10px 0',
                borderBottom: `1px solid ${color.rowRule}`,
                color: color.ink,
                textDecoration: 'none',
              }}
            >
              <span style={{ ...sg(20, 700), color: color.navy }}>{String(i + 1).padStart(2, '0')}</span>
              <Strokes value={i + 1} of={toc.length} n={toc.length} w={3} h={14} gap={2} />
              <span style={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
                <span style={sg(15, 700)}>{s.title}</span>
                <span style={{ display: 'flex', alignItems: 'center', gap: 6, ...ms(9.5, 500), color: color.muted }}>
                  <StrokeMark color={f.accent} w={3} h={9} />
                  {f.label}
                  {f.label.toUpperCase() !== s.density && ` · ${s.density.charAt(0) + s.density.slice(1).toLowerCase()}`}
                </span>
              </span>
              <span style={{ fontSize: 11, color: color.muted, lineHeight: 1.4 }}>{s.summary}</span>
              <span style={{ ...sg(13, 700), textAlign: 'right' }}>{String(pageNo(SECTION_PAGE[s.key])).padStart(2, '0')}</span>
            </a>
          );
        })}
      </nav>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,minmax(0,1fr))', gap: 8 }}>
        {levels.map((l) => (
          <div key={l.k} style={{ background: l.bg, color: l.fg, border: l.border, padding: 14, display: 'flex', flexDirection: 'column', gap: 4 }}>
            <span style={{ ...ms(10.5, 500), color: l.kc }}>{l.k}</span>
            <span style={sg(16, 700)}>{l.t}</span>
            <span style={{ fontSize: 11, lineHeight: 1.45, color: l.dc }}>{l.d}</span>
          </div>
        ))}
      </div>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px 18px', alignItems: 'center', fontSize: 10, color: color.muted }}>
        <span style={{ ...ms(10.5, 600), color: color.navy }}>Reading the marks</span>
        <span style={{ display: 'flex', gap: 6, alignItems: 'center' }}>
          <Strokes value={60} n={8} w={3} h={11} gap={2} />
          Score, gold tip
        </span>
        <span style={{ display: 'flex', gap: 6, alignItems: 'center' }}>
          <EvidencePips evidence="partial" size={6} />
          Evidence strength
        </span>
        <span>◆◆◇ Importance</span>
        <span style={{ display: 'flex', gap: 6, alignItems: 'center' }}>
          <ExposureChip exposure="moderate" label="" seg={[5, 5]} />
          Exposure
        </span>
        <span style={{ display: 'flex', gap: 6, alignItems: 'center' }}>
          <ProvTag kind="ASM" size={9} style={{ alignSelf: 'auto' }} />
          Assumption
        </span>
        <span style={{ display: 'flex', gap: 6, alignItems: 'center' }}>
          <span style={{ border: `1px solid ${color.hairline}`, padding: '1px 5px', ...sg(9, 700) }}>◇</span>
          Template-derived state
        </span>
        <span style={{ display: 'flex', gap: 6, alignItems: 'center' }}>
          <span style={{ ...sg(10, 700), color: color.navy }}>[n]</span>
          Source, p.{pageNo('sources')}
        </span>
      </div>
    </Page>
  );
}

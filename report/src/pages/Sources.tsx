import { useReport } from '../report-context';
import { color, hatch } from '../theme/tokens';
import { Page } from '../components/Page';
import { PageTitle, ProvTag, Rich, sg } from '../components/ui';
import { usePageSource, useSection, type PageProps } from './section';

/** SourceCard grid; each card is the anchor target for inline [n] refs. */
export function Sources({ page }: PageProps) {
  const { sources: s } = useReport();
  const stats = [
    { v: s.sources.filter((x) => x.type === 'EXT').length, l: 'EXTERNAL' },
    { v: s.sources.filter((x) => x.type === 'USR').length, l: 'USER' },
    { v: s.sources.filter((x) => x.url).length, l: 'WITH URL' },
  ];
  const missing = (text: string | null, empty: string) =>
    text ? <span style={{ padding: '0 3px' }}>{text}</span> : <span style={{ backgroundImage: hatch.fine, padding: '0 3px' }}>{empty}</span>;

  return (
    <Page page={page} label="Sources and Methodology" {...useSection('sources')} section="SOURCES & METHODOLOGY" source={usePageSource('sources')} bodyGap={12}>
      <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0,1fr) 250px', gap: 20, alignItems: 'end' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          <PageTitle>Sources &amp; methodology</PageTitle>
          <p style={{ margin: 0, fontSize: 11.5, lineHeight: 1.5, color: color.muted }}>
            <Rich text={s.intro} />
          </p>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 1, background: color.rule, border: `1px solid ${color.rule}`, textAlign: 'center' }}>
          {stats.map((x) => (
            <div key={x.l} style={{ background: color.white, padding: 8 }}>
              <span style={{ ...sg(18, 700), display: 'block' }}>{x.v}</span>
              <span style={{ ...sg(7.5, 400, '0.1em'), color: color.muted }}>{x.l}</span>
            </div>
          ))}
        </div>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2,minmax(0,1fr))', gap: 5 }}>
        {s.sources.map((x) => (
          <div
            key={x.id}
            id={`src-${x.id}`}
            style={{ border: `1px solid ${color.rule}`, padding: '7px 10px', display: 'grid', gridTemplateColumns: '28px minmax(0,1fr)', gap: 8 }}
          >
            <span style={{ ...sg(13, 700), color: color.brand }}>[{x.id}]</span>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
              <span style={{ fontSize: 9.5, lineHeight: 1.35, fontWeight: 600 }}>
                {x.url ? <a href={x.url}>{x.title}</a> : x.title}
              </span>
              <div style={{ display: 'flex', gap: 5, flexWrap: 'wrap', alignItems: 'center', fontSize: 8.5, color: color.muted }}>
                <ProvTag kind={x.type} size={8} pad="0 4px" boxed style={{ alignSelf: 'auto' }} />
                {missing(x.publisher, '— publisher not provided')}
                {missing(x.date, '— date not provided')}
                <span style={{ color: color.subtle }}>· Used for {x.usedFor}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: `repeat(${s.methodology.length},minmax(0,1fr))`, gap: 10, marginTop: 'auto' }}>
        {s.methodology.map((m) => (
          <div key={m.title} style={{ background: color.surface, padding: 10, fontSize: 9, lineHeight: 1.45, color: color.text }}>
            <b style={{ ...sg(8, 700, '0.12em'), display: 'block', marginBottom: 3 }}>{m.title}</b>
            {m.text}
          </div>
        ))}
      </div>
    </Page>
  );
}

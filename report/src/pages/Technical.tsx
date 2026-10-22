import { useReport } from '../report-context';
import { color } from '../theme/tokens';
import { Page } from '../components/Page';
import { ms, ChartTitle, Insight, PageTitle, sg } from '../components/ui';
import { usePageSource, useSection, type PageProps } from './section';

/** Timeline segments step from strong to light gold. */
const SEG = [color.navy, color.border, color.tint];
/** Percent of the timeline, floored to 0.1 so labels sit on segment starts. */
const pctOf = (week: number, total: number) => Math.floor((week / total) * 1000) / 10;

/** Technical feasibility: timeline, effort bars, dependency diagram, scaling. */
export function Technical({ page }: PageProps) {
  const { technical: t } = useReport();
  const tl = t.timeline;
  const segs = tl.milestones.map((m, i) => {
    const start = i === 0 ? 0 : pctOf(tl.milestones[i - 1].week, tl.totalWeeks);
    const end = i === tl.milestones.length - 1 ? 100 : pctOf(m.week, tl.totalWeeks);
    return { ...m, start, width: Math.round((end - start) * 10) / 10, color: SEG[Math.min(i, SEG.length - 1)] };
  });
  const maxDays = Math.max(10, ...t.features.map((f) => f.days));
  const must = t.features.filter((f) => f.mustHave).reduce((s, f) => s + f.days, 0);
  const nice = t.features.filter((f) => !f.mustHave).reduce((s, f) => s + f.days, 0);
  const n = t.dependencies.length;

  return (
    <Page page={page} label="Technical Feasibility" {...useSection('technical')} section="Technical feasibility" source={usePageSource('technical')} bodyGap={14}>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
        <PageTitle>Technical feasibility</PageTitle>
        <Insight tone={color.field}>{t.insight}</Insight>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
        <ChartTitle>{tl.title}</ChartTitle>
        <div style={{ position: 'relative', height: 40 }}>
          <div style={{ position: 'absolute', left: 0, right: 0, top: 14, height: 10, background: color.field }} />
          {segs.map((s) => (
            <div key={s.label} style={{ position: 'absolute', left: `${s.start}%`, width: `${s.width}%`, top: 14, height: 10, background: s.color }} />
          ))}
          {segs.map((s, i) => (
            <span key={s.label} style={{ position: 'absolute', left: `${s.start}%`, top: 0, paddingLeft: i ? 4 : 0, ...sg(9.5, 700) }}>
              {s.label}
            </span>
          ))}
          <span style={{ position: 'absolute', left: 0, top: 28, fontSize: 8.5, color: color.muted }}>0</span>
          <span style={{ position: 'absolute', right: 0, top: 28, fontSize: 8.5, color: color.muted }}>{tl.totalWeeks}</span>
        </div>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0,1fr) minmax(0,1fr)', gap: 22 }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 5 }}>
          <ChartTitle>{t.featureTitle}</ChartTitle>
          <span style={{ fontSize: 9.5, color: color.muted }}>
            Must-have {must} d (solid) · nice-to-have {nice} d (dashed) · CAL
          </span>
          {t.features.map((f) => (
            <div key={f.name} style={{ display: 'grid', gridTemplateColumns: 'minmax(0,1.3fr) minmax(0,1fr) 26px', gap: 6, alignItems: 'center', fontSize: 9 }}>
              <span style={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{f.name}</span>
              <div style={{ height: 7, position: 'relative' }}>
                <span
                  style={{
                    position: 'absolute',
                    left: 0,
                    top: 0,
                    bottom: 0,
                    width: `${(f.days / maxDays) * 100}%`,
                    background: f.mustHave ? color.navy : color.white,
                    border: `1px ${f.mustHave ? 'solid' : 'dashed'} ${color.navy}`,
                  }}
                />
              </div>
              <span style={{ ...sg(9, 700), textAlign: 'right' }}>{f.days} d</span>
            </div>
          ))}
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          <ChartTitle>Dependencies &amp; external services</ChartTitle>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
            <div style={{ background: color.ink, color: color.white, padding: '8px 10px', ...sg(11, 700), textAlign: 'center' }}>{t.platform}</div>
            <div style={{ display: 'grid', gridTemplateColumns: `repeat(${n},1fr)`, gap: 4 }}>
              {t.dependencies.map((g) => (
                <span key={g.group} style={{ height: 10, borderLeft: `1px solid ${color.ink}`, marginLeft: '50%' }} />
              ))}
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: `repeat(${n},1fr)`, gap: 4 }}>
              {t.dependencies.map((g) => (
                <div key={g.group} style={{ background: color.field, padding: 6, display: 'flex', flexDirection: 'column', gap: 3 }}>
                  <span style={{ ...ms(8, 600), color: color.ink }}>{g.group}</span>
                  {g.items.map((i) => (
                    <span key={i} style={{ fontSize: 8.5, lineHeight: 1.3 }}>
                      {i}
                    </span>
                  ))}
                  <span style={{ fontSize: 7.5, color: color.muted, marginTop: 'auto' }}>{g.risk}</span>
                </div>
              ))}
            </div>
          </div>
          <ChartTitle style={{ marginTop: 4 }}>Scaling triggers · monthly visitors</ChartTitle>
          {t.scaleTriggers.map((s) => (
            <div key={s.visitors} style={{ display: 'grid', gridTemplateColumns: '42px minmax(0,1fr)', gap: 8, alignItems: 'baseline', borderTop: `1px solid ${color.rowRule}`, paddingTop: 5 }}>
              <span style={{ ...sg(13, 700), color: color.ink }}>{s.visitors}</span>
              <span style={{ fontSize: 9.5, lineHeight: 1.4, color: color.muted }}>{s.action}</span>
            </div>
          ))}
          <div style={{ background: color.field, padding: 10, display: 'flex', flexDirection: 'column', gap: 5, fontSize: 9.5, lineHeight: 1.4, color: color.ink }}>
            <span style={{ ...ms(9, 600), color: color.ink }}>Technical unknowns</span>
            {t.unknowns.map((u) => (
              <span key={u}>• {u}</span>
            ))}
            {t.conflict && <span style={{ color: color.warn }}>{t.conflict}</span>}
          </div>
        </div>
      </div>
    </Page>
  );
}

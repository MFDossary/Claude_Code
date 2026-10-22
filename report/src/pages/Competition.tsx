import type { CSSProperties } from 'react';
import { useReport } from '../report-context';
import { color } from '../theme/tokens';
import { Page } from '../components/Page';
import { ms, ChartTitle, DecisionImpact, ExposureChip, Insight, PageTitle, Rich, TableHead, sg } from '../components/ui';
import { levelToExposure } from '../model/states';
import type { CompetitionData } from '../model/types';
import { usePageSource, useSection, type PageProps } from './section';

const PLOT = 300;
const COMP_COLS = 'minmax(0,1.3fr) minmax(0,0.9fr) minmax(0,1fr) 92px';
/** 0–10 grid → % inside the plot, with a 4% inset. */
const at = (v: number) => `${4 + v * 9}%`;

/**
 * Label placement for the positioning matrix. Points at x ≥ 7 put their
 * label on the left so it stays inside the plot. Two points on the same
 * row and side within one grid step are staggered vertically (±9px).
 */
function placeLabels(points: CompetitionData['matrix']['positions']) {
  const left = (x: number) => x >= 7;
  return points.map((p) => {
    const L = left(p.x);
    const twin = points.find((q) => q !== p && q.y === p.y && left(q.x) === L && Math.abs(q.x - p.x) <= 1);
    const dy = twin ? (p.x < twin.x ? 9 : -9) : 0;
    return {
      ...p,
      dir: L ? ('row-reverse' as const) : ('row' as const),
      transform: L ? 'translate(calc(-100% + 4px),4px)' : 'translate(-4px,4px)',
      dy: `${dy}px`,
    };
  });
}

/** CompetitorMatrix + comparison table + five forces + decision impact. */
export function Competition({ page }: PageProps) {
  const { competition: c } = useReport();
  const mx = c.matrix;
  return (
    <Page page={page} label="Competitive Intelligence" {...useSection('competition')} section="Competitive intelligence" source={usePageSource('competition')} bodyGap={14}>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
        <PageTitle>Competitive intelligence</PageTitle>
        <Insight tone={color.field}>{c.insight}</Insight>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: '318px minmax(0,1fr)', gap: 22 }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
          <ChartTitle>{mx.title}</ChartTitle>
          <div style={{ display: 'grid', gridTemplateColumns: `16px ${PLOT}px`, gap: 2 }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <span style={{ transform: 'rotate(-90deg)', whiteSpace: 'nowrap', ...ms(9, 600), color: color.muted }}>{mx.yAxis}</span>
            </div>
            <div
              style={{
                width: PLOT,
                height: PLOT,
                position: 'relative',
                overflow: 'hidden',
                background: color.white,
                borderLeft: `1px solid ${color.ink}`,
                borderBottom: `1px solid ${color.ink}`,
              }}
            >
              <div style={{ position: 'absolute', left: 0, top: 0, width: '50%', height: '50%', background: color.field }} />
              <div style={{ position: 'absolute', left: '50%', top: 0, bottom: 0, width: 1, background: color.hairline }} />
              <div style={{ position: 'absolute', top: '50%', left: 0, right: 0, height: 1, background: color.hairline }} />
              <span style={{ position: 'absolute', left: 6, top: 5, ...ms(8.5, 600), color: color.ink }}>{mx.quadrants.tl}</span>
              <span style={{ position: 'absolute', right: 6, top: 5, ...ms(8.5, 600), color: color.muted }}>{mx.quadrants.tr}</span>
              <span style={{ position: 'absolute', left: 6, bottom: 5, ...ms(8.5, 600), color: color.muted }}>{mx.quadrants.bl}</span>
              <span style={{ position: 'absolute', right: 6, bottom: 5, ...ms(8.5, 600), color: color.muted }}>{mx.quadrants.br}</span>
              {placeLabels(mx.positions).map((p) => (
                <div
                  key={p.name}
                  style={{
                    position: 'absolute',
                    left: at(p.x),
                    bottom: at(p.y),
                    transform: p.transform,
                    display: 'flex',
                    flexDirection: p.dir,
                    gap: 4,
                    alignItems: 'center',
                  }}
                >
                  <span style={{ width: 5, height: 11, transform: 'skewX(-45deg)', background: color.navy, flex: 'none' }} />
                  <span
                    style={{
                      fontSize: 8.5,
                      fontWeight: 600,
                      whiteSpace: 'nowrap',
                      background: '#FFFFFFCC',
                      padding: '0 2px',
                      transform: `translateY(${p.dy})`,
                    }}
                  >
                    {p.name}
                  </span>
                </div>
              ))}
              <div
                style={{
                  position: 'absolute',
                  left: at(mx.recommended.x),
                  bottom: at(mx.recommended.y),
                  transform: 'translate(-8px,8px)',
                  display: 'flex',
                  gap: 4,
                  alignItems: 'center',
                }}
              >
                <span style={{ width: 8, height: 18, transform: 'skewX(-45deg)', background: color.gold, flex: 'none', margin: '0 4px' }} />
                <span style={{ fontSize: 9, fontWeight: 700, color: color.navy, whiteSpace: 'nowrap', background: '#FFFFFFCC', padding: '0 2px' }}>
                  {mx.recommended.label} ({mx.recommended.x}, {mx.recommended.y})
                </span>
              </div>
            </div>
            <span />
            <span style={{ ...ms(9, 600), color: color.muted, textAlign: 'right' }}>{mx.xAxis}</span>
          </div>
          <span style={{ fontSize: 9, color: color.muted, lineHeight: 1.4 }}>
            <Rich text={mx.note} />
          </span>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
          <ChartTitle>Direct competitors · {c.competitors.length}</ChartTitle>
          <div>
            <TableHead
              columns={COMP_COLS}
              gap={8}
              pad="6px 10px"
              size={8}
              cells={[<span>COMPETITOR</span>, <span>POSITION</span>, <span style={{ textAlign: 'right' }}>PRICING</span>, <span>THREAT</span>]}
            />
            {c.competitors.map((x) => (
              <div
                key={x.name}
                style={{
                  display: 'grid',
                  gridTemplateColumns: COMP_COLS,
                  gap: 8,
                  padding: '6px 10px',
                  borderBottom: `1px solid ${color.rowRule}`,
                  fontSize: 10,
                  alignItems: 'center',
                }}
              >
                <span style={{ fontWeight: 600 }}>{x.name}</span>
                <span style={{ color: color.muted }}>{x.position}</span>
                <span style={{ textAlign: 'right', fontVariantNumeric: 'tabular-nums' }}>{x.pricing}</span>
                <ThreatChip level={x.threat} style={{ justifySelf: 'start' }} />
              </div>
            ))}
          </div>
        </div>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
        <ChartTitle>Porter's five forces</ChartTitle>
        <div style={{ display: 'grid', gridTemplateColumns: `repeat(${c.forces.length},minmax(0,1fr))`, gap: 6 }}>
          {c.forces.map((f) => (
            <div key={f.force} style={{ background: color.field, padding: 10, display: 'flex', flexDirection: 'column', gap: 6 }}>
              <span style={sg(11.5, 700)}>{f.force}</span>
              <ThreatChip level={f.level} style={{ alignSelf: 'flex-start' }} />
              <span style={{ fontSize: 9.5, color: color.muted, lineHeight: 1.4 }}>{f.detail}</span>
            </div>
          ))}
        </div>
      </div>
      <DecisionImpact label="Decision impact" impact={c.impact} note={c.impactNote} />
    </Page>
  );
}

function ThreatChip({ level, style }: { level: 'low' | 'medium' | 'high'; style?: CSSProperties }) {
  return (
    <ExposureChip
      exposure={levelToExposure[level]}
      label={level.toUpperCase()}
      seg={[6, 5]}
      segGap={1}
      gap={4}
      size={8.5}
      pad="2px 5px"
      hatched={false}
      style={style}
    />
  );
}

import { useReport } from '../report-context';
import { color, family } from '../theme/tokens';
import { Page } from '../components/Page';
import { ms, PageTitle, RuledHead, sg, StrokeMark } from '../components/ui';
import type { BusinessModel } from '../model/types';
import { usePageSource, useSection, type PageProps } from './section';

type BlockKey = Exclude<keyof BusinessModel, 'note' | 'signals'>;

/** Standard nine-block layout on a 10-column grid. */
const LAYOUT: { key: BlockKey; title: string; col: string; row: string; tone: 'neutral' | 'value' | 'segment' | 'economics' }[] = [
  { key: 'keyPartners', title: 'Key partners', col: '1 / 3', row: '1 / 3', tone: 'neutral' },
  { key: 'keyActivities', title: 'Key activities', col: '3 / 5', row: '1 / 2', tone: 'neutral' },
  { key: 'keyResources', title: 'Key resources', col: '3 / 5', row: '2 / 3', tone: 'neutral' },
  { key: 'valuePropositions', title: 'Value propositions', col: '5 / 7', row: '1 / 3', tone: 'value' },
  { key: 'customerRelationships', title: 'Customer relationships', col: '7 / 9', row: '1 / 2', tone: 'neutral' },
  { key: 'channels', title: 'Channels', col: '7 / 9', row: '2 / 3', tone: 'neutral' },
  { key: 'customerSegments', title: 'Customer segments', col: '9 / 11', row: '1 / 3', tone: 'segment' },
  { key: 'costStructure', title: 'Cost structure', col: '1 / 6', row: '3 / 4', tone: 'economics' },
  { key: 'revenueStreams', title: 'Revenue streams', col: '6 / 11', row: '3 / 4', tone: 'economics' },
];

/** Grounds, not boxes: value propositions carry the signal on navy. */
const TONE = {
  neutral: { bg: color.field, fg: color.ink, rule: color.hairline, stroke: null },
  value: { bg: color.navy, fg: color.white, rule: color.navyRule, stroke: color.gold },
  segment: { bg: color.field, fg: color.ink, rule: color.hairline, stroke: color.teal },
  economics: { bg: color.field, fg: color.ink, rule: color.hairline, stroke: color.gold },
};

/** BusinessModelCanvas + Business Model Signals. */
export function BusinessModelCanvas({ page }: PageProps) {
  const { businessModel: bm } = useReport();
  return (
    <Page page={page} label="Business Model Canvas" {...useSection('business-model')} section="Business model canvas" source={usePageSource('business-model')} bodyGap={14}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'end', gap: 20 }}>
        <PageTitle>Business model canvas</PageTitle>
        <span style={{ fontSize: 10, color: color.muted }}>{bm.note}</span>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(10,minmax(0,1fr))', gridTemplateRows: 'auto auto auto', gap: 4 }}>
        {LAYOUT.map((b) => {
          const t = TONE[b.tone];
          const items = bm[b.key];
          return (
            <div
              key={b.key}
              style={{
                gridColumn: b.col,
                gridRow: b.row,
                background: t.bg,
                color: t.fg,
                padding: '10px 10px 12px',
                display: 'flex',
                flexDirection: 'column',
                gap: 6,
              }}
            >
              <span style={{ display: 'flex', alignItems: 'center', gap: 6, ...ms(10.5, 600) }}>
                {t.stroke && <StrokeMark color={t.stroke} w={3} h={9} />}
                {b.title}
              </span>
              {items.length === 0 && <span style={{ fontSize: 10, color: color.muted }}>— Not provided by source</span>}
              {items.map((it, i) => (
                <span key={i} style={{ fontSize: 10, lineHeight: 1.4, paddingLeft: 8, borderLeft: `1px solid ${t.rule}` }}>
                  {it}
                </span>
              ))}
            </div>
          );
        })}
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 8, marginTop: 6 }}>
        <RuledHead title="Business model signals ◇" meta="Analytical read of the canvas" metaStyle={{ fontSize: 9.5 }} />
        <div style={{ display: 'grid', gridTemplateColumns: `repeat(${bm.signals.length},minmax(0,1fr))`, gap: 8 }}>
          {bm.signals.map((s) => (
            <div key={s.key} style={{ display: 'flex', flexDirection: 'column', gap: 6, background: color.field, padding: '10px 10px 12px' }}>
              <span style={{ display: 'flex', alignItems: 'center', gap: 6, ...ms(9.5, 600), color: color.muted }}>
                <StrokeMark color={family[s.accent].accent} w={3} h={9} />
                {s.key}
              </span>
              <span style={{ ...sg(12.5, 700), lineHeight: 1.25 }}>{s.title}</span>
              <span style={{ fontSize: 10, lineHeight: 1.45, color: color.muted }}>{s.detail}</span>
            </div>
          ))}
        </div>
      </div>
    </Page>
  );
}

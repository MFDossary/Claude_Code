import { useReport } from '../report-context';
import { color, family } from '../theme/tokens';
import { Page } from '../components/Page';
import { PageTitle, RuledHead, sg } from '../components/ui';
import type { BusinessModel } from '../model/types';
import { usePageSource, useSection, type PageProps } from './section';

type BlockKey = Exclude<keyof BusinessModel, 'note' | 'signals'>;

/** Standard nine-block layout on a 10-column grid. */
const LAYOUT: { key: BlockKey; title: string; col: string; row: string; tone: 'neutral' | 'value' | 'segment' | 'economics' }[] = [
  { key: 'keyPartners', title: 'KEY PARTNERS', col: '1 / 3', row: '1 / 3', tone: 'neutral' },
  { key: 'keyActivities', title: 'KEY ACTIVITIES', col: '3 / 5', row: '1 / 2', tone: 'neutral' },
  { key: 'keyResources', title: 'KEY RESOURCES', col: '3 / 5', row: '2 / 3', tone: 'neutral' },
  { key: 'valuePropositions', title: 'VALUE PROPOSITIONS', col: '5 / 7', row: '1 / 3', tone: 'value' },
  { key: 'customerRelationships', title: 'CUSTOMER RELATIONSHIPS', col: '7 / 9', row: '1 / 2', tone: 'neutral' },
  { key: 'channels', title: 'CHANNELS', col: '7 / 9', row: '2 / 3', tone: 'neutral' },
  { key: 'customerSegments', title: 'CUSTOMER SEGMENTS', col: '9 / 11', row: '1 / 3', tone: 'segment' },
  { key: 'costStructure', title: 'COST STRUCTURE', col: '1 / 6', row: '3 / 4', tone: 'economics' },
  { key: 'revenueStreams', title: 'REVENUE STREAMS', col: '6 / 11', row: '3 / 4', tone: 'economics' },
];

const TONE = {
  neutral: { bg: color.surface, bd: color.ruleStrong },
  value: { bg: color.lilacSoft, bd: color.brand },
  segment: { bg: color.tealSoft, bd: color.teal },
  economics: { bg: color.goldSoft, bd: color.gold },
};

/** BusinessModelCanvas + Business Model Signals. */
export function BusinessModelCanvas({ page }: PageProps) {
  const { businessModel: bm } = useReport();
  return (
    <Page page={page} label="Business Model Canvas" {...useSection('business-model')} section="BUSINESS MODEL CANVAS" source={usePageSource('business-model')} bodyGap={14}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'end', gap: 20 }}>
        <PageTitle>Business model canvas</PageTitle>
        <span style={{ fontSize: 10, color: color.subtle }}>{bm.note}</span>
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
                padding: '10px 10px 12px',
                display: 'flex',
                flexDirection: 'column',
                gap: 6,
                borderTop: `2px solid ${t.bd}`,
              }}
            >
              <span style={{ ...sg(9.5, 700, '0.12em'), color: color.ink }}>{b.title}</span>
              {items.length === 0 && <span style={{ fontSize: 10, color: color.subtle }}>— Not provided by source</span>}
              {items.map((it, i) => (
                <span key={i} style={{ fontSize: 10, lineHeight: 1.4, color: color.text, paddingLeft: 8, borderLeft: `1px solid ${color.ruleStrong}` }}>
                  {it}
                </span>
              ))}
            </div>
          );
        })}
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 8, marginTop: 6 }}>
        <RuledHead title="BUSINESS MODEL SIGNALS ◇" meta="Analytical read of the canvas" metaStyle={{ fontSize: 9.5 }} />
        <div style={{ display: 'grid', gridTemplateColumns: `repeat(${bm.signals.length},minmax(0,1fr))`, gap: 8 }}>
          {bm.signals.map((s) => (
            <div key={s.key} style={{ display: 'flex', flexDirection: 'column', gap: 6, borderTop: `3px solid ${family[s.accent].accent}`, paddingTop: 8 }}>
              <span style={{ ...sg(8.5, 600, '0.12em'), color: color.subtle }}>{s.key}</span>
              <span style={{ ...sg(12.5, 700), lineHeight: 1.25 }}>{s.title}</span>
              <span style={{ fontSize: 10, lineHeight: 1.45, color: color.muted }}>{s.detail}</span>
            </div>
          ))}
        </div>
      </div>
    </Page>
  );
}

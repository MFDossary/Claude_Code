import { Fragment } from 'react';
import { useReport } from '../report-context';
import { color, hatch } from '../theme/tokens';
import { Page } from '../components/Page';
import { ms, Lede, PageTitle, TableHead, sg } from '../components/ui';
import { usePageSource, useSection, type PageProps } from './section';

const COLS = '30px minmax(0,1.5fr) minmax(0,1fr) minmax(0,1.1fr) 46px';

/** ActionRoadmap (decision table): grouped by time horizon. */
export function ActionPlan({ page }: PageProps) {
  const { actions } = useReport();
  return (
    <Page page={page} label="Immediate Action Plan" {...useSection('case')} section="Immediate action plan" source={usePageSource('actions')} bodyGap={16} bodyPad="13px 0 14px">
      <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
        <PageTitle>Immediate action plan</PageTitle>
        <Lede size={12.5}>{actions.intro}</Lede>
      </div>
      <div>
        <TableHead
          columns={COLS}
          pad="8px 12px"
          cells={[
            <span>#</span>,
            <span>ACTION · WHY IT MATTERS</span>,
            <span>EVIDENCE TO COLLECT</span>,
            <span>SUCCESS THRESHOLD</span>,
            <span style={{ textAlign: 'right' }}>COND.</span>,
          ]}
        />
        {actions.groups.map((g, gi) => {
          const start = actions.groups.slice(0, gi).reduce((sum, x) => sum + x.items.length, 0);
          return (
          <Fragment key={g.horizon}>
            <div style={{ display: 'flex', gap: 10, alignItems: 'center', padding: '7px 12px', background: color.field, borderBottom: `1px solid ${color.hairline}` }}>
              <span style={{ ...ms(11, 600), color: color.ink }}>{g.horizon}</span>
              <span style={{ fontSize: 10, color: color.ink }}>{g.window}</span>
            </div>
            {g.items.map((a, ai) => (
              <div
                key={ai}
                style={{
                  display: 'grid',
                  gridTemplateColumns: COLS,
                  gap: 10,
                  padding: '9px 12px',
                  borderBottom: `1px solid ${color.rowRule}`,
                  fontSize: 10.5,
                  lineHeight: 1.45,
                  alignItems: 'start',
                }}
              >
                <span style={{ ...sg(12, 700), color: color.navy }}>{start + ai + 1}</span>
                <span style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                  <b style={{ ...sg(12), fontWeight: 700, color: color.ink }}>{a.title}</b>
                  <span style={{ color: color.muted }}>{a.why}</span>
                </span>
                <span style={{ color: color.ink }}>{a.evidence}</span>
                {a.threshold ? (
                  <span style={{ color: color.ink, fontWeight: 500 }}>{a.threshold}</span>
                ) : (
                  <span style={{ color: color.ink, fontWeight: 500, background: hatch.slot, padding: '2px 5px' }}>— Threshold not provided by source</span>
                )}
                <span style={{ textAlign: 'right', ...sg(10, 700), color: color.navy }}>{a.conditions}</span>
              </div>
            ))}
          </Fragment>
          );
        })}
      </div>
      {actions.conflict && (
        <div style={{ display: 'flex', gap: 10, alignItems: 'center', fontSize: 9.5, color: color.muted, marginTop: 'auto' }}>
          <span style={{ border: `1px dashed ${color.warn}`, color: color.warn, padding: '2px 6px', ...ms(9.5, 600) }}>⚠ SOURCE CONFLICT</span>
          <span>{actions.conflict}</span>
        </div>
      )}
    </Page>
  );
}

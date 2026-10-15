import type { CSSProperties, ReactNode } from 'react';
import { useReport } from '../report-context';
import { color } from '../theme/tokens';
import { Page } from '../components/Page';
import { EvidenceBadge, ExposureChip, PageTitle, sg } from '../components/ui';
import { importanceLabel } from '../model/states';
import { usePageSource, useSection, type PageProps } from './section';

/** Key strengths / key risks split. Colour marks family, not good/bad. */
export function StrengthsRisks({ page }: PageProps) {
  const { strengthsRisks: sr } = useReport();
  return (
    <Page page={page} label="Strengths and Risks" {...useSection('case')} section="STRENGTHS & RISKS" source={usePageSource('strengths-risks')} bodyGap={18} bodyPad="24px 0 14px">
      <PageTitle>Key strengths and key risks</PageTitle>
      <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0,1fr) minmax(0,1fr)', gap: 20 }}>
        <Column title="STRENGTHS" meta="SIGNIFICANCE · EVIDENCE">
          {sr.strengths.map((s, i) => (
            <Card key={i} tag={`S${i + 1}`} tagColor={color.tealInk} title={s.title} detail={s.detail} style={{ background: color.surface }}>
              <span style={{ ...sg(9, 700, '0.08em'), background: color.white, padding: '3px 6px' }}>{importanceLabel[s.importance]}</span>
              <EvidenceBadge evidence={s.evidence} pip={6} gap={4} size={9} tracking="0.08em" style={{ background: color.white, padding: '3px 6px' }} />
            </Card>
          ))}
        </Column>
        <Column title="RISKS" meta="SEVERITY · EVIDENCE">
          {sr.risks.map((r, i) => (
            <Card
              key={i}
              tag={`R${i + 1}`}
              tagColor={color.copperInk}
              title={r.title}
              detail={r.detail}
              style={{ background: color.white, border: `1px solid ${color.rule}` }}
            >
              <ExposureChip exposure={r.exposure} seg={[7, 5]} gap={4} size={9} tracking="0.08em" hatched={false} />
              <EvidenceBadge evidence={r.evidence} pip={6} gap={4} size={9} tracking="0.08em" style={{ border: `1px solid ${color.rule}`, padding: '3px 6px' }} />
            </Card>
          ))}
        </Column>
      </div>
      <span style={{ marginTop: 'auto', fontSize: 9, color: color.subtle, lineHeight: 1.45 }}>{sr.note}</span>
    </Page>
  );
}

function Column({ title, meta, children }: { title: string; meta: string; children: ReactNode }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', borderBottom: `2px solid ${color.ink}`, paddingBottom: 6 }}>
        <span style={sg(12, 700, '0.14em')}>{title}</span>
        <span style={{ ...sg(9, 400, '0.12em'), color: color.subtle }}>{meta}</span>
      </div>
      {children}
    </div>
  );
}

function Card({
  tag,
  tagColor,
  title,
  detail,
  style,
  children,
}: {
  tag: string;
  tagColor: string;
  title: string;
  detail: string;
  style: CSSProperties;
  children: ReactNode;
}) {
  return (
    <div style={{ padding: '12px 14px', display: 'flex', flexDirection: 'column', gap: 7, ...style }}>
      <div style={{ display: 'grid', gridTemplateColumns: '22px minmax(0,1fr)', gap: 6 }}>
        <span style={{ ...sg(12, 700), color: tagColor }}>{tag}</span>
        <span style={{ ...sg(13.5, 700), lineHeight: 1.25 }}>{title}</span>
      </div>
      <span style={{ fontSize: 11, lineHeight: 1.5, color: color.muted, paddingLeft: 28 }}>{detail}</span>
      <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap', paddingLeft: 28 }}>{children}</div>
    </div>
  );
}

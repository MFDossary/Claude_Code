import type { CSSProperties, ReactNode } from 'react';
import { color, family as families, font } from '../theme/tokens';
import { useReport } from '../report-context';
import type { Family } from '../model/types';
import { sg } from './ui';
import { pageId } from '../pages/section';

const LOGO_BLUE = 'assets/validisory-logo-blue.svg';

/** Running header: section number · family · page section, logo right. */
export function PageHeader({
  number,
  family,
  familyLabel,
  section,
}: {
  number?: string;
  family?: Family;
  familyLabel?: string;
  section: string;
}) {
  const f = family ? families[family] : undefined;
  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        ...sg(9, 400, '0.14em'),
        color: color.subtle,
        borderBottom: `1px solid ${color.rule}`,
        paddingBottom: 8,
      }}
    >
      {f && number ? (
        <span style={{ display: 'flex', gap: 10 }}>
          <b style={{ color: f.ink }}>{number}</b>
          <span style={{ fontWeight: 600 }}>{familyLabel ?? f.label}</span>
          <span>/ {section}</span>
        </span>
      ) : (
        <span style={{ fontWeight: 600 }}>{section}</span>
      )}
      <img src={LOGO_BLUE} alt="Validisory" style={{ height: 22, width: 'auto', display: 'block' }} />
    </div>
  );
}

/** Running footer: venture identifier · source pages · page number. */
export function PageFooter({ page, source }: { page: number; source?: string }) {
  const { meta } = useReport();
  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'space-between',
        fontSize: 9,
        color: color.subtle,
        borderTop: `1px solid ${color.rule}`,
        paddingTop: 8,
      }}
    >
      <span>{meta.ventureName} · Venture Validation Report · Confidential</span>
      {source && <span>{source}</span>}
      <span style={{ ...sg(9, 700), color: color.ink }}>{String(page).padStart(2, '0')}</span>
    </div>
  );
}

/**
 * A4 master page. Fixed 210 × 297 mm box; content owns its insets.
 * The page-edge tab steps down 74px per TOC section so sections can be
 * found by thumbing the printed edge.
 */
export function Page({
  page,
  label,
  number,
  family,
  section,
  source,
  sectionIndex,
  familyLabel,
  bodyGap,
  bodyPad = '22px 0 14px',
  children,
}: {
  page: number;
  /** Screen label used for bookmarks/outline. */
  label: string;
  number?: string;
  family?: Family;
  section: string;
  source?: string;
  /** 1-based TOC section position for the edge tab; omit for none. */
  sectionIndex?: number;
  /** Override the family label in the header (e.g. APPENDIX). */
  familyLabel?: string;
  bodyGap: number;
  bodyPad?: string;
  children: ReactNode;
}) {
  const edge = family ? families[family].accent : undefined;
  return (
    <section className="page" id={pageId(page)} data-screen-label={`${String(page).padStart(2, '0')} ${label}`}>
      <div style={frame}>
        {edge && sectionIndex && (
          <span
            style={{ position: 'absolute', right: 0, top: 70 + 74 * (sectionIndex - 1), width: 5, height: 64, background: edge }}
          />
        )}
        <PageHeader number={number} family={family} familyLabel={familyLabel} section={section} />
        <div
          style={{
            flex: 1,
            minHeight: 0,
            display: 'flex',
            flexDirection: 'column',
            gap: bodyGap,
            padding: bodyPad,
          }}
        >
          {children}
        </div>
        <PageFooter page={page} source={source} />
      </div>
    </section>
  );
}

const frame: CSSProperties = {
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
  padding: '34px 44px 26px 48px',
  position: 'relative',
  background: color.white,
  color: color.ink,
  fontFamily: font.body,
  overflow: 'hidden',
};

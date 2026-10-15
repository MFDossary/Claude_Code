import { useReport } from '../report-context';
import type { PageKey, SectionKey } from '../model/types';

export interface PageProps {
  /** 1-based page number in the rendered document. */
  page: number;
}

/**
 * Template page order. Page numbers, TOC targets and cross-references are
 * all derived from this list, so reordering or dropping a page (e.g. a
 * section that does not apply) keeps every link correct.
 */
export const PAGE_ORDER: PageKey[] = [
  'cover',
  'contents',
  'decision',
  'glance',
  'decision-case',
  'summary',
  'strengths-risks',
  'actions',
  'business-model',
  'market',
  'financial',
  'competition',
  'technical',
  'regulatory',
  'risk',
  'scenarios',
  'roadmap',
  'sources',
  'icp',
  'risk-register',
];

/** First page of each TOC section. */
export const SECTION_PAGE: Record<SectionKey, PageKey> = {
  decision: 'decision',
  case: 'glance',
  market: 'market',
  'business-model': 'business-model',
  financial: 'financial',
  competition: 'competition',
  technical: 'technical',
  regulatory: 'regulatory',
  risk: 'risk',
  scenarios: 'scenarios',
  roadmap: 'roadmap',
  sources: 'sources',
};

export const pageId = (page: number) => `p${String(page).padStart(2, '0')}`;
export const pageNo = (key: PageKey) => PAGE_ORDER.indexOf(key) + 1;
export const pageHref = (key: PageKey) => `#${pageId(pageNo(key))}`;
/** Footer source note for a page, keyed by page key. */
export const usePageSource = (key: PageKey) => useReport().pageSources[key];

/** Section number, family and edge-tab position from the TOC. */
export function useSection(key: SectionKey) {
  const { toc } = useReport();
  const i = toc.findIndex((t) => t.key === key);
  if (i < 0) throw new Error(`Section "${key}" missing from TOC`);
  return { number: String(i + 1).padStart(2, '0'), family: toc[i].family, sectionIndex: i + 1 };
}

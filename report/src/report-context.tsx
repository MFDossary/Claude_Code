import { createContext, useContext, type ReactNode } from 'react';
import type { ReportData } from './model/types';

const ReportContext = createContext<ReportData | null>(null);

export function ReportProvider({ data, children }: { data: ReportData; children: ReactNode }) {
  return <ReportContext.Provider value={data}>{children}</ReportContext.Provider>;
}

export function useReport(): ReportData {
  const r = useContext(ReportContext);
  if (!r) throw new Error('useReport must be used inside <ReportProvider>');
  return r;
}

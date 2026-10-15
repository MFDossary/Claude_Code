import type { ComponentType } from 'react';
import { ReportProvider } from './report-context';
import type { PageKey, ReportData } from './model/types';
import { PAGE_ORDER, type PageProps } from './pages/section';
import { Cover } from './pages/Cover';
import { Contents } from './pages/Contents';
import { ExecutiveDecision } from './pages/ExecutiveDecision';
import { AtAGlance } from './pages/AtAGlance';
import { DecisionCase } from './pages/DecisionCase';
import { ExecutiveSummary } from './pages/ExecutiveSummary';
import { StrengthsRisks } from './pages/StrengthsRisks';
import { ActionPlan } from './pages/ActionPlan';
import { BusinessModelCanvas } from './pages/BusinessModelCanvas';
import { MarketOpportunity } from './pages/MarketOpportunity';
import { Financial } from './pages/Financial';
import { Competition } from './pages/Competition';
import { Technical } from './pages/Technical';
import { Regulatory } from './pages/Regulatory';
import { RiskSystem } from './pages/RiskSystem';
import { Scenarios } from './pages/Scenarios';
import { Roadmap } from './pages/Roadmap';
import { Sources } from './pages/Sources';
import { IcpModule } from './pages/IcpModule';
import { RiskRegister } from './pages/RiskRegister';

const PAGES: Record<PageKey, ComponentType<PageProps>> = {
  cover: Cover,
  contents: Contents,
  decision: ExecutiveDecision,
  glance: AtAGlance,
  'decision-case': DecisionCase,
  summary: ExecutiveSummary,
  'strengths-risks': StrengthsRisks,
  actions: ActionPlan,
  'business-model': BusinessModelCanvas,
  market: MarketOpportunity,
  financial: Financial,
  competition: Competition,
  technical: Technical,
  regulatory: Regulatory,
  risk: RiskSystem,
  scenarios: Scenarios,
  roadmap: Roadmap,
  sources: Sources,
  icp: IcpModule,
  'risk-register': RiskRegister,
};

/** The full report: every page in template order. */
export function ReportDocument({ data }: { data: ReportData }) {
  return (
    <ReportProvider data={data}>
      <main className="document">
        {PAGE_ORDER.map((key, i) => {
          const P = PAGES[key];
          return <P key={key} page={i + 1} />;
        })}
      </main>
    </ReportProvider>
  );
}

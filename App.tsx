import React, { useState } from 'react';
import Header from './components/Header';
import IndicatorChecklist from './components/IndicatorChecklist';
import PerformancePlan from './components/PerformancePlan';
import AiSummary from './components/AiSummary';
import ProgressChart from './components/ProgressChart';
import SidebarNav from './components/SidebarNav';
import { INITIAL_INDICATOR_DATA, PERFORMANCE_PLAN_DATA } from './constants';
import { IndicatorGroup, PlanItem } from './types';

function App() {
  const [indicatorData, setIndicatorData] = useState<IndicatorGroup[]>(INITIAL_INDICATOR_DATA);
  const [planData, setPlanData] = useState<PlanItem[]>(PERFORMANCE_PLAN_DATA);

  const handleToggleIndicator = (groupIdx: number, indicatorIdx: number) => {
    setIndicatorData(prevData => {
      const newData = JSON.parse(JSON.stringify(prevData));
      newData[groupIdx].indicators[indicatorIdx].completed = !newData[groupIdx].indicators[indicatorIdx].completed;
      return newData;
    });
  };

  const handleUpdateIndicatorNotes = (groupIdx: number, indicatorIdx: number, notes: string) => {
    setIndicatorData(prevData => {
      const newData = [...prevData.map(group => ({ ...group, indicators: [...group.indicators] }))];
      newData[groupIdx].indicators[indicatorIdx].notes = notes;
      return newData;
    });
  };

  const handleUpdatePlanData = (newPlanData: PlanItem[]) => {
    setPlanData(newPlanData);
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900 text-slate-800 dark:text-slate-200 p-4 sm:p-6 lg:p-8 transition-colors duration-300">
      <div className="max-w-7xl mx-auto">
        <Header />
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mt-8">
            <aside className="lg:col-span-3 lg:sticky lg:top-8 self-start order-last lg:order-first">
                <SidebarNav />
            </aside>
            <main className="lg:col-span-9 space-y-8">
                <section id="ai-summary" className="scroll-mt-24">
                    <AiSummary planData={planData} indicatorData={indicatorData} />
                </section>
                <section id="performance-plan" className="scroll-mt-24">
                    <PerformancePlan data={planData} onUpdateData={handleUpdatePlanData} />
                </section>
                <section id="progress-chart" className="scroll-mt-24">
                    <ProgressChart data={indicatorData} />
                </section>
                <section id="indicator-checklist" className="scroll-mt-24">
                    <IndicatorChecklist 
                      data={indicatorData} 
                      onToggle={handleToggleIndicator} 
                      onUpdateNotes={handleUpdateIndicatorNotes}
                    />
                </section>
            </main>
        </div>
        <footer className="text-center mt-12 text-sm text-slate-500 dark:text-slate-400">
          <p>إعداد: أ. خليل إبراهيم المخلافي</p>
        </footer>
      </div>
    </div>
  );
}

export default App;
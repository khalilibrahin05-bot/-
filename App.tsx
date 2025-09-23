import React, { useState } from 'react';
import Header from './components/Header';
import IndicatorChecklist from './components/IndicatorChecklist';
import PerformancePlan from './components/PerformancePlan';
import AiSummary from './components/AiSummary';
import ProgressChart from './components/ProgressChart';
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

  const handleUpdatePlanData = (newPlanData: PlanItem[]) => {
    setPlanData(newPlanData);
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900 text-slate-800 dark:text-slate-200 p-4 sm:p-6 lg:p-8 transition-colors duration-300">
      <div className="max-w-7xl mx-auto">
        <Header />
        <main className="mt-8 grid grid-cols-1 lg:grid-cols-5 gap-8">
          <div className="lg:col-span-5">
             <AiSummary planData={planData} indicatorData={indicatorData} />
          </div>
          <div className="lg:col-span-3 space-y-8">
            <PerformancePlan data={planData} onUpdateData={handleUpdatePlanData} />
          </div>
          <div className="lg:col-span-2 space-y-8">
            <ProgressChart data={indicatorData} />
            <IndicatorChecklist data={indicatorData} onToggle={handleToggleIndicator} />
          </div>
        </main>
        <footer className="text-center mt-12 text-sm text-slate-500 dark:text-slate-400">
          <p>إعداد: أ. خليل إبراهيم المخلافي</p>
        </footer>
      </div>
    </div>
  );
}

export default App;
import React, { useState } from 'react';
import { Indicator, IndicatorGroup } from '../types';
import { CheckCircleIcon, ClipboardListIcon } from './icons';

interface IndicatorChecklistProps {
  data: IndicatorGroup[];
  onToggle: (groupIdx: number, indicatorIdx: number) => void;
}

const IndicatorChecklist: React.FC<IndicatorChecklistProps> = ({ data, onToggle }) => {
  const [expandedIndicatorId, setExpandedIndicatorId] = useState<number | null>(null);

  const handleToggleExpand = (indicatorId: number) => {
    setExpandedIndicatorId(currentId => (currentId === indicatorId ? null : indicatorId));
  };

  return (
    <div className="bg-white dark:bg-slate-800 rounded-xl shadow-md p-6 border border-slate-200 dark:border-slate-700 h-full">
      <div className="flex items-center gap-3 mb-6">
        <ClipboardListIcon className="w-7 h-7 text-sky-600 dark:text-sky-400" />
        <h2 className="text-xl font-bold text-slate-900 dark:text-white">قائمة المؤشرات الدورية</h2>
      </div>
      <div className="space-y-6">
        {data.map((group, groupIdx) => {
          const completedCount = group.indicators.filter(ind => ind.completed).length;
          const totalCount = group.indicators.length;
          const progress = totalCount > 0 ? (completedCount / totalCount) * 100 : 0;

          const groupedByCategory = group.indicators.reduce((acc, indicator, originalIndex) => {
            const category = indicator.category || 'مهام متنوعة';
            if (!acc[category]) {
              acc[category] = [];
            }
            acc[category].push({ ...indicator, originalIndex });
            return acc;
          }, {} as Record<string, (Indicator & { originalIndex: number })[]>);

          return (
            <div key={groupIdx}>
              <div className="flex justify-between items-center mb-3">
                <h3 className="font-bold text-lg text-slate-700 dark:text-slate-300">{group.category}</h3>
                <span className="text-sm font-medium text-slate-500 dark:text-slate-400">{completedCount}/{totalCount}</span>
              </div>
              <div className="w-full bg-slate-200 dark:bg-slate-700 rounded-full h-2.5 mb-4">
                <div className="bg-sky-500 h-2.5 rounded-full transition-all duration-500" style={{ width: `${progress}%` }}></div>
              </div>
              <div className="space-y-4 max-h-80 overflow-y-auto pr-2">
                {Object.entries(groupedByCategory).map(([category, indicators]) => (
                  <div key={category}>
                    <h4 className="font-semibold text-sm text-slate-500 dark:text-slate-400 mb-2">{category}</h4>
                    <div className="space-y-2">
                      {indicators.map((indicator) => (
                        <div key={indicator.id}>
                          <div className="flex items-start gap-3 group">
                            <div className="flex-shrink-0 mt-0.5">
                                <input
                                  id={`indicator-${indicator.id}`}
                                  type="checkbox"
                                  checked={indicator.completed}
                                  onChange={() => onToggle(groupIdx, indicator.originalIndex)}
                                  className="hidden"
                                />
                                <label htmlFor={`indicator-${indicator.id}`} className="cursor-pointer">
                                  <div className={`w-5 h-5 rounded-md flex items-center justify-center border-2 transition-all duration-200 ${indicator.completed ? 'bg-sky-500 border-sky-500' : 'bg-transparent border-slate-300 dark:border-slate-600 group-hover:border-sky-400'}`}>
                                    {indicator.completed && <CheckCircleIcon className="w-4 h-4 text-white" />}
                                  </div>
                                </label>
                            </div>
                            <div className="flex-grow cursor-pointer" onClick={() => handleToggleExpand(indicator.id)}>
                                <span className={`text-sm ${indicator.completed ? 'line-through text-slate-400 dark:text-slate-500' : 'text-slate-600 dark:text-slate-300'} transition-colors duration-200`}>
                                  {indicator.text}
                                </span>
                            </div>
                          </div>

                           <div className={`transition-all duration-300 ease-in-out overflow-hidden ${expandedIndicatorId === indicator.id ? 'max-h-96 opacity-100 pt-2' : 'max-h-0 opacity-0'}`}>
                                <div className="ml-8 p-3 bg-slate-50 dark:bg-slate-700/50 rounded-md text-sm text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-700">
                                    <p className="font-semibold mb-1">تفاصيل إضافية:</p>
                                    <p>هنا يمكن إضافة وصف تفصيلي للمؤشر، معايير التحقق، الأدلة المطلوبة، والملاحظات الإشرافية المرتبطة به لضمان الوضوح والمتابعة الدقيقة.</p>
                                </div>
                            </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default IndicatorChecklist;
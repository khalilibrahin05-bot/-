import React, { useState } from 'react';
import { Indicator, IndicatorGroup } from '../types';
import { CheckCircleIcon, ClipboardListIcon } from './icons';

interface IndicatorChecklistProps {
  data: IndicatorGroup[];
  onToggle: (groupIdx: number, indicatorIdx: number) => void;
  onUpdateNotes: (groupIdx: number, indicatorIdx: number, notes: string) => void;
}

type SortOption = 'default' | 'alpha' | 'status';

const IndicatorChecklist: React.FC<IndicatorChecklistProps> = ({ data, onToggle, onUpdateNotes }) => {
  const [expandedIndicatorId, setExpandedIndicatorId] = useState<number | null>(null);
  const [sortOrders, setSortOrders] = useState<Record<string, SortOption>>({});

  const handleToggleExpand = (indicatorId: number) => {
    setExpandedIndicatorId(currentId => (currentId === indicatorId ? null : indicatorId));
  };

  const handleSortChange = (category: string, value: SortOption) => {
    setSortOrders(prev => ({ ...prev, [category]: value }));
  };

  return (
    <div className="bg-white dark:bg-slate-800 rounded-xl shadow-md p-6 border border-slate-200 dark:border-slate-700 h-full">
      <div className="flex items-center gap-3 mb-6">
        <ClipboardListIcon className="w-7 h-7 text-indigo-600 dark:text-indigo-400" />
        <h2 className="text-xl font-bold text-slate-900 dark:text-white">قائمة المؤشرات الدورية</h2>
      </div>
      <div className="space-y-6">
        {data.map((group, groupIdx) => {
          const completedCount = group.indicators.filter(ind => ind.completed).length;
          const totalCount = group.indicators.length;
          const progress = totalCount > 0 ? (completedCount / totalCount) * 100 : 0;
          const currentSort = sortOrders[group.category] || 'default';

          let indicatorsWithOriginalIndex = group.indicators.map((indicator, originalIndex) => ({
              ...indicator,
              originalIndex
          }));

          if (currentSort === 'alpha') {
              indicatorsWithOriginalIndex.sort((a, b) => a.text.localeCompare(b.text, 'ar'));
          } else if (currentSort === 'status') {
              indicatorsWithOriginalIndex.sort((a, b) => {
                  if (a.completed === b.completed) return 0;
                  return a.completed ? -1 : 1; // Completed (true) comes first
              });
          }

          const groupedByCategory = indicatorsWithOriginalIndex.reduce((acc, indicator) => {
            const category = indicator.category || 'مهام متنوعة';
            if (!acc[category]) {
              acc[category] = [];
            }
            acc[category].push(indicator);
            return acc;
          }, {} as Record<string, (Indicator & { originalIndex: number })[]>);

          return (
            <div key={groupIdx}>
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-3 gap-2">
                <h3 className="font-bold text-lg text-slate-700 dark:text-slate-300">{group.category}</h3>
                <div className="flex items-center gap-4 w-full sm:w-auto">
                    <div className="flex-grow text-sm font-medium text-slate-500 dark:text-slate-400 text-left">
                        <span>{completedCount} / {totalCount} ({Math.round(progress)}% مكتمل)</span>
                    </div>
                    <div className="flex-shrink-0">
                        <select
                            value={currentSort}
                            onChange={(e) => handleSortChange(group.category, e.target.value as SortOption)}
                            className="text-xs bg-slate-100 dark:bg-slate-700 border border-slate-200 dark:border-slate-600 rounded-md py-1 px-2 focus:outline-none focus:ring-2 focus:ring-sky-500 transition"
                        >
                            <option value="default">ترتيب افتراضي</option>
                            <option value="alpha">أبجديًا</option>
                            <option value="status">حالة الإنجاز</option>
                        </select>
                    </div>
                </div>
              </div>

              <div className="w-full bg-slate-200 dark:bg-slate-700 rounded-full h-2.5 mb-4">
                <div className="bg-indigo-500 h-2.5 rounded-full transition-all duration-500" style={{ width: `${progress}%` }}></div>
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
                                  <div className={`w-5 h-5 rounded-md flex items-center justify-center border-2 transition-all duration-200 ${indicator.completed ? 'bg-indigo-500 border-indigo-500' : 'bg-transparent border-slate-300 dark:border-slate-600 group-hover:border-indigo-400'}`}>
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
                                <div className="ml-8 p-3 bg-slate-50 dark:bg-slate-700/50 rounded-md text-sm text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-700 space-y-3">
                                    <div>
                                        <p className="font-semibold mb-1">تفاصيل إضافية:</p>
                                        <p>هنا يمكن إضافة وصف تفصيلي للمؤشر، معايير التحقق، الأدلة المطلوبة، والملاحظات الإشرافية المرتبطة به لضمان الوضوح والمتابعة الدقيقة.</p>
                                    </div>
                                    <div>
                                        <label htmlFor={`notes-${indicator.id}`} className="font-semibold mb-1 block">ملاحظات إشرافية:</label>
                                        <textarea
                                            id={`notes-${indicator.id}`}
                                            rows={3}
                                            className="w-full bg-white dark:bg-slate-700 p-2 rounded-md border border-slate-300 dark:border-slate-600 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition text-sm placeholder:text-slate-400 dark:placeholder:text-slate-500"
                                            placeholder="أضف ملاحظاتك هنا..."
                                            value={indicator.notes || ''}
                                            onChange={(e) => onUpdateNotes(groupIdx, indicator.originalIndex, e.target.value)}
                                            onClick={(e) => e.stopPropagation()}
                                        />
                                    </div>
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
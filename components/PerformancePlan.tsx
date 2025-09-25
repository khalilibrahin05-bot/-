import React, { useState } from 'react';
import { PlanItem } from '../types';
import { TargetIcon, DocumentTextIcon, ActivityIcon, TrashIcon } from './icons';

interface PerformancePlanProps {
  data: PlanItem[];
  onUpdateData: (newData: PlanItem[]) => void;
}

const PerformancePlan: React.FC<PerformancePlanProps> = ({ data, onUpdateData }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedData, setEditedData] = useState<PlanItem[]>([]);

  const handleEdit = () => {
    setEditedData(JSON.parse(JSON.stringify(data))); // Deep copy to avoid direct mutation
    setIsEditing(true);
  };

  const handleSave = () => {
    onUpdateData(editedData);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setIsEditing(false);
    setEditedData([]);
  };

  const handleInputChange = (index: number, field: keyof PlanItem, value: string) => {
    const newData = [...editedData];
    if (field === 'count' || field === 'indicatorCount') {
      // Parse value to number, but allow empty string for when the user clears the input.
      const numericValue = value === '' ? '' : parseInt(value, 10);
      // If parsing results in NaN (e.g., for non-numeric input), fall back to an empty string.
      (newData[index] as any)[field] = isNaN(numericValue as number) ? '' : numericValue;
    } else {
      (newData[index] as any)[field] = value;
    }
    setEditedData(newData);
  };

  const handleAddNewRow = () => {
    const newRow: PlanItem = {
      field: 'المجال الجديد',
      objective: '',
      indicator: '',
      indicatorCount: '',
      evidence: '',
      activity: '',
      count: '',
    };
    setEditedData([...editedData, newRow]);
  };

  const handleDeleteRow = (indexToDelete: number) => {
    setEditedData(editedData.filter((_, index) => index !== indexToDelete));
  };

  const renderCell = (item: PlanItem, index: number, field: keyof PlanItem) => {
    // EDIT MODE LOGIC
    if (isEditing) {
      switch (field) {
        case 'field':
        case 'objective':
        case 'evidence':
          return (
            <input
              type="text"
              value={editedData[index][field] as string}
              onChange={(e) => handleInputChange(index, field, e.target.value)}
              className="w-full bg-slate-100 dark:bg-slate-700 p-1 rounded-md border border-slate-300 dark:border-slate-600 focus:outline-none focus:ring-2 focus:ring-emerald-500 transition"
            />
          );
        case 'indicator':
          return (
            <div className="flex flex-col gap-1">
              <input
                type="text"
                placeholder="المؤشر"
                value={editedData[index].indicator as string}
                onChange={(e) => handleInputChange(index, 'indicator', e.target.value)}
                className="w-full bg-slate-100 dark:bg-slate-700 p-1 rounded-md border border-slate-300 dark:border-slate-600 focus:outline-none focus:ring-2 focus:ring-emerald-500 transition"
              />
              <input
                type="number"
                placeholder="العدد"
                value={editedData[index].indicatorCount}
                onChange={(e) => handleInputChange(index, 'indicatorCount', e.target.value)}
                className="w-24 bg-slate-100 dark:bg-slate-700 p-1 rounded-md border border-slate-300 dark:border-slate-600 focus:outline-none focus:ring-2 focus:ring-emerald-500 transition"
              />
            </div>
          );
        case 'activity':
          return (
            <div className="flex flex-col gap-1">
              <input
                type="text"
                placeholder="النشاط"
                value={editedData[index].activity as string}
                onChange={(e) => handleInputChange(index, 'activity', e.target.value)}
                className="w-full bg-slate-100 dark:bg-slate-700 p-1 rounded-md border border-slate-300 dark:border-slate-600 focus:outline-none focus:ring-2 focus:ring-emerald-500 transition"
              />
              <input
                type="number"
                placeholder="العدد"
                value={editedData[index].count}
                onChange={(e) => handleInputChange(index, 'count', e.target.value)}
                className="w-24 bg-slate-100 dark:bg-slate-700 p-1 rounded-md border border-slate-300 dark:border-slate-600 focus:outline-none focus:ring-2 focus:ring-emerald-500 transition"
              />
            </div>
          );
        default:
          return item[field];
      }
    }

    // VIEW MODE LOGIC
    if (field === 'evidence') {
      return <span className="flex items-center gap-2"><DocumentTextIcon className="w-4 h-4 text-slate-400" /> {item.evidence}</span>;
    }
    if (field === 'activity') {
      return <span className="flex items-center gap-2"><ActivityIcon className="w-4 h-4 text-slate-400" /> {item.activity} ({item.count})</span>;
    }
    return item[field];
  };

  return (
    <div className="bg-white dark:bg-slate-800 rounded-xl shadow-md p-6 border border-slate-200 dark:border-slate-700">
      <div className="flex items-center justify-between gap-3 mb-6">
        <div className="flex items-center gap-3">
            <TargetIcon className="w-7 h-7 text-emerald-600 dark:text-emerald-400" />
            <h2 className="text-xl font-bold text-slate-900 dark:text-white">خطة الأداء</h2>
        </div>
        <div className="flex gap-2">
            {isEditing ? (
                <>
                    <button onClick={handleSave} className="px-3 py-1 bg-emerald-600 text-white font-semibold text-sm rounded-md hover:bg-emerald-700 transition-colors">حفظ</button>
                    <button onClick={handleCancel} className="px-3 py-1 bg-slate-200 dark:bg-slate-600 text-slate-700 dark:text-slate-200 font-semibold text-sm rounded-md hover:bg-slate-300 dark:hover:bg-slate-500 transition-colors">إلغاء</button>
                </>
            ) : (
                <button onClick={handleEdit} className="px-3 py-1 bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300 font-semibold text-sm rounded-md hover:bg-slate-200 dark:hover:bg-slate-600 transition-colors">تعديل</button>
            )}
        </div>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full min-w-max text-sm text-right text-slate-500 dark:text-slate-400">
          <thead className="text-xs text-slate-700 uppercase bg-slate-100 dark:bg-slate-700 dark:text-slate-300">
            <tr>
              <th scope="col" className="px-6 py-3 rounded-tr-lg">المجال</th>
              <th scope="col" className="px-6 py-3">الهدف</th>
              <th scope="col" className="px-6 py-3">المؤشر</th>
              <th scope="col" className="px-6 py-3">الشواهد</th>
              <th scope="col" className={`px-6 py-3 ${isEditing ? '' : 'rounded-tl-lg'}`}>الأنشطة</th>
              {isEditing && <th scope="col" className="px-2 py-3 rounded-tl-lg"><span className="sr-only">Actions</span></th>}
            </tr>
          </thead>
          <tbody>
            {(isEditing ? editedData : data).map((item, index) => (
              <tr key={index} className="bg-white dark:bg-slate-800 border-b dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-700/50 transition-colors duration-200 group">
                <td className="px-6 py-4 font-medium text-slate-900 dark:text-white whitespace-nowrap">{renderCell(item, index, 'field')}</td>
                <td className="px-6 py-4">{renderCell(item, index, 'objective')}</td>
                <td className="px-6 py-4">{renderCell(item, index, 'indicator')}</td>
                <td className="px-6 py-4">{renderCell(item, index, 'evidence')}</td>
                <td className="px-6 py-4">{renderCell(item, index, 'activity')}</td>
                {isEditing && (
                  <td className="px-2 py-4 text-center">
                    <button
                      onClick={() => handleDeleteRow(index)}
                      className="p-1 text-slate-400 hover:text-red-500 dark:hover:text-red-400 opacity-0 group-hover:opacity-100 transition-opacity"
                      aria-label={`Delete row ${index + 1}`}
                    >
                      <TrashIcon className="w-5 h-5" />
                    </button>
                  </td>
                )}
              </tr>
            ))}
          </tbody>
        </table>
        {isEditing && (
          <div className="mt-6">
            <button
              onClick={handleAddNewRow}
              className="px-3 py-1 bg-indigo-100 dark:bg-indigo-900/50 text-indigo-700 dark:text-indigo-300 font-semibold text-sm rounded-md hover:bg-indigo-200 dark:hover:bg-indigo-900 transition-colors"
            >
              إضافة صف جديد
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default PerformancePlan;
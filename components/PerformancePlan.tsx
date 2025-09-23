import React, { useState } from 'react';
import { PlanItem } from '../types';
import { TargetIcon, DocumentTextIcon, ActivityIcon } from './icons';

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
    (newData[index] as any)[field] = value;
    setEditedData(newData);
  };

  const renderCell = (item: PlanItem, index: number, field: keyof PlanItem) => {
    if (isEditing && ['objective', 'indicator', 'evidence', 'activity'].includes(field)) {
      return (
        <input
          type="text"
          value={editedData[index][field] as string}
          onChange={(e) => handleInputChange(index, field, e.target.value)}
          className="w-full bg-slate-100 dark:bg-slate-700 p-1 rounded-md border border-slate-300 dark:border-slate-600 focus:outline-none focus:ring-2 focus:ring-sky-500 transition"
        />
      );
    }
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
            <TargetIcon className="w-7 h-7 text-sky-600 dark:text-sky-400" />
            <h2 className="text-xl font-bold text-slate-900 dark:text-white">خطة الأداء</h2>
        </div>
        <div className="flex gap-2">
            {isEditing ? (
                <>
                    <button onClick={handleSave} className="px-3 py-1 bg-sky-600 text-white font-semibold text-sm rounded-md hover:bg-sky-700 transition-colors">حفظ</button>
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
              <th scope="col" className="px-6 py-3 rounded-tl-lg">الأنشطة</th>
            </tr>
          </thead>
          <tbody>
            {(isEditing ? editedData : data).map((item, index) => (
              <tr key={index} className="bg-white dark:bg-slate-800 border-b dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-700/50 transition-colors duration-200">
                <td className="px-6 py-4 font-medium text-slate-900 dark:text-white whitespace-nowrap">{item.field}</td>
                <td className="px-6 py-4">{renderCell(item, index, 'objective')}</td>
                <td className="px-6 py-4">{renderCell(item, index, 'indicator')}</td>
                <td className="px-6 py-4">{renderCell(item, index, 'evidence')}</td>
                <td className="px-6 py-4">{renderCell(item, index, 'activity')}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default PerformancePlan;
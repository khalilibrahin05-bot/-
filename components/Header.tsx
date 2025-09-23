
import React from 'react';
import { ChartBarIcon } from './icons';

const Header: React.FC = () => {
  return (
    <header className="flex items-center justify-between p-4 bg-white dark:bg-slate-800 rounded-xl shadow-md border border-slate-200 dark:border-slate-700">
      <div className="flex items-center gap-4">
        <div className="p-3 bg-sky-100 dark:bg-sky-900/50 rounded-lg text-sky-600 dark:text-sky-400">
          <ChartBarIcon className="w-8 h-8" />
        </div>
        <div>
          <h1 className="text-2xl font-bold text-slate-900 dark:text-white">لوحة مؤشرات الأداء</h1>
          <p className="text-sm text-slate-500 dark:text-slate-400">نظرة شاملة على خطط الإشراف والمتابعة</p>
        </div>
      </div>
    </header>
  );
};

export default Header;

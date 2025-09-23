import React, { useState, useCallback } from 'react';
import { generateSummaryStream } from '../services/geminiService';
import { PlanItem, IndicatorGroup } from '../types';
import { SparklesIcon, AlertTriangleIcon } from './icons';

interface AiSummaryProps {
    planData: PlanItem[];
    indicatorData: IndicatorGroup[];
}

const AiSummary: React.FC<AiSummaryProps> = ({ planData, indicatorData }) => {
    const [isLoading, setIsLoading] = useState(false);
    const [summary, setSummary] = useState('');
    const [error, setError] = useState<string | null>(null);

    const handleGenerateSummary = useCallback(async () => {
        setIsLoading(true);
        setError(null);
        setSummary('');
        try {
            const stream = generateSummaryStream(planData, indicatorData);
            for await (const chunk of stream) {
                setSummary(prevSummary => prevSummary + chunk);
            }
        } catch (e: any) {
            setError(e.message || 'An unknown error occurred.');
        } finally {
            setIsLoading(false);
        }
    }, [planData, indicatorData]);

    const renderFormattedSummary = (text: string) => {
        const sections = text.split(/(\*\*.*?\*\*)/g).filter(Boolean);
        return sections.map((section, index) => {
            if (section.startsWith('**') && section.endsWith('**')) {
                return <h3 key={index} className="text-lg font-bold mt-4 mb-2 text-amber-500 dark:text-amber-400">{section.replace(/\*\*/g, '')}</h3>;
            }
            const listItems = section.split('\n').map((line, lineIndex) => {
                 if (line.trim().startsWith('* ') || line.trim().startsWith('- ')) {
                    return <li key={`${index}-${lineIndex}`} className="mb-1">{line.trim().substring(2)}</li>;
                 }
                return line;
            }).filter(line => (typeof line === 'string' && line.trim() !== '') || React.isValidElement(line));
            
            if (listItems.some(item => React.isValidElement(item))) {
                 return <ul key={index} className="list-disc list-inside space-y-1">{listItems}</ul>
            }

            return <p key={index} className="mb-2">{section}</p>;
        });
    };

    return (
        <div className="bg-white dark:bg-slate-800 rounded-xl shadow-md p-6 border border-slate-200 dark:border-slate-700">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-4">
                 <div className="flex items-center gap-3">
                    <SparklesIcon className="w-7 h-7 text-amber-500 dark:text-amber-400" />
                    <h2 className="text-xl font-bold text-slate-900 dark:text-white">ملخص وتحليل Gemini</h2>
                </div>
                <button
                    onClick={handleGenerateSummary}
                    disabled={isLoading}
                    className="flex items-center justify-center gap-2 px-4 py-2 bg-amber-500 text-white font-semibold rounded-lg shadow-md hover:bg-amber-600 disabled:bg-slate-400 disabled:cursor-not-allowed transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-amber-500 dark:focus:ring-offset-slate-800"
                >
                    {isLoading ? (
                        <>
                            <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                            </svg>
                            جاري التحليل...
                        </>
                    ) : (
                        <>
                            <SparklesIcon className="w-5 h-5"/>
                            {summary ? 'إعادة إنشاء التحليل' : 'إنشاء تحليل للخطة'}
                        </>
                    )}
                </button>
            </div>

            {error && (
                <div className="bg-red-50 dark:bg-red-900/20 border-r-4 border-red-500 text-red-700 dark:text-red-300 p-4 rounded-lg" role="alert">
                    <div className="flex items-center gap-3">
                        <AlertTriangleIcon className="w-6 h-6"/>
                        <div>
                            <p className="font-bold">حدث خطأ</p>
                            <p>{error}</p>
                        </div>
                    </div>
                </div>
            )}

            {(summary || isLoading) && !error && (
                <div className="prose prose-slate dark:prose-invert max-w-none mt-4 p-4 bg-slate-50 dark:bg-slate-900/50 rounded-lg whitespace-pre-wrap min-h-[10rem]">
                    {renderFormattedSummary(summary)}
                     {isLoading && summary.length === 0 && <p className="text-slate-500 dark:text-slate-400">يتم الآن الاتصال بالنموذج الذكي...</p>}
                </div>
            )}
            
            {!summary && !isLoading && !error && (
                <div className="text-center py-8 px-4 border-2 border-dashed border-slate-300 dark:border-slate-700 rounded-lg mt-4">
                    <p className="text-slate-500 dark:text-slate-400">
                        انقر على الزر أعلاه للحصول على ملخص تنفيذي، وأولويات مقترحة، وتوصيات لتحسين الخطة باستخدام الذكاء الاصطناعي.
                    </p>
                </div>
            )}

        </div>
    );
};

export default AiSummary;
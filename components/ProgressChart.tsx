import React, { useEffect, useRef } from 'react';
import { IndicatorGroup } from '../types';
import { ChartBarIcon } from './icons';

declare const Chart: any;

interface ProgressChartProps {
  data: IndicatorGroup[];
}

const ProgressChart: React.FC<ProgressChartProps> = ({ data }) => {
  const chartRef = useRef<HTMLCanvasElement>(null);
  const chartInstance = useRef<any>(null);

  useEffect(() => {
    if (!chartRef.current || !data) return;

    const isDarkMode = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
    const textColor = isDarkMode ? 'rgba(203, 213, 225, 0.8)' : 'rgba(71, 85, 105, 0.8)';
    const gridColor = isDarkMode ? 'rgba(51, 65, 85, 0.5)' : 'rgba(226, 232, 240, 0.6)';

    const labels = data.map(group => group.category);
    const chartData = data.map(group => {
      const completedCount = group.indicators.filter(ind => ind.completed).length;
      const totalCount = group.indicators.length;
      return totalCount > 0 ? Math.round((completedCount / totalCount) * 100) : 0;
    });

    const ctx = chartRef.current.getContext('2d');
    if (!ctx) return;

    if (chartInstance.current) {
      chartInstance.current.destroy();
    }

    chartInstance.current = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: labels,
        datasets: [{
          label: 'نسبة الإنجاز',
          data: chartData,
          backgroundColor: 'rgba(14, 165, 233, 0.6)', // sky-500 with opacity
          borderColor: 'rgba(14, 165, 233, 1)',
          borderWidth: 1,
          borderRadius: 4,
          barThickness: 'flex',
          maxBarThickness: 40,
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          y: {
            beginAtZero: true,
            max: 100,
            ticks: {
              color: textColor,
              callback: (value: number) => value + '%',
            },
            grid: {
              color: gridColor,
            }
          },
          x: {
            ticks: {
              color: textColor,
              font: {
                  family: "'Tajawal', sans-serif",
              }
            },
            grid: {
              display: false
            }
          }
        },
        plugins: {
          legend: {
            display: false,
          },
          tooltip: {
            rtl: true,
            bodyFont: {
                family: "'Tajawal', sans-serif",
            },
            titleFont: {
                family: "'Tajawal', sans-serif",
            },
            callbacks: {
              label: (context: any) => {
                const value = context.parsed.y;
                if (value !== null) {
                    return `نسبة الإنجاز: ${value}%`;
                }
                return 'نسبة الإنجاز:';
              }
            }
          }
        }
      }
    });

    return () => {
      if (chartInstance.current) {
        chartInstance.current.destroy();
      }
    };
  }, [data]);

  return (
    <div className="bg-white dark:bg-slate-800 rounded-xl shadow-md p-6 border border-slate-200 dark:border-slate-700">
      <div className="flex items-center gap-3 mb-4">
        <ChartBarIcon className="w-7 h-7 text-sky-600 dark:text-sky-400" />
        <h2 className="text-xl font-bold text-slate-900 dark:text-white">ملخص إنجاز المؤشرات</h2>
      </div>
      <div className="relative h-64">
        <canvas ref={chartRef}></canvas>
      </div>
    </div>
  );
};

export default ProgressChart;
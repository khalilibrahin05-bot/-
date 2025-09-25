import React, { useState, useEffect } from 'react';
import { SparklesIcon, TargetIcon, ChartBarIcon, ClipboardListIcon } from './icons';

const navItems = [
  { id: 'ai-summary', title: 'الملخص الذكي', icon: SparklesIcon },
  { id: 'performance-plan', title: 'خطة الأداء', icon: TargetIcon },
  { id: 'progress-chart', title: 'ملخص الإنجاز', icon: ChartBarIcon },
  { id: 'indicator-checklist', title: 'قائمة المؤشرات', icon: ClipboardListIcon },
];

const SidebarNav: React.FC = () => {
  const [activeSection, setActiveSection] = useState<string>('');

  useEffect(() => {
    const sections = navItems.map(item => document.getElementById(item.id));

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      {
        rootMargin: '-20% 0px -70% 0px',
        threshold: 0,
      }
    );

    sections.forEach((section) => {
      if (section) {
        observer.observe(section);
      }
    });

    const visibleSections = sections.filter(section => {
        if (!section) return false;
        const rect = section.getBoundingClientRect();
        return rect.top >= 0 && rect.bottom <= window.innerHeight;
    });
    if (visibleSections.length > 0) {
        setActiveSection(visibleSections[0]!.id);
    } else if (sections[0]) {
        const rect = sections[0].getBoundingClientRect();
        if (rect.top < window.innerHeight && rect.bottom >= 0) {
            setActiveSection(sections[0].id);
        }
    }


    return () => {
      sections.forEach((section) => {
        if (section) {
          observer.unobserve(section);
        }
      });
    };
  }, []);

  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    document.getElementById(id)?.scrollIntoView({
      behavior: 'smooth',
      block: 'start',
    });
  };

  return (
    <nav className="p-4 bg-white dark:bg-slate-800 rounded-xl shadow-md border border-slate-200 dark:border-slate-700">
      <h2 className="text-lg font-bold text-slate-900 dark:text-white mb-4 px-2">التنقل السريع</h2>
      <ul>
        {navItems.map((item) => (
          <li key={item.id}>
            <a
              href={`#${item.id}`}
              onClick={(e) => handleLinkClick(e, item.id)}
              aria-current={activeSection === item.id ? 'page' : undefined}
              className={`flex items-center gap-3 px-4 py-3 my-1 rounded-lg transition-all duration-200 border-r-4 ${
                activeSection === item.id
                  ? 'bg-indigo-100 dark:bg-indigo-900/50 text-indigo-700 dark:text-indigo-300 font-semibold border-indigo-500'
                  : 'text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700/50 border-transparent'
              }`}
            >
              <item.icon className={`w-6 h-6 flex-shrink-0 ${activeSection === item.id ? 'text-indigo-600 dark:text-indigo-400' : 'text-slate-400'}`} />
              <span>{item.title}</span>
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default SidebarNav;

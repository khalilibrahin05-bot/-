import { IndicatorGroup, PlanItem } from './types';

export const INITIAL_INDICATOR_DATA: IndicatorGroup[] = [
  {
    category: 'اليومية',
    indicators: [
      { id: 1, text: 'متابعة تفعيل الواجبات والتكاليف والأنشطة في الدفاتر والكتب أثناء النزول الميداني', completed: false, category: 'متابعة ميدانية', notes: '' },
      { id: 2, text: 'متابعة تصحيح الدفاتر من قبل المعلمين أثناء النزول', completed: false, category: 'متابعة ميدانية', notes: '' },
      { id: 3, text: 'متابعة تختيم الإشراف الإداري على الدفاتر والكتب أثناء النزول', completed: false, category: 'متابعة ميدانية', notes: '' },
      { id: 4, text: 'متابعة تختيم الإشراف الإداري على دفاتر المتابعة', completed: false, category: 'متابعة ميدانية', notes: '' },
      { id: 5, text: 'تنفيذ البرامج العلاجية والإثرائية', completed: false, category: 'برامج ودعم', notes: '' },
      { id: 6, text: 'رفع التغذية الراجعة حول الزيارة للمشرف الأكاديمي إلى (المشرف التربوي- مشرف الدور- مدير الفرع)', completed: false, category: 'تقارير وتغذية راجعة', notes: '' },
    ],
  },
  {
    category: 'الأسبوعية',
    indicators: [
      { id: 7, text: 'متابعة أثر اطلاع المشرف التربوي على عينات من الدفاتر والكتب للثلاثة المستويات (ممتاز/جيد جداً/جيد)', completed: false, category: 'متابعة ميدانية', notes: '' },
      { id: 8, text: 'حضور اجتماعات الإشراف التربوي – اجتماعات الفرع (السبت الإشراف التربوي ١٢:٠٠)', completed: false, category: 'اجتماعات وتنسيق', notes: '' },
      { id: 9, text: 'متابعة التحضير الالكتروني بداية كل يوم', completed: false, category: 'متابعة ميدانية', notes: '' },
      { id: 10, text: 'رفع تقرير المتابعة لتفعيل الواجبات والتكاليف والأنشطة في الدفاتر والكتب', completed: false, category: 'تقارير وتغذية راجعة', notes: '' },
      { id: 11, text: 'رفع تقرير متابعة دفاتر من قبل المعلمين', completed: false, category: 'تقارير وتغذية راجعة', notes: '' },
      { id: 12, text: 'رفع تقرير اطلاع المشرف الإداري لدفاتر المتابعة ودفاتر وكتب الطلاب', completed: false, category: 'تقارير وتغذية راجعة', notes: '' },
      { id: 13, text: 'رفع تقرير حول مدى تفعيل البرامج العلاجية والإثرائية إن وجد', completed: false, category: 'برامج ودعم', notes: '' },
      { id: 14, text: 'رفع تقرير التغذية الراجعة حول الزيارة (المشرف الإداري/المشرف التربوي/الإدارة العامة)', completed: false, category: 'تقارير وتغذية راجعة', notes: '' },
    ],
  },
  {
    category: 'الشهرية',
    indicators: [
        { id: 15, text: 'استلام الاختبارات الكترونياً من المعلمين وتسلمها إلى الإشراف التربوي', completed: false, category: 'الاختبارات والتنسيق', notes: '' },
        { id: 16, text: 'تسليم الاختبارات لسكرتارية الفرع بعد التعديل', completed: false, category: 'الاختبارات والتنسيق', notes: '' },
        { id: 17, text: 'متابعة تعديل الاختبارات', completed: false, category: 'الاختبارات والتنسيق', notes: '' },
        { id: 18, text: 'التنسيق بين الفرعين', completed: false, category: 'اجتماعات وتنسيق', notes: '' },
        { id: 19, text: 'تحليل نتائج الاختبارات من النظام', completed: false, category: 'تحليل بيانات', notes: '' },
        { id: 20, text: 'متابعة ضعاف التحصيل', completed: false, category: 'برامج ودعم', notes: '' },
        { id: 21, text: 'متابعة البرامج النوعية (مسابقات منهجية/المتفوقين)', completed: false, category: 'برامج ودعم', notes: '' },
    ]
  },
  {
    category: 'الفصلية والسنوية',
    indicators: [
        { id: 22, text: 'رفع أسماء المتميزين من المعلمين والمشرفين الإداريين في المتابعة لأعمال المتعلمين للإدارة', completed: false, category: 'تقارير وتغذية راجعة', notes: '' },
        { id: 23, text: 'استلام الخطط الالكترونية من جميع المعلمين', completed: false, category: 'الخطط والبيانات', notes: '' },
        { id: 24, text: 'أرشف الخطط بحسب المادة لكل فصل دراسي', completed: false, category: 'الخطط والبيانات', notes: '' },
        { id: 25, text: 'إعداد خطة الإشراف الأكاديمي', completed: false, category: 'الخطط والبيانات', notes: '' },
        { id: 26, text: 'متابعة الروابط الالكترونية بالفرع', completed: false, category: 'الخطط والبيانات', notes: '' },
    ]
  }
];

export const PERFORMANCE_PLAN_DATA: PlanItem[] = [
  {
    field: 'العمليات الداخلية',
    objective: 'إعداد خطة الإشراف الأكاديمي',
    indicator: 'تم إعداد خطة الإشراف الأكاديمي لعدد (١) شبه ١٠٠٪',
    indicatorCount: 1,
    evidence: 'نسخة الخطة',
    activity: 'لقاء الإعداد',
    count: 1,
  },
  {
    field: 'العمليات الداخلية',
    objective: 'إعداد خطة الإشراف الأكاديمي',
    indicator: 'تم إعداد خطة الإشراف الأكاديمي لعدد (١) شبه ١٠٠٪',
    indicatorCount: 1,
    evidence: 'نسخة الخطة',
    activity: 'لقاءات المراجعة',
    count: 1,
  },
  {
    field: 'العمليات الداخلية',
    objective: 'إعداد خطة الإشراف الأكاديمي',
    indicator: 'تم إعداد ٧ تقارير شهرية',
    indicatorCount: 7,
    evidence: 'نسخة التقارير',
    activity: 'إعداد الخلاصات بداية كل شهر',
    count: 7,
  },
   {
    field: 'العمليات الداخلية',
    objective: 'إعداد خطة الإشراف الأكاديمي',
    indicator: 'تم إعداد ٧ تقارير شهرية',
    indicatorCount: 7,
    evidence: 'نسخة التقارير',
    activity: 'إعداد التقرير نهاية كل شهر وفصل للإدارة',
    count: 7,
  },
  {
    field: 'المعلمين والإشراف الإداري',
    objective: 'رفع مستوى الأداء للمعلمين والإشراف الإداري',
    indicator: 'تم إعداد ٢٦ تقرير أسبوعي شبه ١٠٠٪',
    indicatorCount: 26,
    evidence: 'نسخ التقارير',
    activity: 'إعداد التقرير الأسبوعي',
    count: 26,
  },
   {
    field: 'المعلمين والإشراف الإداري',
    objective: 'رفع مستوى الأداء للمعلمين والإشراف الإداري',
    indicator: 'تم إعداد ٢٦ تقرير أسبوعي شبه ١٠٠٪',
    indicatorCount: 26,
    evidence: 'نسخ التقارير',
    activity: 'الرفع للإدارة',
    count: 26,
  },
];

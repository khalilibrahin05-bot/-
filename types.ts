export interface Indicator {
  id: number;
  text: string;
  completed: boolean;
  category?: string;
}

export interface IndicatorGroup {
  category: string;
  indicators: Indicator[];
}

export interface PlanItem {
  field: string;
  objective: string;
  indicator: string;
  indicatorCount: number | string;
  evidence: string;
  activity: string;
  count: number | string;
}
export interface DashboardSummary {
  flowingWellCount: number;
  shutinWellCount: number;
  abandonedWellCount: number;
  producerWellCount: number;
  injectorWellCount: number;
  singleStringWellCount: number;
  dualStringWellCount: number;
  currentRate: number;
  currentRateDate: string;
  maxDailyRate: number;
  maxDailyRateDate: string;
  minDailyRate: number;
  minDailyRateDate: string;
  maxWellCurrentRate: number;
  wellWithMaxCurrentRate: string;
}

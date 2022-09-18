export interface WellSummary {
  wellId: number;
  name: string;
  status: string;
  type: string;
  stringType: string;
  lat?: number;
  lon?: number;
  minProdRate?: number;
  maxProdRate?: number;
  avgProdRate?: number;
  lastProdRate?: number;
  lastProdDate?: string;
  minWhPressure?: number;
  maxWhPressure?: number;
  avgWhPressure?: number;
  lastWhPressure?: number;
  lastWhPressureDate?: string;
  maxSchematicBottom?: number;
  lastNorth?: number;
  lastEast?: number;
  lastTvd?: number;
}

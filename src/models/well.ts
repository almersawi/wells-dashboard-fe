export enum WELL_STATUS {
  FLOWING = "Flowing",
  SHUTIN = "Shutin",
  ABANDONED = "Abandoned",
}

export enum WELL_TYPE {
  PRODUCER = "Producer",
  INJECTOR = "Injector",
}

export enum WELL_STRING_TYPE {
  SINGLE = "Single",
  DUAL = "Dual",
}

export interface Well {
  id: string;
  name: string;
  lat: number;
  lon: number;
  status: WELL_STATUS;
  chokeSize: number;
  type: WELL_TYPE;
  stringType: WELL_STRING_TYPE;
}

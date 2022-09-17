export enum WELL_SCHEMATIC_ITEM_TYPES {
  CASING = "Casing",
  TUBING = "Tubing",
  OPENHOLE = "Open Hole",
}

export interface WellSchematicItem {
  type: WELL_SCHEMATIC_ITEM_TYPES;
  top?: number;
  bottom?: number;
  depth?: number;
  cementTop?: number;
  ID?: number;
  OD: number;
  id: string;
}

export interface WellSchematicConfig {
  grid?: Partial<{
    x: number;
    y: number;
  }>;
  items: Array<WellSchematicItem>;
  width?: number;
  labels?: Partial<{
    enable: boolean;
    fontSize: number;
    width: number;
  }>;
  height?: number;
  pdf?: boolean;
}

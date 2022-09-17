import { WELL_SCHEMATIC_ITEM_TYPES } from "features/WellSchematic/models/well-schematic-config";

export interface Schematic {
  id: string;
  top: number;
  bottom: number;
  od: number;
  toc: number;
  type: WELL_SCHEMATIC_ITEM_TYPES;
  wellId: string;
}

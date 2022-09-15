import { VERG_FILTER_OPERATION } from "@verg/api-service";

export class Filters {
  static getWellIdFilter = (wellId: string) => ({
    filterCol: "well_id" as const,
    filterOp: VERG_FILTER_OPERATION.EQUAL,
    filterVal: wellId,
  });
}

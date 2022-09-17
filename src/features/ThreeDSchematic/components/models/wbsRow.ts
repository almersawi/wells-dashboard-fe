import { CementingLogEvaluation } from "../types/cementLogEvaluation";
import { WbsComponentType } from "../types/wbs-types";

export class WbsRow {
  constructor(
    public type: WbsComponentType,
    public top: number,
    public bottom: number,
    public od: number,
    public id: number,
    public _id: string,
    public text?: string,
    public includeInDrawing?: boolean,
    public color?: string,
    public tbgId?: string,
    public depth?: number,
    public testPass?: boolean | null,
    public open?: boolean,
    public csgId?: string,
    public evaluation?: CementingLogEvaluation,
    public hasCorrosion?: boolean
  ) {
    if (!color) {
      this.color = "#0a6b8f";
    }
  }
}

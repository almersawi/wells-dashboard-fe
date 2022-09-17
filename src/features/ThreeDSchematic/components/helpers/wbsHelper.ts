import { WbsRow } from "../models/wbsRow";
import { MainComponentTypes } from "../types/wbs-types";
import { _3dCurve } from "../types/_3dCurve";

export class WbsHelper {
  public casingArr: WbsRow[] = [];
  public tubingArr: WbsRow[] = [];

  public csgMinId: number = 7;
  public minDepth: number = 0;
  public maxDepth: number = 10000;
  public maxRadius: number = 20;

  constructor(public data: WbsRow[]) {
    this.casingArr = data.filter(
      (row) => row.type === MainComponentTypes.CASING
    );

    this.tubingArr = data.filter(
      (row) => row.type === MainComponentTypes.TUBING
    );

    this.csgMinId =
      this.casingArr.length == 0
        ? 7
        : Math.min(...this.casingArr.map((row) => row.id));
    this.maxRadius =
      this.casingArr.length == 0 ? 20 : Math.max(...data.map((row) => row.od));

    this.minDepth = Math.min(...data.map((x) => x.top));
    this.maxDepth = Math.max(...data.map((x) => x.bottom));
  }

  getMousePosition = (ev: any, canvasContainerRef: any) => {
    if (canvasContainerRef.current) {
      const rect = canvasContainerRef.current.getBoundingClientRect();
      const mouseX =
        ((ev.clientX - rect.left) / (rect.right - rect.left)) * 2 - 1;
      const mouseY =
        -((ev.clientY - rect.top) / (rect.bottom - rect.top)) * 2 + 1;
      return { mouseX, mouseY };
    } else {
      return { mouseX: 0, mouseY: 0 };
    }
  };

  getMaxOdAtDepth = (depth: number) => {
    // get max od at bottom
    const elementAtBottom = this.data.filter(
      (row) => depth >= row.top && depth <= row.bottom
    );
    const maxOd = Math.max(...elementAtBottom.map((row) => row.od));

    return maxOd !== Infinity && maxOd !== -Infinity ? maxOd : 20;
  };
}

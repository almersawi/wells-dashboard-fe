import {
  MeshBasicMaterial,
  MeshLambertMaterial,
  MeshPhongMaterial,
  MeshStandardMaterial,
} from "three";
import { WbsComponentType } from "../types/wbs-types";

export class PipeParams {
  constructor(
    public outerR: number,
    public innerR: number,
    public top: number,
    public bottom: number,
    public _id: string | undefined,
    public text?: string,
    public type?: WbsComponentType,
    public endAngle?: number,
    public material?:
      | MeshLambertMaterial
      | MeshStandardMaterial
      | MeshPhongMaterial
      | MeshBasicMaterial,
    public testPass?: boolean | null
  ) {}
}

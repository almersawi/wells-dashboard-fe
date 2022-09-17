import * as d3 from "d3";
import { compact } from "lodash";
import {
  WellSchematicItem,
  WELL_SCHEMATIC_ITEM_TYPES,
} from "../models/well-schematic-config";
import { HOLE_SIZE } from "../constants/design";

export const mineData = ({ items }: { items: Array<WellSchematicItem> }) => {
  const casingItems = items
    ?.filter((x) => x.type === WELL_SCHEMATIC_ITEM_TYPES.CASING)
    .sort((a, z) => a.bottom! - z.bottom!);

  const tubingItems = items
    ?.filter((x) => x.type === WELL_SCHEMATIC_ITEM_TYPES.TUBING)
    .sort((a, z) => a.bottom! - z.bottom!);

  const openholeItems = items
    ?.filter((x) => x.type === WELL_SCHEMATIC_ITEM_TYPES.OPENHOLE)
    .sort((a, z) => a.bottom! - z.bottom!);

  const maxDepth = Math.max(
    ...compact(
      items?.map((x) => {
        if (x.bottom) return x.bottom;
        if (x.depth) return x.depth;
        return undefined;
      })
    )
  );
  const maxOD = Math.max(...compact(items?.map((x) => x.OD)));
  const csgMinOd = Math.min(...compact(casingItems?.map((x) => x.OD)));
  const xAxisRangeTop =
    Math.ceil((HOLE_SIZE({ OD: maxOD }) ?? 36) / 10) * 10 ?? 25;
  const xAxisRange = [-xAxisRangeTop, xAxisRangeTop];

  return {
    casingItems,
    tubingItems,
    openholeItems,
    maxDepth: maxDepth ?? 1000,
    maxOD: maxOD ?? 30,
    xAxisRange,
    csgMinOd,
  };
};

export const clearContent = ({ id }: { id: string }) => {
  d3.selectAll(`#${id} > *`).remove();
};

export const clear = ({ element }: { element: SVGGElement }) => {
  d3.select(element).html("");
};

function randomIntFromInterval(min: number, max: number) {
  // min and max included
  return Math.random() * (max - min + 1) + min;
}

export const generateRandomXCurve = ({
  top,
  bottom,
  x,
  maxDepth,
  variation = 0.01,
}: {
  top: number;
  bottom: number;
  x: number;
  maxDepth: number;
  variation?: number;
}) => {
  const data = [];
  const noOfPoints = 100;
  const step = (maxDepth - top) / noOfPoints;
  for (let i = top; i < bottom; i += step) {
    const factor = randomIntFromInterval(-1, 1);
    data.push([x + factor * x * variation, i]);
  }
  data.push([x + randomIntFromInterval(-1, 1) * x * variation, bottom]);
  return data as [number, number][];
};

export const getPipesXtransitions = ({
  tubing,
  minDepth,
  csgMinOd,
}: {
  tubing: Array<WellSchematicItem>;
  minDepth: number;
  csgMinOd: number;
}) => {
  const transitions: { [tbgId: string]: number } = {}; // { [tbgId]: xTransition }
  // chech if there is just one tbg at the surface
  const tbgsAtSurface = tubing.filter((row) => row.top === minDepth);
  if (tbgsAtSurface.length === 1) {
    tubing.forEach((tbg) => {
      transitions[tbg.id] = 0;
    });

    return transitions;
  }

  if (tubing.length % 2 !== 0) {
    // odd number of pipes
    transitions[tubing[0]?.id as string] = 0;

    if (tubing.length > 1) {
      // and not even number of pipes (3, 5, 7, etc.)
      // calc in between spaces
      const inBetweenSpaces =
        (csgMinOd - tubing[0].OD * tubing.length) / (tubing.length + 1);
      // loop through odd indexes
      let iteration = 1;
      for (let i = 1; i < tubing.length; i += 2) {
        const xTrans =
          iteration * (tubing[0].OD + inBetweenSpaces * 2 + tubing[0].OD); // assuming each pipe with the same od
        transitions[tubing[i].id as string] = xTrans;
        transitions[tubing[i + 1].id as string] = -xTrans; // for the next pipe (aligns at the same distance from center but in the opposite direction)
        iteration++;
      }
    }
  } else {
    // even number of pipes
    // calc in between spaces
    const inBetweenSpaces =
      (csgMinOd - tubing[0]?.OD * tubing.length) / (tubing.length + 1);
    let iteration = 1;
    for (let i = 0; i < tubing.length; i += 2) {
      const xTrans = iteration * (inBetweenSpaces + tubing[0].OD); // assuming each pipe with the same od
      transitions[tubing[i].id as string] = xTrans;
      transitions[tubing[i + 1].id as string] = -xTrans; // for the next pipe (aligns at the same distance from center but in the opposite direction)
      iteration += 2;
    }
  }

  return transitions;
};

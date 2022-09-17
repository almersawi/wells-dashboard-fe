import React, { ReactNode, useContext, useMemo, useRef } from "react";
import * as d3 from "d3";
import { FontSize, Width } from "../../constants/design";
import { WellSchematicItem } from "../../models/well-schematic-config";
import XAxis from "../XAxis";
import YAxis from "../YAxis";
import { getPipesXtransitions, mineData } from "../../utils/ws-helper.util";
import Grid from "../Grid";

export type LinearScaleType = d3.ScaleLinear<number, number, never>;
type MarginType = Partial<{
  top: number;
  bottom: number;
  left: number;
  right: number;
}>;

type GridType = Partial<{ x: number; y: number }>;
type PlotlineType = d3.Line<[number, number]>;

type LabelsConfig = Partial<{
  enable: boolean;
  fontSize: number;
  width: number;
}>;

type WsContextProps = {
  xScale: LinearScaleType;
  yScale: LinearScaleType;
  casing: Array<WellSchematicItem>;
  tubing: Array<WellSchematicItem>;
  openhole: Array<WellSchematicItem>;
  margin: MarginType;
  sketchHeight: number;
  sketchWidth: number;
  grid: GridType;
  xTransitions: { [tbgId: string]: number };
  plotLine?: PlotlineType;
  maxDepth: number;
  labels: LabelsConfig;
  pdf?: boolean;
};

const defaultValues: WsContextProps = {
  casing: [],
  tubing: [],
  openhole: [],
  margin: {},
  sketchHeight: 0,
  sketchWidth: 0,
  grid: { x: 0, y: 0 },
  maxDepth: 0,
  labels: {},
  xScale: d3.scaleLinear(),
  yScale: d3.scaleLinear(),
  pdf: false,
  xTransitions: {},
};

export const WsContext = React.createContext<WsContextProps>(defaultValues);

export default function WellSketchProvider({
  children,
  width,
  height,
  items,
  grid,
  labels,
  pdf,
}: {
  children: ReactNode;
  width: number;
  height: number;
  items: Array<WellSchematicItem>;
  grid: GridType;
  labels?: LabelsConfig;
  pdf?: boolean;
}) {
  const containerRef = useRef<HTMLDivElement>(null);

  const margin = { top: 20, left: 50, right: 20, bottom: 10 };

  const minDepth = 0;
  const {
    maxDepth,
    xAxisRange,
    csgMinOd,
    tubingItems,
    casingItems,
    openholeItems,
  } = mineData({ items });
  const xTransitions = getPipesXtransitions({
    tubing: tubingItems,
    minDepth,
    csgMinOd,
  });

  const plotLine = d3
    .line()
    .y((d) => (yScale ? yScale(d[1]) : 0))
    .x((d) => (xScale ? xScale(d[0]) : 0));

  const labelsWidth = labels?.enable ? labels?.width ?? Width.labels : 0;

  const sketchHeight = height - (margin?.top ?? 0) - (margin?.bottom ?? 0);

  const sketchWidth = width - (margin?.left ?? 0) - (margin?.right ?? 0);

  const yScale = d3
    .scaleLinear()
    .domain([maxDepth * 1.02, minDepth - 100])
    .range([sketchHeight - 1, 0]);

  const xScale = d3
    .scaleLinear()
    .domain(xAxisRange)
    .range([0, sketchWidth - labelsWidth - 1]);

  const contextValue = useMemo(
    () => ({
      xScale,
      yScale,
      casing: casingItems,
      tubing: tubingItems,
      openhole: openholeItems,
      margin,
      sketchHeight,
      sketchWidth,
      grid,
      plotLine,
      maxDepth,
      labels: labels
        ? {
            ...labels,
            fontSize: labels?.fontSize ?? FontSize.labels,
            width: labelsWidth,
          }
        : { width: labelsWidth },
      pdf,
      xTransitions,
    }),
    [
      yScale,
      margin,
      sketchHeight,
      sketchWidth,
      grid,
      plotLine,
      maxDepth,
      labels,
      pdf,
      xTransitions,
      casingItems,
      tubingItems,
      openholeItems,
    ]
  );

  return (
    <WsContext.Provider value={contextValue}>
      <div
        ref={containerRef}
        style={{
          width,
          height,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <svg width="100%" height="100%">
          <g>
            {!pdf && (
              <defs>
                <clipPath id="svg-chart-clip">
                  <rect width={sketchWidth} height={sketchHeight} />
                </clipPath>
              </defs>
            )}
            <g
              clipPath="url(#svg-chart-clip)"
              width={sketchWidth}
              height={sketchHeight}
              transform={`translate(${margin?.left ?? 0}, ${margin?.top ?? 0})`}
            >
              <Grid />
              {children}
            </g>
            <XAxis />
            <YAxis />
          </g>
        </svg>
      </div>
    </WsContext.Provider>
  );
}

export function useWellSketchContext() {
  return useContext(WsContext);
}

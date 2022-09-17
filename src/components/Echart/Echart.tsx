import EchartsUtil from "utils/echarts.util";
import "echarts-gl";
import type {
  BarSeriesOption,
  CandlestickSeriesOption,
  GaugeSeriesOption,
  GraphSeriesOption,
  HeatmapSeriesOption,
  LineSeriesOption,
  PieSeriesOption,
  ScatterSeriesOption,
} from "echarts/charts";
import {
  BarChart,
  CandlestickChart,
  GaugeChart,
  GraphChart,
  HeatmapChart,
  LineChart,
  PieChart,
  ScatterChart,
} from "echarts/charts";
import type {
  GridComponentOption,
  MarkAreaComponentOption,
  MarkLineComponentOption,
  MarkPointComponentOption,
  TitleComponentOption,
  ToolboxComponentOption,
} from "echarts/components";
import {
  DataZoomComponent,
  GridComponent,
  LegendComponent,
  MarkAreaComponent,
  MarkLineComponent,
  MarkPointComponent,
  TitleComponent,
  ToolboxComponent,
  TooltipComponent,
  VisualMapComponent,
} from "echarts/components";
import type { ComposeOption, ECharts, SetOptionOpts } from "echarts/core";
import { getInstanceByDom, init, use } from "echarts/core";
import { CanvasRenderer } from "echarts/renderers";
import { ECBasicOption } from "echarts/types/dist/shared";
import { CSSProperties, useCallback, useEffect, useRef } from "react";
import { Spin } from "antd";

// Register the required components
use([
  GraphChart,
  LegendComponent,
  ScatterChart,
  LineChart,
  BarChart,
  CandlestickChart,
  GaugeChart,
  PieChart,
  HeatmapChart,
  GridComponent,
  TooltipComponent,
  TitleComponent,
  ToolboxComponent,
  DataZoomComponent,
  MarkAreaComponent,
  MarkPointComponent,
  MarkLineComponent,
  VisualMapComponent,
  CanvasRenderer,
]);

// Combine an Option type with only required components and charts via ComposeOption
export type EChartsOption = ComposeOption<
  | BarSeriesOption
  | CandlestickSeriesOption
  | LineSeriesOption
  | HeatmapSeriesOption
  | TitleComponentOption
  | GridComponentOption
  | GaugeSeriesOption
  | ScatterSeriesOption
  | PieSeriesOption
  | MarkAreaComponentOption
  | MarkPointComponentOption
  | MarkLineComponentOption
  | ToolboxComponentOption
  | GraphSeriesOption
>;

export interface ReactEChartsProps {
  option: EChartsOption | ECBasicOption;
  style?: CSSProperties;
  settings?: SetOptionOpts;
  loading?: boolean;
  onEvents?: Record<string, Function>;
  downsample?: DownsampleProps;
  disabledResize?: boolean;
}
export interface DownsampleProps {
  initialStartDate: string | number;
  initialEndDate: string | number;
  enable: boolean;
  noOfPoints: number;
  // seriesIndexForChecking: number;
  threshold: number;
  zoomEndHandeler: (zoomStartDate: Date, zoomEndDate: Date) => void;
  // dataTransform: (data: any, chart: ECharts | undefined) => void;
  // getData: (startDate: Date, endDate: Date, noOfPoints: number) => any;
}

function isFunction(v: any): boolean {
  return typeof v === "function";
}

function isString(v: any): boolean {
  return typeof v === "string";
}

export default function Echart({
  option,
  style,
  settings,
  loading,
  onEvents,
  downsample,
  disabledResize,
}: ReactEChartsProps): JSX.Element {
  const chartRef = useRef<HTMLDivElement>(null);

  const currentZoomStartDate = useRef(
    new Date(downsample?.initialStartDate ?? "")
  );
  const currentZoomEndDate = useRef(
    new Date(downsample?.initialStartDate ?? "")
  );

  const newDataNeeded = useCallback(
    (zoomStartDate: Date, zoomEndDate: Date) => {
      if (chartRef.current) {
        const chart = getInstanceByDom(chartRef?.current);
        const originalChartOptions = chart?.getOption();
        const option: EChartsOption = { ...originalChartOptions };
        const series = option?.series ?? [];
        let totalNumberOfPoints = 0;
        // get number of points in the current zoomed range
        for (let i = 0; i < (series as any[]).length; i++) {
          //@ts-ignore
          const { data } = series[i];
          totalNumberOfPoints +=
            data.filter(
              (x: any) =>
                x[0] >= zoomStartDate.getTime() && x[0] <= zoomEndDate.getTime()
            )?.length ?? 0;
        }

        // check if number of points is less than threshold * no of series
        if (
          totalNumberOfPoints <
          (downsample?.threshold ?? 0) *
            ((series as any[]).length ?? 0) *
            (downsample?.noOfPoints ?? 0)
        ) {
          return true;
        }

        // check if the current zoom start date is less than the initial start date or the current zoom end date is greater than the initial end date
        if (
          zoomStartDate.getTime() < currentZoomStartDate.current.getTime() ||
          zoomEndDate.getTime() > currentZoomEndDate.current.getTime()
        ) {
          return true;
        }
      }
      return false;
    },
    [
      currentZoomStartDate,
      currentZoomEndDate,
      downsample?.threshold,
      downsample?.noOfPoints,
    ]
  );

  const zoomHandeler = useCallback(
    async (param: any) => {
      if (!downsample?.enable) return;
      const { initialStartDate, initialEndDate, zoomEndHandeler } = downsample;
      const initialStartDateConverted = new Date(initialStartDate);
      const initialEndDateConverted = new Date(initialEndDate);
      const { start, end } = param;
      const dateDiff =
        initialEndDateConverted.getTime() - initialStartDateConverted.getTime();
      const startInc = start / 100;
      const endInc = 1 - end / 100;
      const zoomStartDate = new Date(
        initialStartDateConverted.getTime() + startInc * dateDiff
      );
      const zoomEndDate = new Date(
        initialEndDateConverted.getTime() - endInc * dateDiff
      );

      if (newDataNeeded(zoomStartDate, zoomEndDate)) {
        zoomEndHandeler(zoomStartDate, zoomEndDate);
        currentZoomStartDate.current = zoomStartDate;
        currentZoomEndDate.current = zoomEndDate;
      }
    },
    [downsample, newDataNeeded]
  );

  // bind the events
  const bindEvents = useCallback(
    (instance: any, events: Record<string, Function>) => {
      const _bindEvent = (eventName: string, func: Function) => {
        // ignore the event config which not satisfy
        if (isString(eventName) && isFunction(func)) {
          // binding event
          instance.on(eventName, (param: any) => {
            if (eventName === "dataZoom" && downsample?.enable)
              zoomHandeler(param);
            func(param, instance);
          });
        }
      };

      // loop and bind
      for (const eventName in events) {
        if (Object.prototype.hasOwnProperty.call(events, eventName)) {
          _bindEvent(eventName, events[eventName]);
        }
      }
    },
    [zoomHandeler, downsample?.enable]
  );

  useEffect(() => {
    // Initialize chart
    let chart: ECharts | undefined;
    if (chartRef.current !== null) {
      chart = init(chartRef.current, EchartsUtil.getTheme());
    }

    bindEvents(chart, onEvents ?? {});

    // Add chart resize listener
    // ResizeObserver is leading to a bit janky UX
    function resizeChart() {
      if (!disabledResize) {
        chart?.resize();
      }
    }
    window.addEventListener("resize", resizeChart);

    // Return cleanup function
    return () => {
      chart?.dispose();
      window.removeEventListener("resize", resizeChart);
    };
  }, [bindEvents, onEvents, disabledResize]);

  useEffect(() => {
    // Update chart
    if (chartRef.current !== null) {
      const chart = getInstanceByDom(chartRef.current);
      chart?.setOption(option, settings);
    }
  }, [option, settings]); // Whenever theme changes we need to add option and setting due to it being deleted in cleanup function

  return (
    <div className="relative h-full flex justify-center items-center">
      <div ref={chartRef} className="w-full h-full" style={{ ...style }} />
      {loading && (
        <div className="absolute top-0 w-full h-full bg-white flex items-center justify-center">
          <Spin />
        </div>
      )}
    </div>
  );
}

import hexToRgba from "hex-to-rgba";

export default class EchartsUtil {
  public static getTheme() {
    return {
      seriesCnt: "4",
      backgroundColor: "rgba(0,0,0,0)",
      titleColor: "#516b91",
      subtitleColor: "#93b7e3",
      textColorShow: false,
      textColor: "#333",
      markTextColor: "#eeeeee",
      color: ["#516b91", "#59c4e6", "#edafda", "#93b7e3", "#a5e7f0", "#cbb0e3"],
      borderColor: "#ccc",
      borderWidth: 0,
      visualMapColor: ["#516b91", "#59c4e6", "#a5e7f0"],
      legendTextColor: "#999999",
      kColor: "#edafda",
      kColor0: "transparent",
      kBorderColor: "#d680bc",
      kBorderColor0: "#8fd3e8",
      kBorderWidth: "2",
      lineWidth: "2",
      symbolSize: "6",
      symbol: "emptyCircle",
      symbolBorderWidth: "2",
      lineSmooth: true,
      graphLineWidth: 1,
      graphLineColor: "#aaaaaa",
      mapLabelColor: "#000",
      mapLabelColorE: "#516b91",
      mapBorderColor: "#516b91",
      mapBorderColorE: "#516b91",
      mapBorderWidth: 0.5,
      mapBorderWidthE: 1,
      mapAreaColor: "#f3f3f3",
      mapAreaColorE: "#a5e7f0",
      axes: [
        {
          type: "all",
          name: "通用坐标轴",
          axisLineShow: true,
          axisLineColor: "#cccccc",
          axisTickShow: false,
          axisTickColor: "#333",
          axisLabelShow: true,
          axisLabelColor: "#999999",
          splitLineShow: true,
          splitLineColor: ["#eeeeee"],
          splitAreaShow: false,
          splitAreaColor: ["rgba(250,250,250,0.05)", "rgba(200,200,200,0.02)"],
        },
        {
          type: "category",
          name: "类目坐标轴",
          axisLineShow: true,
          axisLineColor: "#333",
          axisTickShow: true,
          axisTickColor: "#333",
          axisLabelShow: true,
          axisLabelColor: "#333",
          splitLineShow: false,
          splitLineColor: ["#ccc"],
          splitAreaShow: false,
          splitAreaColor: ["rgba(250,250,250,0.3)", "rgba(200,200,200,0.3)"],
        },
        {
          type: "value",
          name: "数值坐标轴",
          axisLineShow: true,
          axisLineColor: "#333",
          axisTickShow: true,
          axisTickColor: "#333",
          axisLabelShow: true,
          axisLabelColor: "#333",
          splitLineShow: true,
          splitLineColor: ["#ccc"],
          splitAreaShow: false,
          splitAreaColor: ["rgba(250,250,250,0.3)", "rgba(200,200,200,0.3)"],
        },
        {
          type: "log",
          name: "对数坐标轴",
          axisLineShow: true,
          axisLineColor: "#333",
          axisTickShow: true,
          axisTickColor: "#333",
          axisLabelShow: true,
          axisLabelColor: "#333",
          splitLineShow: true,
          splitLineColor: ["#ccc"],
          splitAreaShow: false,
          splitAreaColor: ["rgba(250,250,250,0.3)", "rgba(200,200,200,0.3)"],
        },
        {
          type: "time",
          name: "时间坐标轴",
          axisLineShow: true,
          axisLineColor: "#333",
          axisTickShow: true,
          axisTickColor: "#333",
          axisLabelShow: true,
          axisLabelColor: "#333",
          splitLineShow: true,
          splitLineColor: ["#ccc"],
          splitAreaShow: false,
          splitAreaColor: ["rgba(250,250,250,0.3)", "rgba(200,200,200,0.3)"],
        },
      ],
      axisSeperateSetting: false,
      toolboxColor: "#999999",
      toolboxEmphasisColor: "#666666",
      tooltipAxisColor: "#cccccc",
      tooltipAxisWidth: 1,
      timelineLineColor: "#8fd3e8",
      timelineLineWidth: 1,
      timelineItemColor: "#8fd3e8",
      timelineItemColorE: "#8fd3e8",
      timelineCheckColor: "#8fd3e8",
      timelineCheckBorderColor: "#8a7ca8",
      timelineItemBorderWidth: 1,
      timelineControlColor: "#8fd3e8",
      timelineControlBorderColor: "#8fd3e8",
      timelineControlBorderWidth: 0.5,
      timelineLabelColor: "#8fd3e8",
      datazoomBackgroundColor: "rgba(0,0,0,0)",
      datazoomDataColor: "rgba(255,255,255,0.3)",
      datazoomFillColor: "rgba(167,183,204,0.4)",
      datazoomHandleColor: "#a7b7cc",
      datazoomHandleWidth: "100",
      datazoomLabelColor: "#333",
    };
  }

  public static getColors() {
    return this.getTheme().color;
  }

  public static getColor(colorIndex: number) {
    return this.getColors()?.[colorIndex];
  }

  public static DEFAULT_ECHARTS_COLORS = [
    "#7cb5ec",
    "#434348",
    "#f7a35c",
    "#8085e9",
    "#2b908f",
    "#91e8e1",
  ];

  public static ECHARTS_CONFIG = {
    dataZoom: [
      {
        type: "inside",
        start: 0,
        end: 100,
      },
      {
        start: 0,
        end: 10,
      },
    ],
    grid: { top: 50, right: 8, bottom: 80, left: 80 },
    legend: {
      top: 0,
      show: true,
    },
    style: { height: "100%" },
    tooltip: {
      trigger: "axis",
    },
  };

  public static colorSpan(color: string) {
    return (
      '<span style="display:inline-block;margin-right:4px;border-radius:10px;width:10px;height:10px;background-color:' +
      color +
      ';"></span>'
    );
  }

  public static getLineSeries({
    data,
    name,
    index,
    area = true,
  }: {
    name: string;
    data: any;
    index: number;
    area?: boolean;
  }) {
    return {
      areaStyle: area ? this.getAreaStyle(index) : undefined,
      connectNulls: true,
      data,
      name,
      showSymbol: false,
      smooth: true,
      type: "line" as "line",
      color: this.DEFAULT_ECHARTS_COLORS[index],
    };
  }

  public static getPieSeries({
    name,
    value,
    index,
  }: {
    name: string;
    value: number;
    index: number;
  }) {
    const color = this.DEFAULT_ECHARTS_COLORS?.[index];

    return {
      name,
      value,
      itemStyle: { color },
    };
  }

  public static getAreaStyle(index: number) {
    const color = this.DEFAULT_ECHARTS_COLORS?.[index];

    return {
      color: {
        type: "linear",
        x: 0,
        y: 0,
        x2: 0,
        y2: 1,
        global: false,
        colorStops: [
          {
            offset: 0,
            color: hexToRgba(color, 1),
          },
          {
            offset: 0.5,
            color: hexToRgba(color, 0.5),
          },
          {
            offset: 1,
            color: hexToRgba(color, 0),
          },
        ],
      },
    };
  }

  public static getStackedBarSeries(
    series: Array<{ name: string; data: Array<any> }>
  ) {
    return series?.map(({ name, data }, index) => ({
      name,
      type: "bar",
      stack: "total",
      label: {
        show: true,
        formatter: (params: any) => (params?.value === 0 ? "" : params?.value),
        color: "white",
      },
      emphasis: {
        focus: "series",
      },
      itemStyle: {
        color: this.DEFAULT_ECHARTS_COLORS[index],
        borderRadius: 4,
      },
      data,
    }));
  }

  public static dateToZoomLimit(
    start: number,
    end: number,
    date: number,
    maxLimit: number = 100
  ): number {
    const dateLimit = (date - start) / (end - start);
    return dateLimit * maxLimit;
  }

  public static getZoomParams(
    initialStartDates: (string | undefined)[],
    initialEndDates: (string | undefined)[],
    zoomStartDate: Date | undefined,
    zoomEndDate: Date | undefined
  ) {
    const startDate = Math.min(
      ...initialStartDates?.map((date) => new Date(date ?? "").getTime())
    );
    const endDate = Math.max(
      ...initialEndDates?.map((date) => new Date(date ?? "").getTime())
    );
    const zoomStartDateIndex = this.dateToZoomLimit(
      startDate,
      endDate,
      zoomStartDate?.getTime() ?? startDate
    );
    const zoomEndDateIndex = this.dateToZoomLimit(
      startDate,
      endDate,
      zoomEndDate?.getTime() ?? endDate
    );

    return { startDate, endDate, zoomStartDateIndex, zoomEndDateIndex };
  }
}

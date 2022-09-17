import { Card } from "antd";
import Echart from "components/Echart";
import { useProductionData } from "hooks/queries/useProductionData.query";
import EchartsUtil from "utils/echarts.util";

export default function ProductionDataPlot() {
  const {
    data: { data },
    isLoading,
  } = useProductionData();
  const color = "#34A853";
  return (
    <Card loading={isLoading}>
      <Echart
        option={{
          color,
          grid: EchartsUtil.ECHARTS_CONFIG.grid,
          dataZoom: EchartsUtil.ECHARTS_CONFIG.dataZoom,
          legend: EchartsUtil.ECHARTS_CONFIG.legend,
          tooltip: EchartsUtil.ECHARTS_CONFIG.tooltip,
          xAxis: {
            type: "time",
            name: "Date",
          },
          yAxis: {
            type: "value",
            name: "Rate (bbl/day)",
            nameGap: 40,
            nameLocation: "middle",
          },
          series: [
            {
              type: "line",
              data: data?.map((x) => [x.date, x.rate]),
              lineStyle: {
                color,
              },
              areaStyle: {
                color,
                opacity: 0.2,
              },
            },
          ],
        }}
      />
    </Card>
  );
}

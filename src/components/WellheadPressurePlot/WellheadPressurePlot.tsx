import { Card } from "antd";
import Echart from "components/Echart";
import { useProductionData } from "hooks/queries/useProductionData.query";
import EchartsUtil from "utils/echarts.util";

export default function WellheadPressurePlot() {
  const {
    data: { data },
    isLoading,
  } = useProductionData();
  const color = "#FF9900";
  return (
    <Card loading={isLoading}>
      <Echart
        option={{
          grid: EchartsUtil.ECHARTS_CONFIG.grid,
          dataZoom: EchartsUtil.ECHARTS_CONFIG.dataZoom,
          legend: EchartsUtil.ECHARTS_CONFIG.legend,
          tooltip: EchartsUtil.ECHARTS_CONFIG.tooltip,
          color,
          xAxis: {
            type: "time",
            name: "Date",
          },
          yAxis: {
            type: "value",
            name: "Wellhead Pressure (psi)",
            nameGap: 40,
            nameLocation: "middle",
          },
          series: [
            {
              type: "line",
              data: data?.map((x) => [x.date, x.wellheadPressure]),
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

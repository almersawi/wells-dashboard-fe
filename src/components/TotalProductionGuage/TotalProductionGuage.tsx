import { Card } from "antd";
import Echart from "components/Echart";
import { DashboardSummary } from "models/dashboard-summary";
import IF from "UI/IF";
import NoData from "UI/NoData";

type Props = {
  summary: DashboardSummary;
};

export default function TotalProductionGuage({ summary }: Props) {
  return (
    <Card>
      <IF
        condition={
          summary?.currentRate != null &&
          summary?.minDailyRate != undefined &&
          summary?.maxDailyRate != undefined
        }
        trueComponent={
          <Echart
            option={{
              series: [
                {
                  name: "Production Rate",
                  type: "gauge",
                  radius: "120%",
                  center: ["50%", "65%"],
                  startAngle: 200,
                  endAngle: -20,
                  itemStyle: {
                    color: "#34A853",
                  },
                  progress: {
                    show: true,
                    width: 6,
                  },
                  detail: {
                    valueAnimation: true,
                    width: "60%",
                    lineHeight: 40,
                    borderRadius: 8,
                    fontSize: 15,
                    fontWeight: "bolder",
                    formatter: "{value} (bbl/day)",
                    color: "auto",
                  },
                  min: summary?.minDailyRate ?? 0,
                  max: summary?.maxDailyRate ?? 100,
                  data: [
                    {
                      value: summary?.currentRate,
                      name: "Current Production Rate",
                    },
                  ],
                  axisLine: {
                    lineStyle: {
                      width: 6,
                    },
                  },
                  splitLine: {
                    distance: -3,
                    length: 15,
                    lineStyle: {
                      width: 2,
                      color: "#999",
                    },
                  },
                  axisTick: {
                    distance: 0,
                    lineStyle: {
                      width: 2,
                      color: "#999",
                    },
                  },
                  axisLabel: {
                    distance: 10,
                    fontSize: 12,
                    color: "#000",
                    formatter(value) {
                      if (value === summary?.minDailyRate) {
                        return `${value} (Min)`;
                      } else if (value === summary?.maxDailyRate) {
                        return `${value} (Max)`;
                      }
                      return `${value}`;
                    },
                  },
                  title: {
                    fontSize: 12,
                  },
                  anchor: {
                    show: true,
                  },
                },
              ],
            }}
          />
        }
        falseComponent={<NoData />}
      />
    </Card>
  );
}

import { Card } from "antd";
import Echart from "components/Echart";
import { WellSummary } from "models/well-summary";
import IF from "UI/IF";
import NoData from "UI/NoData";

type Props = {
  wellSummary: WellSummary;
};

export default function ProductionGuage({ wellSummary }: Props) {
  return (
    <Card>
      <IF
        condition={
          wellSummary?.lastProdRate != null &&
          wellSummary?.lastProdRate != undefined
        }
        trueComponent={
          <Echart
            option={{
              series: [
                {
                  name: "Production Rate",
                  type: "gauge",
                  radius: "130%",
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
                  min: wellSummary?.minProdRate ?? 0,
                  max: wellSummary?.maxProdRate ?? 100,
                  data: [
                    {
                      value: wellSummary?.lastProdRate,
                      name: "Latest Production Rate",
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
                      if (value === wellSummary?.minProdRate) {
                          return `${value} (Min)`
                      } else if (value === wellSummary?.maxProdRate) {
                        return `${value} (Max)`
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

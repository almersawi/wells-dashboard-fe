import { Card } from "antd";
import Echart from "components/Echart";
import { WellSummary } from "models/well-summary";
import IF from "UI/IF";
import NoData from "UI/NoData";

type Props = {
  wellSummary: WellSummary;
};

export default function WellheadPressureGuage({ wellSummary }: Props) {
  return (
    <Card>
      <IF
        condition={
          wellSummary?.lastWhPressure != null &&
          wellSummary?.lastWhPressure != undefined
        }
        trueComponent={
          <Echart
            option={{
              series: [
                {
                  name: "Wellhead Pressure",
                  type: "gauge",
                  radius: "130%",
                  center: ["50%", "65%"],
                  startAngle: 200,
                  endAngle: -20,
                  itemStyle: {
                    color: "#FF9900",
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
                    formatter: "{value} (psi)",
                    color: "auto",
                  },
                  min: wellSummary?.minWhPressure ?? 0,
                  max: wellSummary?.maxWhPressure ?? 100,
                  data: [
                    {
                      value: wellSummary?.lastWhPressure,
                      name: "Latest Wellhead Pressure",
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
                      if (value === wellSummary?.minWhPressure) {
                        return `${value} (Min)`;
                      } else if (value === wellSummary?.maxWhPressure) {
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

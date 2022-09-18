import Echart from "components/Echart";
import React from "react";

type Props = {
  data: Array<{ name: string; value: number }>;
  color: Array<string>;
  title: string;
};

export default function PieChart({ data, color, title }: Props) {
  return (
    <Echart
      option={{
        title: {
          text: title,
          left: "center",
        },
        legend: {
          orient: "vertical",
          left: "left",
          top: "10%",
        },
        series: [
          {
            type: "pie",
            avoidLabelOverlap: false,
            data,
            top: "3%",
            itemStyle: {
              borderRadius: 10,
              borderColor: "#fff",
              borderWidth: 2,
            },
            label: {
              formatter: "{label|{c}}",
              rich: {
                label: {
                  fontSize: 14,
                  color: "#999",
                },
              },
            },
            color,
          },
        ],
      }}
    />
  );
}

import { Card } from "antd";
import Echart from "components/Echart";
import { useTrajectoryData } from "hooks/queries/trajectory.query";
import IF from "UI/IF";
import NoData from "UI/NoData";

export default function TrajectoryChart() {
  const {
    data: { data },
    isLoading,
  } = useTrajectoryData();
  const series = [
    {
      type: "line3D",
      data: data?.map((x) => [x.east, x.north, -x.tvd]),
      lineStyle: {
        width: 3,
      },
    },
  ];

  return (
    <Card>
      <IF
        condition={data?.length > 0}
        trueComponent={
          <div className="h-[calc(100%-20px)]">
            <Echart
              loading={isLoading}
              option={{
                tooltip: {},
                xAxis3D: {
                  type: "value",
                  name: "East",
                },
                animation: false,
                legend: {
                  orient: "vertical",
                  right: 10,
                  top: 10,
                },
                yAxis3D: {
                  type: "value",
                  name: "North",
                },
                zAxis3D: {
                  type: "value",
                  name: "TVD",
                  max: 0,
                },
                series,
                grid3D: {
                  viewControl: {
                    projection: "orthographic",
                  },
                  boxHeight: 120,
                  boxWidth: 60,
                  boxDepth: 60,
                  splitArea: {
                    show: true,
                    areaStyle: {
                      color: ["rgba(250,250,250,0.5)", "rgba(200,200,200,0.3)"],
                    },
                  },
                  axisTick: {
                    length: 3,
                    lineStyle: {
                      opacity: 0.5,
                    },
                  },
                  splitLine: {
                    show: true,
                    lineStyle: {
                      opacity: 0.8,
                    },
                  },
                },
              }}
            />
          </div>
        }
        falseComponent={<NoData />}
      />
    </Card>
  );
}

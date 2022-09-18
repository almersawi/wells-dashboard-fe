import { Card } from "antd";
import PieChart from "components/PieChart";
import { DashboardSummary } from "models/dashboard-summary";
import { WELL_STATUS } from "models/well";

type Props = {
  summary: DashboardSummary;
};

export default function WellStatusPieChart({ summary }: Props) {
  const data = [
    {
      name: WELL_STATUS.FLOWING,
      value: summary?.flowingWellCount ?? 0,
    },
    {
      name: WELL_STATUS.SHUTIN,
      value: summary?.shutinWellCount ?? 0,
    },
    {
      name: WELL_STATUS.ABANDONED,
      value: summary?.abandonedWellCount ?? 0,
    },
  ];

  const color = ["#34A853", "#EA4335", "#66757F"];

  return (
    <Card>
      <PieChart data={data} color={color} title="Well Status" />
    </Card>
  );
}

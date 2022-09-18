import { Card } from "antd";
import PieChart from "components/PieChart";
import { DashboardSummary } from "models/dashboard-summary";
import { WELL_STRING_TYPE } from "models/well";

type Props = {
  summary: DashboardSummary;
};

export default function StringTypePieChart({ summary }: Props) {
  const data = [
    {
      name: WELL_STRING_TYPE.SINGLE,
      value: summary?.singleStringWellCount ?? 0,
    },
    {
      name: WELL_STRING_TYPE.DUAL,
      value: summary?.dualStringWellCount ?? 0,
    },
  ];

  const color: string[] = [];

  return (
    <Card>
      <PieChart data={data} color={color} title="String Type" />
    </Card>
  );
}

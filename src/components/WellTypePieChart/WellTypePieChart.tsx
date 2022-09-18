import { Card } from "antd";
import PieChart from "components/PieChart";
import { DashboardSummary } from "models/dashboard-summary";
import { WELL_TYPE } from "models/well";
import React from "react";

type Props = {
  summary: DashboardSummary;
};

export default function WellTypePieChart({ summary }: Props) {
  const data = [
    {
      name: WELL_TYPE.INJECTOR,
      value: summary?.injectorWellCount ?? 0,
    },
    {
      name: WELL_TYPE.PRODUCER,
      value: summary?.producerWellCount ?? 0,
    },
  ];

  const color = ["#A4C639", "#34A853"];
  return (
    <Card>
      <PieChart data={data} color={color} title="Well Type"/>
    </Card>
  );
}

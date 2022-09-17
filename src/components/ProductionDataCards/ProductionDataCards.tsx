import StatisticsCard from "components/StatisticsCard";
import { WellSummary } from "models/well-summary";
import React from "react";

type Props = {
  wellSummary: WellSummary;
};

export default function ProductionDataCards({ wellSummary }: Props) {
  return (
    <div className="flex h-[100px] w-full gap-4 mb-2">
      <StatisticsCard
        title="Current Production Rate"
        value={wellSummary?.lastProdRate}
        additionalText={
          wellSummary?.lastProdDate
            ? `on ${new Date(wellSummary?.lastProdDate).toLocaleDateString()}`
            : undefined
        }
        unit="bbl/day"
        color="#036"
      />
      <StatisticsCard
        title="Max Production Rate"
        value={wellSummary?.maxProdRate}
        unit="bbl/day"
        color="#34A853"
      />
      <StatisticsCard
        title="Avg Production Rate"
        value={wellSummary?.avgProdRate}
        unit="bbl/day"
        color="#FBBC05"
      />
      <StatisticsCard
        title="Min Production Rate"
        value={wellSummary?.minProdRate}
        unit="bbl/day"
        color="#EA4335"
      />
    </div>
  );
}

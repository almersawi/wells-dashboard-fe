import StatisticsCard from "components/StatisticsCard";
import { WellSummary } from "models/well-summary";
import React from "react";

type Props = {
  wellSummary: WellSummary;
};

export default function WellheadDataCards({ wellSummary }: Props) {
  return (
    <div className="flex h-full w-full gap-4">
      <StatisticsCard
        title="Current Wellhead Pressure"
        value={wellSummary?.lastWhPressure}
        additionalText={
          wellSummary?.lastWhPressureDate
            ? `on ${new Date(
                wellSummary?.lastWhPressureDate
              ).toLocaleDateString()}`
            : undefined
        }
        unit="psi"
        color="#036"
      />
      <StatisticsCard
        title="Max Wellhead Pressure"
        value={wellSummary?.maxWhPressure}
        unit="psi"
        color="#34A853"
      />
      <StatisticsCard
        title="Avg Wellhead Pressure"
        value={wellSummary?.avgWhPressure}
        unit="psi"
        color="#FBBC05"
      />
      <StatisticsCard
        title="Min Wellhead Pressure"
        value={wellSummary?.minWhPressure}
        unit="psi"
        color="#EA4335"
      />
    </div>
  );
}

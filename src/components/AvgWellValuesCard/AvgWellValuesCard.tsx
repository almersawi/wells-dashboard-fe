import StatisticsCard from "components/StatisticsCard";
import { WellSummary } from "models/well-summary";
import IF from "UI/IF";

type Props = {
  wellSummary: WellSummary;
};

export default function AvgWellValuesCard({ wellSummary }: Props) {
  const avgProductionRate = wellSummary?.avgProdRate;
  const lastProdDate = wellSummary?.lastProdDate
    ? new Date(wellSummary?.lastProdDate).toLocaleDateString()
    : undefined;
  const avgWhPressure = wellSummary?.avgWhPressure;
  const lastWhDate = wellSummary?.lastWhPressureDate
    ? new Date(wellSummary?.lastWhPressureDate).toLocaleDateString()
    : undefined;
  return (
    <div className="flex flex-col h-full">
      <div className="w-full mb-4 h-[50%]">
        <StatisticsCard
          title="Avg. Production Rate"
          value={avgProductionRate}
          color="#34A853"
          unit="bbl/day"
          additionalText={lastProdDate ? `Last valid date: ${lastProdDate}` : ''}
        />
      </div>
      <div className="w-full h-[50%]">
        <StatisticsCard
          title="Avg. Production Rate"
          value={avgWhPressure}
          color="#FF9900"
          unit="psi"
          additionalText={lastWhDate ? `Last valid date: ${lastWhDate}` : ''}
        />
      </div>
    </div>
  );
}

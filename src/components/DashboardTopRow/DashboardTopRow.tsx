import StatisticsCard from "components/StatisticsCard";
import { DashboardSummary } from "models/dashboard-summary";

type Props = {
  summary: DashboardSummary;
};

export default function DashboardTopRow({ summary }: Props) {
  return (
    <div className="flex gap-4 h-full w-full">
      <StatisticsCard
        title="Well Max Current Rate"
        value={summary?.maxWellCurrentRate}
        unit="bbl/day"
        color="#34A853"
        additionalText={
          summary?.wellWithMaxCurrentRate
            ? `For well: ${summary?.wellWithMaxCurrentRate}`
            : ""
        }
      />
      <StatisticsCard
        title="Max Daily Rate"
        value={summary?.maxDailyRate}
        unit="bbl/day"
        color="#34A853"
        additionalText={
          summary?.maxDailyRateDate
            ? `Happend on: ${summary?.maxDailyRateDate}`
            : ""
        }
      />
      <StatisticsCard
        title="Min Daily Rate"
        value={summary?.minDailyRate}
        unit="bbl/day"
        color="#34A853"
        additionalText={
          summary?.minDailyRateDate
            ? `Happend on: ${summary?.minDailyRateDate}`
            : ""
        }
      />
      <StatisticsCard
        title="Last Valid Production Data"
        value={summary?.currentRateDate}
        color="#34A853"
      />
    </div>
  );
}

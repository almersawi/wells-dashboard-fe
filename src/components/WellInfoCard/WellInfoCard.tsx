import { round } from "lodash";
import { WellSummary } from "models/well-summary";

type Props = {
  wellSummary: WellSummary;
};

export default function WellInfoCard({ wellSummary }: Props) {
  const color = "#036";
  return (
    <div
      className="flex flex-col w-full shadow-sm rounded-md p-4 justify-between border-4 border-solid border-y-0 border-r-0 bg-white h-full"
      style={{ borderColor: color }}
    >
      <div>
        <div className="text-lg font-bold" style={{ color }}>
          Name
        </div>
        <div className="text-base">{wellSummary?.name}</div>
      </div>
      <div>
        <div className="text-lg font-bold" style={{ color }}>
          Type
        </div>
        <div className="text-base">{wellSummary?.type}</div>
      </div>
      <div>
        <div className="text-lg font-bold" style={{ color }}>
          Status
        </div>
        <div className="text-base">{wellSummary?.status}</div>
      </div>
      <div>
        <div className="text-lg font-bold" style={{ color }}>
          String Type
        </div>
        <div className="text-base">{wellSummary?.stringType}</div>
      </div>
      <div>
        <div className="text-lg font-bold" style={{ color }}>
          Location
        </div>
        <div className="text-base">
          Lat: {round(wellSummary?.lat!, 4)} - Lon:{" "}
          {round(wellSummary?.lat!, 4)}
        </div>
      </div>
    </div>
  );
}

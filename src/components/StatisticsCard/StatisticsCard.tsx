import { round } from "lodash";
import IF from "UI/IF";

type Props = {
  title: string;
  value?: number;
  color: string;
  unit?: string;
  additionalText?: string;
};

export default function StatisticsCard({
  title,
  value,
  color,
  unit,
  additionalText,
}: Props) {
  return (
    <div
      className="flex flex-col w-full shadow-sm rounded-md p-4 gap-4 border-4 border-solid border-y-0 border-r-0 bg-white h-full"
      style={{ borderColor: color }}
    >
      <div className="text-lg font-bold" style={{ color }}>
        {title}
      </div>
      <div className="text-base">
        <strong>
          {value != null && value != undefined ? round(value, 2) : "No Data"}
        </strong>{" "}
        <span className="text-sm">
          {unit && value !== null && value !== undefined ? `(${unit})` : ""}
        </span>
      </div>
      <IF
        condition={!!additionalText}
        trueComponent={<div className="text-sm">{additionalText}</div>}
      />
    </div>
  );
}

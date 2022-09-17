import { useWellSketchContext } from "../WsProvider/WsProvider";

type Props = {
  color?: string;
  strokeWidth?: number;
  x1: number;
  x2: number;
  y1: number;
  y2: number;
};

export default function Line({
  color = "#333",
  strokeWidth = 1,
  x1,
  x2,
  y1,
  y2,
}: Props) {
  const { yScale, xScale } = useWellSketchContext();
  return (
    <line
      x1={xScale(x1)}
      x2={xScale(x2)}
      y1={yScale(y1)}
      y2={yScale(y2)}
      style={{ stroke: color, strokeWidth }}
    />
  );
}

import { useWellSketchContext } from "../WsProvider/WsProvider";
import { Colors, Strokes } from "../../constants/design";
import Label from "../Label";
import Line from "../Line";

type Props = {
  top: number;
  bottom: number;
  OD: number;
  id: string;
};

export default function Casing({ top, bottom, OD, id }: Props) {
  const { xScale, yScale } = useWellSketchContext();

  const triangleLength = Strokes.casingShoeTringle;
  const factor = (left?: boolean) => (left ? -1 : 1);

  const shoePath = (left?: boolean) => {
    return `M${xScale(OD * factor(left))},${
      yScale(bottom) - triangleLength
    }L${xScale(OD * factor(left))},${yScale(bottom)}L${
      xScale(OD * factor(left)) + triangleLength * factor(left)
    },${yScale(bottom)}L${xScale(OD * factor(left))},${
      yScale(bottom) - triangleLength
    }`;
  };

  return (
    <>
      <g>
        <path d={shoePath()} fill={Colors.casingLine} />
        <path d={shoePath(true)} fill={Colors.casingLine} />
      </g>
      <Line
        color={Colors.casingLine}
        strokeWidth={Strokes.casingLine}
        x1={OD}
        x2={OD}
        y1={top}
        y2={bottom}
      />
      <Line
        color={Colors.casingLine}
        strokeWidth={Strokes.casingLine}
        x1={-OD}
        x2={-OD}
        y1={top}
        y2={bottom}
      />
      <Label
        lines={[{ text: `OD: ${OD}` }, { text: `@ ${bottom}` }]}
        depth={bottom}
        id={id}
      />
    </>
  );
}

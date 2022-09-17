import { Colors, Strokes } from "../../constants/design";
import Line from "../Line";
import { useWellSketchContext } from "../WsProvider/WsProvider";

type Props = {
  top: number;
  bottom: number;
  OD: number;
  id: string;
};

export default function Tubing({ top, bottom, OD, id }: Props) {
  const { xTransitions, plotLine } = useWellSketchContext();
  const tubingXTransition = xTransitions[id];
  const rightOD = OD + tubingXTransition;
  const leftOD = -(OD - tubingXTransition);

  return (
    <g>
      <g>
        <path
          d={
            plotLine
              ? (plotLine([
                  [leftOD, top],
                  [rightOD, top],
                  [rightOD, bottom],
                  [leftOD, bottom],
                  [leftOD, top],
                ]) as string)
              : ""
          }
          fill={Colors.tubingFill}
        />
      </g>
      <Line
        color={Colors.tubingLine}
        strokeWidth={Strokes.tubingLine}
        x1={rightOD}
        x2={rightOD}
        y1={top}
        y2={bottom}
      />
      <Line
        color={Colors.tubingLine}
        strokeWidth={Strokes.tubingLine}
        x1={leftOD}
        x2={leftOD}
        y1={top}
        y2={bottom}
      />
    </g>
  );
}

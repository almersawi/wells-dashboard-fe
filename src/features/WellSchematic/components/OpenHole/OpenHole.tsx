import { Colors, HOLE_SIZE, Strokes } from "../../constants/design";
import { useWellSketchContext } from "../WsProvider/WsProvider";
import { generateRandomXCurve } from "../../utils/ws-helper.util";
import Label from "../Label";

type Props = {
  top: number;
  bottom: number;
  OD: number;
  index: number;
  cement?: {
    top?: number;
    prevItemBottom?: number;
    prevItemOD?: number;
  };
  id: string;
  withCasing?: boolean;
};

export default function OpenHole({
  index,
  bottom,
  OD,
  top,
  cement,
  id,
  withCasing,
}: Props) {
  const { plotLine, maxDepth, sketchWidth, yScale, pdf } =
    useWellSketchContext();
  const cementId = `cement_${index}`;
  const cementClipPathId = `${cementId}_clip_path`;

  const rightOpenHolePathData = generateRandomXCurve({
    top: cement?.prevItemBottom!,
    bottom,
    x: HOLE_SIZE({ OD }),
    maxDepth,
  });
  const leftOpenHolePathData: [number, number][] = rightOpenHolePathData.map(
    (point) => [-point[0], point[1]]
  );

  const canDrawCement = () =>
    cement && !!cement?.prevItemOD && !Number.isNaN(cement?.prevItemOD);

  const rightCementPathData = canDrawCement()
    ? [
        [cement?.prevItemOD, cement?.top ?? top],
        [cement?.prevItemOD, cement?.prevItemBottom],
        ...rightOpenHolePathData,
        [OD, bottom],
        [OD, cement?.top ?? top],
        [HOLE_SIZE({ OD }), cement?.top ?? top],
      ]
    : [];

  const leftCementPathData = canDrawCement()
    ? [
        [-cement!.prevItemOD!, cement?.top ?? top],
        [-cement!.prevItemOD!, cement?.prevItemBottom],
        ...leftOpenHolePathData,
        [-OD, bottom],
        [-OD, cement?.top ?? top],
        [-HOLE_SIZE({ OD }), cement?.top ?? top],
      ]
    : [];

  return (
    <>
      <g>
        <g>
          {!pdf ? ( // react-pdf can't render defs => TODO: find a solution (defs determine the available area for drawing and hide all out side, usefull in cement top)
            <defs>
              <clipPath id={cementClipPathId}>
                <rect
                  width={sketchWidth}
                  height={yScale(bottom - (cement?.top ?? top))}
                  transform={`translate(0, ${yScale(cement?.top ?? top)})`}
                />
              </clipPath>
            </defs>
          ) : (
            <g />
          )}

          {/* <g ref={cementRef as any} clipPath={`url(#${cementClipPathId})`} /> */}
        </g>
        <g>
          {/* right cement filling  */}
          {withCasing && (
            <path
              d={
                plotLine
                  ? (plotLine(
                      rightCementPathData as [number, number][]
                    ) as string)
                  : ""
              }
              fill={Colors.cement}
            />
          )}
          {/* left cement filling  */}
          {withCasing && (
            <path
              d={
                plotLine
                  ? (plotLine(
                      leftCementPathData as [number, number][]
                    ) as string)
                  : ""
              }
              fill={Colors.cement}
            />
          )}
          {/* right open hole zigzag */}
          <path
            d={plotLine ? (plotLine(rightOpenHolePathData) as string) : ""}
            fill="none"
            stroke={Colors.holeLine}
            strokeWidth={Strokes.holeLine}
          />

          {/* left open hole zigzag */}
          <path
            d={plotLine ? (plotLine(leftOpenHolePathData) as string) : ""}
            fill="none"
            stroke={Colors.holeLine}
            strokeWidth={Strokes.holeLine}
          />
        </g>
      </g>
      {cement?.top && withCasing && (
        <Label
          depth={cement?.top!}
          lines={[{ text: `TOC: ${cement?.top}` }]}
          id={`${id}_open_hole`}
        />
      )}
      {!withCasing && (
        <Label
          depth={bottom}
          lines={[{ text: "Open Hole" }, { text: `${top} : ${bottom}` }]}
          id={`${id}_open_hole`}
        />
      )}
    </>
  );
}

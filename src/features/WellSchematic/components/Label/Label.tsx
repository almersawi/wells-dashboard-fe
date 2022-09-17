import { Margins } from "../../constants/design";
import { useWellSketchContext } from "../WsProvider/WsProvider";

type Props = {
  lines: Array<{ text: string }>;
  depth: number;
  id: string;
};

export default function Label({ lines, depth, id }: Props) {
  const { yScale, sketchWidth, labels } = useWellSketchContext();

  const { width, fontSize, enable } = labels;

  const lineStyle = {
    stroke: "#333",
    strokeWidth: 1,
  };

  const linesElements: Array<JSX.Element> = [];

  const yStart = -1 * ((lines.length - 1) / 2) * Margins.yLabels;

  lines.forEach((line, index) => {
    const yTranslate = yStart + index * Margins.yLabels;
    const slopeLine = (
      <line
        x1={sketchWidth - width!}
        x2={sketchWidth - width! + Margins.xLabel}
        y1={yScale(depth)}
        y2={yScale(depth) + yTranslate}
        style={lineStyle}
        key={`slope-line-${id}-${index}`}
      ></line>
    );

    const horizontalUpperLine = (
      <line
        x1={sketchWidth - width! + Margins.xLabel}
        x2={sketchWidth - width! + Margins.xLabel * 2}
        y1={yScale(depth) + yTranslate}
        y2={yScale(depth) + yTranslate}
        style={lineStyle}
        key={`horizontal-upper-line-${id}-${index}`}
      ></line>
    );

    const textEl = (
      <text
        x={sketchWidth - width! + Margins.xLabel * 2.2}
        y={yScale(depth) + yTranslate + 3}
        y2={yScale(depth) + yTranslate}
        textAnchor="start"
        fontSize={fontSize ?? 10}
        key={`label-text-${id}-${index}`}
      >
        {line.text}
      </text>
    );

    linesElements.push(slopeLine);
    linesElements.push(horizontalUpperLine);
    linesElements.push(textEl);
  });

  return (
    <g>
      {enable ? (
        <g>
          {/* horizontal line */}
          <line
            key={`horizontal-line-${id}`}
            x1={sketchWidth - width! - 15}
            x2={sketchWidth - width!}
            y1={yScale(depth)}
            y2={yScale(depth)}
            style={lineStyle}
          />
          {linesElements.map((line) => line)}
        </g>
      ) : (
        <g />
      )}
    </g>
  );
}

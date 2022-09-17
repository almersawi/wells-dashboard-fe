import * as d3 from "d3";
import { Colors } from "../../constants/design";
import {
  LinearScaleType,
  useWellSketchContext,
} from "../WsProvider/WsProvider";
import { useRef, useEffect } from "react";
import { clear } from "../../utils/ws-helper.util";

export default function Grid() {
  const element = useRef<SVGGElement>(null);
  const { yScale, xScale, sketchWidth, sketchHeight, grid, labels } =
    useWellSketchContext();

  const { enable: isLabelsEnabled, width: labelsWidth } = labels;

  const make_x_gridlines = (x: LinearScaleType, ticks: number) =>
    d3.axisTop(x).ticks(ticks);
  // grid lines y axis
  const make_y_gridlines = (y: LinearScaleType, ticks: number) =>
    d3.axisLeft(y).ticks(ticks);

  const draw = () => {
    if (!element?.current) return;
    clear({ element: element.current! });
    const gridContainer = d3.select(element?.current)?.append("g");

    if (!!yScale && !!xScale) {
      gridContainer?.append("g").call(
        make_y_gridlines(yScale, grid?.y ?? 0)
          .tickSize(
            -sketchWidth + (isLabelsEnabled ? (labelsWidth as number) : 0)
          )
          .tickFormat(null)
      );

      gridContainer
        ?.append("g")
        .attr("class", "grid")
        .call(
          make_x_gridlines(xScale, grid?.x ?? 0)
            .tickSize(-sketchHeight)
            .tickFormat(null)
        );

      gridContainer
        ?.selectAll(".tick")
        .attr("stroke-width", 1)
        .attr("color", Colors.primaryLight);
    }
  };

  useEffect(() => {
    draw();
  }, [xScale, yScale]);

  return <g ref={element} />;
}

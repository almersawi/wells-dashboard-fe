import { useEffect } from "react";
import * as d3 from "d3";
import { useWellSketchContext } from "../WsProvider/WsProvider";
import { Colors, FontFamily } from "../../constants/design";
import { clear } from "../../utils/ws-helper.util";
import { useRef } from "react";

export default function YAxis() {
  const { yScale, margin, grid } = useWellSketchContext();
  const elementRef = useRef<SVGGElement>();

  useEffect(() => {
    if (yScale && !!elementRef?.current) {
      clear({ element: elementRef?.current });
      const yAxis = d3
        .select(elementRef?.current as SVGGElement)
        ?.append("g")
        .call(d3.axisLeft(yScale).ticks(grid?.y ?? 0))
        .attr(
          "transform",
          `translate(${margin?.left ?? 0}, ${margin?.top ?? 0})`
        );

      yAxis
        .selectAll(".tick text")
        .attr("font-size", "12")
        .attr("font-family", FontFamily.primary)
        .attr("color", Colors.primary);

      yAxis
        .selectAll(".tick line")
        .attr("color", Colors.primary)
        .attr("stroke-width", "1");

      yAxis.selectAll(".domain").attr("color", Colors.primaryLight);
    }
  }, [yScale]);
  return <g ref={elementRef as any} />;
}

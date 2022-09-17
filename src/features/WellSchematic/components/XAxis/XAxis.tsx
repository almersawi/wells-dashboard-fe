import { useEffect } from "react";
import * as d3 from "d3";
import { useWellSketchContext } from "../WsProvider/WsProvider";
import { Colors, FontFamily } from "../../constants/design";
import { clear } from "../../utils/ws-helper.util";
import { useRef } from "react";

export default function XAxis() {
  const { xScale, margin } = useWellSketchContext();
  const elementRef = useRef<SVGGElement>();

  useEffect(() => {
    if (xScale && !!elementRef?.current) {
      clear({ element: elementRef?.current });
      const xAxis = d3
        .select(elementRef.current as SVGGElement)
        ?.append("g")
        .call(d3.axisTop(xScale).ticks(0))
        .attr(
          "transform",
          `translate(${margin?.left ?? 0}, ${margin?.top ?? 0})`
        )
        .attr("font-family", "Roboto,'Helvetica Neue',sans-serif");

      xAxis
        .selectAll(".tick text")
        .attr("font-size", "12")
        .attr("font-family", FontFamily.primary)
        .attr("color", Colors.primary);

      xAxis
        .selectAll(".tick line")
        .attr("color", Colors.primary)
        .attr("stroke-width", "1");

      xAxis.selectAll(".domain").attr("color", Colors.primaryLight);
    }
  }, [xScale]);
  return <g ref={elementRef as any} />;
}

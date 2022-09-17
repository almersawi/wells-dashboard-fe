import { WellSchematicConfig } from "../../models/well-schematic-config";
import SketchElements from "../SketchElements";
import WellSketchProvider from "../WsProvider";

export default function WellSchematic({
  items,
  grid,
  width = 300,
  labels,
  height = 800,
  pdf,
}: WellSchematicConfig) {
  return (
    <WellSketchProvider
      width={width}
      height={height}
      items={items}
      grid={grid!}
      labels={labels}
      pdf={pdf}
    >
      <SketchElements />
    </WellSketchProvider>
  );
}

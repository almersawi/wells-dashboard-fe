import { PipeParams } from "../models/pipeParams";
import HollowPipe from "../hollowPipe/HollowPipe";
import { DoubleSide, MeshPhysicalMaterial } from "three";
import { WbsRow } from "../models/wbsRow";
import { Text } from "@react-three/drei";

type Props = {
  params: PipeParams;
  lengthScale: number;
  accessories: WbsRow[];
  maxOdAtBottom: number;
  hideTooltip?: boolean;
  position?: {x: number, y: number, z: number}
};

const Casing = ({
  params,
  lengthScale,
  accessories,
  maxOdAtBottom,
  hideTooltip,
  position
}: Props) => {
  const material = new MeshPhysicalMaterial({
    side: DoubleSide,
    metalness: 1,
    roughness: 0.65,
    transparent: true,
    opacity: 1,
    color: "#96b3d3",
  });

  return (
    <>
      <HollowPipe
        params={{ ...params, material }}
        lengthScale={lengthScale}
        exclude={accessories}
        position={position}
      />
      {!hideTooltip && (
        <Text
          fontSize={3}
          userData={{ _id: params._id + "_annotation" }}
          outlineWidth={"3%"}
          outlineColor="#000000"
          outlineOpacity={1}
          position={[maxOdAtBottom + 2, (-params.bottom + 1) * lengthScale, 1]}
          anchorX="left"
        >
          {`${params.text}`}
        </Text>
      )}
    </>
  );
};

export default Casing;

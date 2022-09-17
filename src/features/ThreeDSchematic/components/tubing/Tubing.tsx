import { Text } from "@react-three/drei";
import { DoubleSide, MeshStandardMaterial } from "three";
import HollowPipe from "../hollowPipe/HollowPipe";
import { PipeParams } from "../models/pipeParams";
import { WbsRow } from "../models/wbsRow";

type Props = {
  params: PipeParams;
  accessories: WbsRow[];
  xTransition: number;
  lengthScale: number;
  maxOdAtBottom: number;
};

function Tubing({
  params,
  accessories,
  xTransition,
  lengthScale,
  maxOdAtBottom,
}: Props) {
  const material = new MeshStandardMaterial({
    side: DoubleSide,
    metalness: 1,
    roughness: 0.6,
    color: "#eee",
  });

  return (
    <>
      <HollowPipe
        key={params._id}
        params={{ ...params, material, endAngle: Math.PI * 2 }}
        exclude={accessories}
        position={{ x: xTransition, y: 0, z: 0 }}
        lengthScale={lengthScale}
      />

      {params.text ? (
        <Text
          fontSize={3}
          userData={{ _id: `${params._id}_annotation` }}
          outlineWidth="3%"
          outlineColor="#000000"
          outlineOpacity={1}
          position={[-maxOdAtBottom - 2, (-params.bottom + 1) * lengthScale, 1]}
          anchorX="right"
        >
          {`${params.text}`}
        </Text>
      ) : (
        ""
      )}
    </>
  );
}

export default Tubing;

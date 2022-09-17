import { Text } from "@react-three/drei";
import { DoubleSide } from "three";

type Props = {
  raduis: number;
};

const DepthRing = ({ raduis }: Props) => {
  return (
    <>
      <mesh
        name={"depthRing"}
        rotation-x={Math.PI}
        userData={{ _id: "depth-ring", color: "green" }}
      >
        <cylinderGeometry args={[raduis + 5, raduis + 5, 0.1, 100]} />
        <meshLambertMaterial
          side={DoubleSide}
          color={"green"}
          opacity={0.1}
          transparent={true}
        />
      </mesh>
      <Text
        userData={{ _id: "depth-ring" }}
        fontSize={4}
        outlineWidth={"3%"}
        anchorX="left"
        outlineColor="#000000"
        outlineOpacity={1}
        position={[raduis + 8, 0, 0]}
        name={"depthText"}
      >
        0
      </Text>
    </>
  );
};

export default DepthRing;

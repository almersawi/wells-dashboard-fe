import {
  Mesh,
  MeshStandardMaterial,
  BoxGeometry,
  MeshLambertMaterial,
} from "three";

type Props = {
  width: number;
  height: number;
  thickness: number;
  lengthScale: number;
  _id: string | undefined;
  position: { x: number; y: number; z: number };
  material: MeshStandardMaterial | MeshLambertMaterial;
};

const Box = ({
  width,
  height,
  position,
  lengthScale,
  thickness,
  material,
  _id,
}: Props) => {
  const boxMesh = new Mesh(
    new BoxGeometry(width, height * lengthScale, thickness),
    material
  );

  return (
    <>
      <mesh
        position={[
          position.x,
          -position.y * lengthScale - (height * lengthScale) / 2,
          position.z,
        ]}
        userData={{ _id: _id, color: "#" + material?.color?.getHexString() }}
      >
        <primitive
          object={boxMesh}
          userData={{ _id: _id, color: "#" + material.color?.getHexString() }}
        ></primitive>
      </mesh>
    </>
  );
};

export default Box;

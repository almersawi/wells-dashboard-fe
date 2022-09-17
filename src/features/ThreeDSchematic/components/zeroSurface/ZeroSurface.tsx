import { Mesh, MeshBasicMaterial, PlaneGeometry } from "three";

const ZeroSurface = () => {
  const planMesh = new Mesh(
    new PlaneGeometry(150, 150, 15, 15),
    new MeshBasicMaterial({ wireframe: true })
  );

  return (
    <mesh rotation-x={Math.PI / 2} position={[0, 1, 0]}>
      <primitive object={planMesh}></primitive>
    </mesh>
  );
};

export default ZeroSurface;

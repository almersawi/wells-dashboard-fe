import { Vector3, BufferGeometry, Line, LineDashedMaterial } from "three";

type Props = {
  points: Vector3[];
  color?: string | number;
  position?: [number, number, number];
  dashed?: boolean
};

const LineComponent = ({
  points = [],
  color = 0x0000ff,
  position = [0, 0, 0],
  dashed = false
}: Props) => {
  const lineGeometry = new BufferGeometry().setFromPoints(points);
  const material = new LineDashedMaterial({ color, dashSize: 1, gapSize: dashed ? 0.3 : 0 });

  const line = new Line(
    lineGeometry, material)
  line.computeLineDistances();

  return (
    <mesh position={position}>
      <primitive object={line}></primitive>
    
    </mesh>
  );
};

export default LineComponent;

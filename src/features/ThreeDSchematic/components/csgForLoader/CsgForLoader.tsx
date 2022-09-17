import { PipeParams } from "../models/pipeParams";
import HollowPipe from "../hollowPipe/HollowPipe";
import { DoubleSide, MeshPhysicalMaterial } from "three";

type Props = {
  params: PipeParams;
  last?: boolean;
};

const CasingForLoader = ({
  params,
  last,
}: Props) => {
  const material = 
  new MeshPhysicalMaterial({
    side: DoubleSide,
    opacity: 0.5,
    transparent: true,
    color: last ? '#0052cc' : '#eee'
  })

  return (
    <>
      <HollowPipe
        params={{ ...params, material }}
        lengthScale={1}
        exclude={[]}
        position={{x: 0, z: 0, y: 100}}
      />
    </>
  );
};

export default CasingForLoader;

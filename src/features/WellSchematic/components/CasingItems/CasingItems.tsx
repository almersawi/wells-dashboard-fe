import { useWellSketchContext } from "../WsProvider/WsProvider";
import Casing from "../Casing";

export default function CasingItems() {
  const { casing } = useWellSketchContext();

  return (
    <>
      {casing?.map((csg) => (
        <Casing
          OD={csg?.OD}
          top={csg.top!}
          bottom={csg?.bottom!}
          key={csg?.id}
          id={csg?.id}
        />
      ))}
      <g />
    </>
  );
}

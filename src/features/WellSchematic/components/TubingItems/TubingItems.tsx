import Tubing from "../Tubing/Tubing";
import { useWellSketchContext } from "../WsProvider/WsProvider";

export default function TubingItems() {
  const { tubing } = useWellSketchContext();
  return (
    <>
      {tubing?.map((tbg) => (
        <Tubing
          id={tbg.id}
          top={tbg.top!}
          bottom={tbg.bottom!}
          OD={tbg.OD}
          key={tbg.id}
        />
      ))}
    </>
  );
}

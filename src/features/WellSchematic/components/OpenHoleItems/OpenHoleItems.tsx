import { useWellSketchContext } from "../WsProvider/WsProvider";
import OpenHole from "../OpenHole";
import { WELL_SCHEMATIC_ITEM_TYPES } from "../../models/well-schematic-config";

export default function OpenHoleItems() {
  const { casing, openhole } = useWellSketchContext();

  return (
    <>
      {[...casing, ...openhole]?.map((item, i) => {
        // first casing item is the conductor
        if (i !== 0) {
          return (
            <OpenHole
              OD={item?.OD}
              top={item.top!}
              bottom={item?.bottom!}
              key={`${item?.id}_open_hole`}
              index={i}
              cement={{
                prevItemBottom: casing[i - 1]?.bottom ?? 0,
                prevItemOD: casing[i - 1]?.OD ?? 0,
                top: item.cementTop,
              }}
              id={item?.id}
              withCasing={item?.type === WELL_SCHEMATIC_ITEM_TYPES.CASING}
            />
          );
        }
        return <g key="first-open-hole-empty" />;
      })}
      <g key="empty-open-hole-g" />
    </>
  );
}

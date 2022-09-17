import { Card } from "antd";
import WellSchematic from "features/WellSchematic/components/WellSchematic";
import { WellSchematicItem } from "features/WellSchematic/models/well-schematic-config";
import { useSchematicData } from "hooks/queries/useSchematic.query";
import IF from "UI/IF";
import NoData from "UI/NoData";

export default function WellSchematicTwoD() {
  const {
    data: { data },
    isLoading,
  } = useSchematicData();

  const items: Array<WellSchematicItem> = data?.map((x) => ({
    ...x,
    OD: x.od,
    cementTop: x.toc || x.top,
  }));

  return (
    <Card loading={isLoading}>
      <IF
        condition={items?.length > 0}
        trueComponent={
          <WellSchematic
            items={items}
            height={550}
            width={280}
            grid={{ x: 5, y: 5 }}
          />
        }
        falseComponent={<NoData />}
      />
    </Card>
  );
}

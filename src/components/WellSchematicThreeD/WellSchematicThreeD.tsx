import { Card } from "antd";
import { WbsRow } from "features/ThreeDSchematic/components/models/wbsRow";
import ThreeDSchematic from "features/ThreeDSchematic/ThreeDSchematic";
import { useSchematicData } from "hooks/queries/useSchematic.query";
import IF from "UI/IF";
import NoData from "UI/NoData";

export default function WellSchematicThreeD() {
  const {
    data: { data },
    isLoading,
  } = useSchematicData();

  //@ts-ignore
  const items: Array<WbsRow> = data?.map((x) => ({
    ...x,
    OD: x.od,
    cementTop: x.toc || x.top,
    _id: `_${x.id}`,
    id: x.od * 0.9,
    text: ""
  }));

  return (
    <Card loading={isLoading}>
      <IF
        condition={items?.length > 0}
        trueComponent={<ThreeDSchematic data={items} />}
        falseComponent={<NoData />}
      />
    </Card>
  );
}

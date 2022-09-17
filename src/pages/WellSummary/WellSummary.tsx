import { Card, Col, Row } from "antd";
import WellSchematicThreeD from "components/WellSchematicThreeD";
import WellSchematicTwoD from "components/WellSchematicTwoD";
import WellsMap from "components/WellsMap";
import Wrapper from "components/Wrapper";
import { useWell } from "hooks/queries/useWells.query";
import { ROW_GUTTER } from "styles/constants";
import IF from "UI/IF";
import Loader from "UI/Loader";

export default function WellSummary() {
  const {
    data: { data: well },
    isLoading,
  } = useWell();
  return (
    <Wrapper>
      <IF
        condition={isLoading}
        trueComponent={<Loader />}
        falseComponent={
          <>
            <Row className="!h-[600px]" gutter={ROW_GUTTER}>
              <Col span={7}>
                <WellsMap
                  defaultCenter={[well?.lat!, well?.lon!]}
                  defaultZoom={7}
                  key={`well-map-${well?.id}`}
                  wells={[well!]}
                />
              </Col>
              <Col span={7}>
                <Card title="Trajectory" />
              </Col>
              <Col span={5}>
                <WellSchematicThreeD />
              </Col>
              <Col span={5}>
                <WellSchematicTwoD />
              </Col>
            </Row>
          </>
        }
      />
    </Wrapper>
  );
}

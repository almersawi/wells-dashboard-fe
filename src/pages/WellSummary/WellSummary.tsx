import { Card, Col, Row } from "antd";
import ProductionGuage from "components/ProductionGuage";
import WellheadPressureGuage from "components/WellheadPressureGuage";
import TrajectoryChart from "components/TrajectoryChart";
import WellInfoCard from "components/WellInfoCard";
import WellSchematicThreeD from "components/WellSchematicThreeD";
import WellSchematicTwoD from "components/WellSchematicTwoD";
import WellsMap from "components/WellsMap";
import Wrapper from "components/Wrapper";
import { useWell } from "hooks/queries/useWells.query";
import { useWellSummary } from "hooks/queries/useWellSummary.query";
import { ROW_GUTTER } from "styles/constants";
import IF from "UI/IF";
import Loader from "UI/Loader";
import AvgWellValuesCard from "components/AvgWellValuesCard";
import ProductionDataPlot from "components/ProductionDataPlot";
import WellheadPressurePlot from "components/WellheadPressurePlot";

export default function WellSummary() {
  const {
    data: { data: well },
    isLoading,
  } = useWell();

  const {
    data: { data: wellSummary },
    isLoading: isSummaryLoading,
  } = useWellSummary();

  return (
    <Wrapper>
      <IF
        condition={isLoading || isSummaryLoading}
        trueComponent={<Loader />}
        falseComponent={
          <>
            <Row className="!h-[300px] mb-6" gutter={ROW_GUTTER}>
              <Col span={6}>
                <WellInfoCard wellSummary={wellSummary!} />
              </Col>
              <Col span={6}>
                <ProductionGuage wellSummary={wellSummary!} />
              </Col>
              <Col span={6}>
                <WellheadPressureGuage wellSummary={wellSummary!} />
              </Col>
              <Col span={6}>
                <AvgWellValuesCard wellSummary={wellSummary!} />
              </Col>
            </Row>
            <Row className="!h-[600px] mb-6" gutter={ROW_GUTTER}>
              <Col span={7}>
                <WellsMap
                  defaultCenter={[well?.lat!, well?.lon!]}
                  defaultZoom={7}
                  key={`well-map-${well?.id}`}
                  wells={[well!]}
                />
              </Col>
              <Col span={7}>
                <TrajectoryChart />
              </Col>
              <Col span={5}>
                <WellSchematicThreeD />
              </Col>
              <Col span={5}>
                <WellSchematicTwoD />
              </Col>
            </Row>

            <Row gutter={ROW_GUTTER} className="h-[500px]">
              <Col span={12}>
                <ProductionDataPlot />
              </Col>
              <Col span={12}>
                <WellheadPressurePlot />
              </Col>
            </Row>
          </>
        }
      />
    </Wrapper>
  );
}

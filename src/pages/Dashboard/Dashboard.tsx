import { Col, Row } from "antd";
import DashboardTopRow from "components/DashboardTopRow";
import StringTypePieChart from "components/StringTypePieChart";
import TotalProductionGuage from "components/TotalProductionGuage";
import WellsMap from "components/WellsMap";
import WellStatusPieChart from "components/WellStatusPieChart";
import WellTypePieChart from "components/WellTypePieChart";
import Wrapper from "components/Wrapper";
import { useDashboardSummary } from "hooks/queries/useDashboardSummary.query";
import { useWells } from "hooks/queries/useWells.query";
import { ROW_GUTTER } from "styles/constants";
import IF from "UI/IF";
import Loader from "UI/Loader";

export default function Dashboard() {
  const {
    data: { data: wells },
    isLoading: isWellsLoading,
  } = useWells();

  const {
    data: { data: dashboardSummary },
    isLoading: isDashboardLoading,
  } = useDashboardSummary();

  const isLoading = isWellsLoading || isDashboardLoading;
  return (
    <Wrapper>
      <IF
        condition={!isLoading}
        trueComponent={
          <div className="mt-[40px]">
            <Row className="h-[110px] mb-4">
              <DashboardTopRow summary={dashboardSummary!} />
            </Row>
            <Row className="h-[700px]" gutter={ROW_GUTTER}>
              <Col span={12}>
                <WellsMap wells={wells} />
              </Col>
              <Col span={12}>
                <Row gutter={ROW_GUTTER} className="h-[350px] mb-[10px]">
                  <Col span={12}>
                    <TotalProductionGuage summary={dashboardSummary!} />
                  </Col>
                  <Col span={12}>
                    <WellTypePieChart summary={dashboardSummary!} />
                  </Col>
                </Row>
                <Row gutter={ROW_GUTTER} className="h-[350px]">
                  <Col span={12}>
                    <WellStatusPieChart summary={dashboardSummary!} />
                  </Col>
                  <Col span={12}>
                    <StringTypePieChart summary={dashboardSummary!} />
                  </Col>
                </Row>
              </Col>
            </Row>
          </div>
        }
        falseComponent={<Loader />}
      />
    </Wrapper>
  );
}

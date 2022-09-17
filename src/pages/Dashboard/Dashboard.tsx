import { Col, Row } from "antd";
import WellsMap from "components/WellsMap";
import Wrapper from "components/Wrapper";
import { useWells } from "hooks/queries/useWells.query";
import IF from "UI/IF";
import Loader from "UI/Loader";

export default function Dashboard() {
  const {
    data: { data: wells },
    isLoading,
  } = useWells();
  return (
    <Wrapper>
      <IF
        condition={!isLoading}
        trueComponent={
          <Row className="h-[600px] mt-[50px]">
            <Col span="12">
              <WellsMap wells={wells} />
            </Col>
          </Row>
        }
        falseComponent={<Loader />}
      />
    </Wrapper>
  );
}

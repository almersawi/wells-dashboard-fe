import WellsTable from "components/WellsTable";
import Wrapper from "components/Wrapper";

export default function Wells() {
  return (
    <Wrapper>
      <div className="mt-[50px]" style={{ height: "calc(100vh - 150px)" }}>
        <WellsTable />;
      </div>
    </Wrapper>
  );
}

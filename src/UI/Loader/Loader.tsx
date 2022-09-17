import { Spin } from "antd";
import CenterWrapper from "UI/CenterWrapper";

export default function Loader() {
  return (
    <CenterWrapper>
      <Spin />
    </CenterWrapper>
  );
}

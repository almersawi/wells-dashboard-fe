import { Outlet } from "@tanstack/react-location";
import { Layout } from "antd";
import { Content } from "antd/lib/layout/layout";
import WellMenu from "components/WellMenu";

export default function WellLayout() {
  return (
    <Layout>
      <WellMenu />
      <Content>
        <Outlet />
      </Content>
    </Layout>
  );
}

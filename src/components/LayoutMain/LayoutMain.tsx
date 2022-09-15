import { Layout } from "antd";
// import MainMenu from "components/MainMenu";
import { useAppRouter } from "hooks/useAppRouter";
import React, { ReactNode } from "react";
import Header from "./Header";

type Props = {
  children: ReactNode;
};

export default function LayoutMain({ children }: Props) {
  const { pathname } = useAppRouter();
  return (
    <>
      <Header />
      <Layout style={{ height: "calc(100vh - 60px)" }}>
        {/* <MainMenu /> */}
        <Layout>
          <Layout.Content className="p-8 overflow-auto" key={pathname}>
            {children}
          </Layout.Content>
        </Layout>
      </Layout>
    </>
  );
}

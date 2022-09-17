import { MenuItem } from "utils/menu.util";
import { Layout, Menu } from "antd";
import React, { useState } from "react";

type Props = {
  items: MenuItem[];
  defaultSelectedKey: string;
  defaultOpenKeys: string[];
  onClick?: any;
};

function SideMenu({
  items,
  defaultSelectedKey,
  onClick,
  defaultOpenKeys,
}: Props) {
  const [isSliderCollapsed, setIsSiderCollapsed] = useState(false);
  const { Sider } = Layout;

  return (
    <Sider
      collapsible
      collapsed={isSliderCollapsed}
      onCollapse={() => setIsSiderCollapsed(!isSliderCollapsed)}
      className="mt-[50px] !w-full"
      style={{height: "calc(100vh - 40px)"}}
    >
      <Menu
        mode="inline"
        defaultSelectedKeys={[defaultSelectedKey]}
        className="!border-r-0 fixed !w-[210px]"
        items={items}
        onClick={onClick}
        defaultOpenKeys={defaultOpenKeys}
        style={{height: "calc(100vh - 40px)"}}
      />
    </Sider>
  );
}

export default SideMenu;

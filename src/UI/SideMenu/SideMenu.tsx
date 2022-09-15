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
    >
      <Menu
        mode="inline"
        defaultSelectedKeys={[defaultSelectedKey]}
        className="!border-r-0"
        items={items}
        onClick={onClick}
        defaultOpenKeys={defaultOpenKeys}
      />
    </Sider>
  );
}

export default SideMenu;

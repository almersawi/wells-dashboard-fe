import { MenuUnfoldOutlined } from "@ant-design/icons";
import { Menu } from "antd";
import { useAppRouter } from "hooks/useAppRouter";
import { ROUTE_PATH } from "models/routes";

export default function NavMenu() {
  const { navigate, pathname } = useAppRouter();

  function handleClick(to: string) {
    navigate({ to });
  }

  return (
    <Menu
      className="flex-auto !bg-primary"
      onClick={(menu) => handleClick(menu.key as string)}
      selectedKeys={[pathname?.split("/")?.[1] || ROUTE_PATH.DASHBOARD]}
      mode="horizontal"
      theme="dark"
      overflowedIndicator={<MenuUnfoldOutlined />}
    >
      {[
        {
          label: "Dashboard",
          routePath: ROUTE_PATH.DASHBOARD,
        },
        {
          label: "Wells",
          routePath: ROUTE_PATH.WELLS,
        },
      ].map(({ label, routePath }) => (
        <Menu.Item key={routePath} className="font-bold">
          {label}
        </Menu.Item>
      ))}
    </Menu>
  );
}

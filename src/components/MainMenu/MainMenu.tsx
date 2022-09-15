import { MenuItem } from "utils/menu.util";
import SideMenu from "UI/SideMenu";
import { useLocation, useNavigate } from "@tanstack/react-location";

const items: MenuItem[] = [];

export default function MainMenu() {
  const location = useLocation();
  const navigate = useNavigate();
  const pathArray = location?.current.pathname?.split("/");
  const pathname = pathArray.slice(1, pathArray.length).join("/");

  const onClick = ({ item }: { item: { props: MenuItem } }) => {
    const itemRoute = item.props.route;
    navigate({ to: itemRoute });
  };

  return (
    <SideMenu
      items={items}
      defaultSelectedKey={pathname}
      onClick={onClick}
      defaultOpenKeys={[]}
    />
  );
}

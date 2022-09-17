import { getItem, MenuItem } from "utils/menu.util";
import SideMenu from "UI/SideMenu";
import { useLocation, useNavigate } from "@tanstack/react-location";
import { ROUTE_PATH } from "models/routes";
import {
  AiOutlinePieChart,
  AiOutlineDatabase,
  AiOutlineLineChart,
} from "react-icons/ai";
import { GiOilPump, GiOilRig } from "react-icons/gi";

const items: MenuItem[] = [
  getItem({
    label: "Summary",
    route: ROUTE_PATH.SUMMARY,
    key: ROUTE_PATH.SUMMARY,
    icon: <AiOutlinePieChart />,
  }),
  getItem({
    label: "Data Managment",
    route: ROUTE_PATH.DATA_MANAGMENT,
    key: ROUTE_PATH.DATA_MANAGMENT,
    icon: <AiOutlineDatabase />,
    children: [
      getItem({
        label: "Schematic",
        route: ROUTE_PATH.WELL_SCHEMATIC,
        key: ROUTE_PATH.WELL_SCHEMATIC,
        icon: <GiOilRig />,
      }),
      getItem({
        label: "Trajectory",
        route: ROUTE_PATH.TRAJECTORY,
        key: ROUTE_PATH.TRAJECTORY,
        icon: <AiOutlineLineChart />,
      }),
      getItem({
        label: "Production Data",
        route: ROUTE_PATH.PRODUCTION_DATA,
        key: ROUTE_PATH.PRODUCTION_DATA,
        icon: <GiOilPump />,
      })
    ],
  }),
];

export default function WellMenu() {
  const location = useLocation();
  const navigate = useNavigate();
  const pathArray = location?.current.pathname?.split("/");
  const pathname = pathArray[pathArray?.length - 1];

  const onClick = ({ item }: { item: { props: MenuItem } }) => {
    const itemRoute = item.props.route;
    navigate({ to: itemRoute });
  };

  const activeRoute = Object.values(ROUTE_PATH).includes(pathname as ROUTE_PATH)
    ? pathname
    : ROUTE_PATH.SUMMARY;

  return (
    <SideMenu
      items={items}
      defaultSelectedKey={activeRoute}
      onClick={onClick}
      defaultOpenKeys={[ROUTE_PATH.DATA_MANAGMENT]}
    />
  );
}

import { Route } from "@tanstack/react-location";
import { ROUTE_PATH } from "models/routes";

const route: Route = {
  path: ROUTE_PATH.DASHBOARD,
  element: () => import("./Dashboard").then((mod) => <mod.default />),
};
export default route;

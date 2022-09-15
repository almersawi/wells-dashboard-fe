import { Route } from "@tanstack/react-location";

const route: Route = {
  path: "/",
  element: () => import("./Wells").then((mod) => <mod.default />),
};

export default route;

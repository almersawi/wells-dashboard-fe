import {
  Navigate,
  Outlet,
  ReactLocation,
  Router,
} from "@tanstack/react-location";
import LayoutMain from "components/LayoutMain";
import { ROUTES_QUERYSTRING, ROUTE_PATH } from "models/routes";
import Dashboard from "pages/Dashboard/index";
import WellLayout from "pages/WellLayout/WellLayout";
import Wells from "pages/Wells/index";

import React from "react";

const location = new ReactLocation();

export default function Routes() {
  return (
    <Router
      location={location}
      routes={[
        Dashboard,
        {
          path: ROUTE_PATH.WELLS,
          children: [
            Wells,
            {
              path: `:${ROUTES_QUERYSTRING.WELL_ID}`,
              element: <WellLayout />,
              children: [
                // well summary routes
                // data managment routes
              ],
            },
          ],
        },
        {
          element: <Navigate to={ROUTE_PATH.DASHBOARD} />,
        },
      ]}
    >
      <LayoutMain>
        <Outlet />
      </LayoutMain>
    </Router>
  );
}

import {
  Navigate,
  Outlet,
  ReactLocation,
  Router,
} from "@tanstack/react-location";
import LayoutMain from "components/LayoutMain";
import RouteLoader from "components/RouteLoader";
import { ROUTES_QUERYSTRING, ROUTE_PATH } from "models/routes";
import WellLayout from "pages/WellLayout/WellLayout";

import React from "react";

const location = new ReactLocation();
const Dashboard = React.lazy(() => import("pages/Dashboard"));
const Wells = React.lazy(() => import("pages/Wells"));
const WellSummary = React.lazy(() => import("pages/WellSummary"));
const WellSchematicData = React.lazy(() => import("pages/WellSchematicData"));
const WellTrajectoryData = React.lazy(() => import("pages/WellTrajectoryData"));
const ProductionData = React.lazy(() => import("pages/ProductionData"));
const WellheadPressureData = React.lazy(
  () => import("pages/WellheadPressureData")
);

export default function Routes() {
  return (
    <Router
      location={location}
      routes={[
        {
          path: ROUTE_PATH.DASHBOARD,
          element: (
            <RouteLoader>
              <Dashboard />
            </RouteLoader>
          ),
        },
        {
          path: ROUTE_PATH.WELLS,
          children: [
            {
              path: "/",
              element: (
                <RouteLoader>
                  <Wells />
                </RouteLoader>
              ),
            },
            {
              path: `:${ROUTES_QUERYSTRING.WELL_ID}`,
              element: <WellLayout />,
              children: [
                // well summary routes
                {
                  path: ROUTE_PATH.SUMMARY,
                  element: (
                    <RouteLoader>
                      <WellSummary />
                    </RouteLoader>
                  ),
                },
                // data managment routes
                {
                  path: ROUTE_PATH.WELL_SCHEMATIC,
                  element: (
                    <RouteLoader>
                      <WellSchematicData />
                    </RouteLoader>
                  ),
                },
                {
                  path: ROUTE_PATH.TRAJECTORY,
                  element: (
                    <RouteLoader>
                      <WellTrajectoryData />
                    </RouteLoader>
                  ),
                },
                {
                  path: ROUTE_PATH.PRODUCTION_DATA,
                  element: (
                    <RouteLoader>
                      <ProductionData />
                    </RouteLoader>
                  ),
                },
                {
                  path: ROUTE_PATH.WELLHEAD_DATA,
                  element: (
                    <RouteLoader>
                      <WellheadPressureData />
                    </RouteLoader>
                  ),
                },
                {
                  path: "/",
                  element: <Navigate to={ROUTE_PATH.SUMMARY} />,
                },
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

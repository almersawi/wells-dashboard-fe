import { ROUTE_PATH } from "models/routes";

export const SIDE_BAR_OPTIONS: Array<{
  label: string;
  route: ROUTE_PATH;
  subMenu?: Array<{ label: string; route: ROUTE_PATH }>;
}> = [
  {
    label: "Wells",
    route: ROUTE_PATH.WELLS,
    subMenu: [],
  },
];

import { MenuProps } from "antd";
import { ROUTE_PATH } from "models/routes";
import React from "react";

export type MenuItem = Required<MenuProps>["items"][number] & {
  icon?: React.ReactNode;
  route?: ROUTE_PATH | string;
  label: string;
  items?: MenuItem[];
};

export function getItem({
  label,
  route,
  key = route ?? label,
  icon,
  children,
}: {
  label: string;
  route: ROUTE_PATH | string;
  key?: React.Key | null;
  icon?: React.ReactNode;
  children?: MenuItem[];
}): MenuItem {
  return {
    key,
    route,
    icon,
    children,
    label,
  } as MenuItem;
}

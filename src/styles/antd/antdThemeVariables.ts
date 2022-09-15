import colors from "tailwindcss/colors";
import { TailwindUtil } from "../../utils/tailwind.util.js";

const { sideNav, background } = TailwindUtil.getColors();

const antdThemeVariables = {
  "btn-font-weight": 500,
  "border-radius-base": "12px",
  "descriptions-bg": colors.gray[50],
  "error-color": colors.red[500],
  "font-family": "Inter var",
  "form-vertical-label-padding": "0px",
  "layout-body-background": background,
  "layout-header-background": sideNav,
  "menu-dark-submenu-bg": sideNav,
  "layout-trigger-background": sideNav,
  "layout-trigger-color": colors.slate[900],
  "primary-color": "#003366",
  "table-header-bg": colors.gray[50],
  "table-header-color": colors.slate[600],
  "typography-title-margin-bottom": "0px",
};

export { antdThemeVariables };

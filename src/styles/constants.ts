import { SizeType } from "antd/lib/config-provider/SizeContext";
import { FormLayout } from "antd/lib/form/Form";

export const MODAL_BODY_STYLE = {
  minHeight: "50vh",
  maxHeight: "70vh",
  overflow: "auto",
};

export const ROW_GUTTER = 32;

export const FORM_CONFIG = {
  layout: "vertical" as FormLayout,
  size: "large" as SizeType,
};

export const SELECT_STYLE = {
  width: 220,
  zIndex: 10,
};

export const PAGINATION_CONFIG = {
  hideOnSinglePage: true,
  defaultPageSize: 8
};

export const TABLE_CONFIG = {
  size: "small" as SizeType,
  bordered: true,
};

export const MODAL_CONFIG = {
  maskClosable: false,
};

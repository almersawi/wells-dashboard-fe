import { SizeType } from "antd/lib/config-provider/SizeContext";
import { FormLayout } from "antd/lib/form/Form";

const ANTD_CONFIG = {
  buttonConfig: {
    size: "middle" as SizeType,
  },
  formConfig: {
    layout: "vertical" as FormLayout,
    size: "large" as SizeType,
  },
  modalConfig: {
    maskClosable: false,
  },
  modalBodyStyle: {
    maxHeight: "70vh",
    overflow: "auto",
  },
  paginationConfig: {
    simple: true,
    pageSize: 6,
  },
  tableConfig: {
    size: "small" as SizeType,
  },
};

export default ANTD_CONFIG;

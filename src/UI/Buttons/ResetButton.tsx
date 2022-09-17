import { RestOutlined } from "@ant-design/icons";
import { Button } from "antd";
import React from "react";

type Props = {
  disabled?: boolean;
  label?: string;
  onClick: () => void;
  className?: string;
};

export default function ResetButton({
  disabled,
  label = "Reset",
  onClick,
  className,
  ...rest
}: Props) {
  return (
    <Button
      className={className}
      disabled={disabled}
      icon={<RestOutlined />}
      onClick={() => onClick()}
      type="dashed"
      {...rest}
    >
      {label}
    </Button>
  );
}

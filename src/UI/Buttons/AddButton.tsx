import { PlusOutlined } from "@ant-design/icons";
import { Button } from "antd";
import React from "react";

type Props = {
  disabled?: boolean;
  label?: string;
  onClick: () => void;
  className?: string;
};

export default function AddButton({
  disabled,
  label,
  onClick,
  className,
  ...rest
}: Props) {
  return (
    <Button
      className={className}
      disabled={disabled}
      type="primary"
      icon={<PlusOutlined />}
      onClick={() => onClick()}
      {...rest}
    >
      {label}
    </Button>
  );
}

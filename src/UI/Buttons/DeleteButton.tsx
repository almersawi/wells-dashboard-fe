import { DeleteOutlined } from "@ant-design/icons";
import { Button } from "antd";
import { SizeType } from "antd/lib/config-provider/SizeContext";
import React from "react";

type Props = {
  disabled?: boolean;
  label?: string;
  onClick?: () => void;
  className?: string;
  size?: SizeType;
  isLoading?: boolean;
};

export default function DeleteButton({
  disabled,
  label,
  onClick,
  size = "middle",
  className,
  isLoading,
  ...rest
}: Props) {
  return (
    <Button
      className={className}
      disabled={disabled}
      icon={<DeleteOutlined />}
      onClick={onClick}
      danger
      size={size}
      loading={isLoading}
      {...rest}
    >
      {label}
    </Button>
  );
}

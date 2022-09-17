import { DatabaseOutlined } from "@ant-design/icons";
import { Button } from "antd";
import React from "react";

type Props = {
  disabled?: boolean;
  label?: string;
  onClick: () => void;
  className?: string;
};

export default function ReadCsvButton({
  disabled,
  label = "Read CSV",
  onClick,
  className,
  ...rest
}: Props) {
  return (
    <Button
      className={className}
      disabled={disabled}
      icon={<DatabaseOutlined />}
      onClick={() => onClick()}
      {...rest}
    >
      {label}
    </Button>
  );
}

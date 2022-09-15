import { CloudDownloadOutlined } from "@ant-design/icons";
import { Button } from "antd";
import React from "react";

type Props = {
  disabled?: boolean;
  label?: string;
  loading?: boolean;
  onClick?: () => void;
  className?: string;
};

export default function ExportButton({
  disabled = false,
  label,
  loading,
  onClick,
  className,
}: Props) {
  return (
    <Button
      disabled={disabled}
      className={className}
      size="large"
      onClick={() => onClick && onClick()}
      loading={loading}
      icon={<CloudDownloadOutlined />}
    >
      {label}
    </Button>
  );
}

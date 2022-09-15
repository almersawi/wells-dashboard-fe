import { CloudUploadOutlined } from "@ant-design/icons";
import { Button } from "antd";
import React from "react";

type Props = {
  loading?: boolean;
  label?: string;
  onClick?: () => void;
  className?: string;
  type?:
    | "link"
    | "text"
    | "ghost"
    | "primary"
    | "default"
    | "dashed"
    | undefined;
};

export default function UploadButton({
  loading,
  label,
  onClick,
  className,
  type,
}: Props) {
  return (
    <Button
      className={className}
      icon={<CloudUploadOutlined />}
      loading={loading}
      onClick={() => onClick && onClick()}
      type={type}
    >
      {label}
    </Button>
  );
}

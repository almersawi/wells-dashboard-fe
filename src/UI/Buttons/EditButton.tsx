import { EditOutlined } from "@ant-design/icons";
import { Button } from "antd";
import { SizeType } from "antd/lib/config-provider/SizeContext";
import React from "react";

type Props = {
  onClick: () => void;
  size?: SizeType;
};

export default function EditButton({
  onClick,
  size = "middle",
  ...rest
}: Props) {
  return (
    <Button
      className="!border-none !bg-secondary !text-primary"
      onClick={onClick}
      size={size}
      icon={<EditOutlined className="!cursor-pointer" />}
      {...rest}
    />
  );
}

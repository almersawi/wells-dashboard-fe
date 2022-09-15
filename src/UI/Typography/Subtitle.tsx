import { Typography } from "antd";
import React from "react";

type Props = {
  text: string;
  extra?: any;
};

export function Subtitle({ text, extra = {} }: Props) {
  return (
    <Typography.Title
      {...extra}
      level={5}
      className="!text-[#3f4377] !mb-[unset] !font-bold"
    >
      {text}
    </Typography.Title>
  );
}

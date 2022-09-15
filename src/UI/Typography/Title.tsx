import { Typography } from "antd";
import React from "react";

type Props = {
  extra?: any;
  text: string | number | Date;
};

export function Title({ text, extra = {} }: Props) {
  return (
    <Typography.Title {...extra} level={5} className="!mb-[unset]">
      {text}
    </Typography.Title>
  );
}

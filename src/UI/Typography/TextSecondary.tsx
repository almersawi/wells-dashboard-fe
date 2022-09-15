import React from "react";

type Props = {
  text: string;
};

export function TextSecondary({ text }: Props) {
  return <div className="text-xs text-[#afafaf]">{text}</div>;
}

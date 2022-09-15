import React from "react";

type Props = {
  text: string;
};

export function Text({ text }: Props) {
  return <div className="text-xs text-black">{text}</div>;
}

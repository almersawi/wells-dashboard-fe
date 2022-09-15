import React, { ReactNode } from "react";

type Props = {
  children: ReactNode;
};

export default function CardButtons({ children }: Props) {
  return <div className="flex justify-center items-center">{children}</div>;
}

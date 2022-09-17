import React, { ReactNode } from "react";
import Header from "./Header";

type Props = {
  children: ReactNode;
};

export default function LayoutMain({ children }: Props) {
  return (
    <>
      <Header />
      {children}
    </>
  );
}

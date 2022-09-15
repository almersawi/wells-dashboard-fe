import { Title } from "UI/Typography";
import React, { ReactNode } from "react";

type Props = {
  children?: ReactNode;
  title: string;
};

export default function CardHeader({ children, title }: Props) {
  return (
    <div className="flex items-center justify-between">
      <Title text={title} />
      {children}
    </div>
  );
}

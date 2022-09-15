import { ReactNode } from "react";

type Props = {
  children: ReactNode;
};

export default function AntdIconWrapper({ children }: Props) {
  return <span className="anticon">{children}</span>;
}

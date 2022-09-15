import React from "react";
import { Spin } from "antd";

type Props = {
  children: any;
};

export default function RouteLoader({ children }: Props) {
  return (
    <React.Suspense
      fallback={
        <div className="h-[80vh] w-full flex justify-center items-center">
          <Spin />
        </div>
      }
    >
      {children}
    </React.Suspense>
  );
}

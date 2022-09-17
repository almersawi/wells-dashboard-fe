import React from "react";
import Loader from "UI/Loader";

type Props = {
  children: any;
};

export default function RouteLoader({ children }: Props) {
  return <React.Suspense fallback={<Loader />}>{children}</React.Suspense>;
}

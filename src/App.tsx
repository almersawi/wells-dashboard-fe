import ReactQueryProvider from "hooks/ReactQueryProvider";
import React from "react";
import Routes from "routes";

export default function App() {
  return (
    <ReactQueryProvider>
      <Routes />
    </ReactQueryProvider>
  );
}

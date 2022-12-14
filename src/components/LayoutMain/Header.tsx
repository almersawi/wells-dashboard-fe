import React from "react";
import Logo from "./Logo";
import NavMenu from "./NavMenu";
import WellSelection from "./WellSelection";

export default function Header() {
  return (
    <div className="flex items-center gap-20 px-8 py-3 bg-primary h-[50px] fixed w-full" style={{zIndex: 1000}}>
      <Logo />
      <NavMenu />
      <WellSelection />
    </div>
  );
}

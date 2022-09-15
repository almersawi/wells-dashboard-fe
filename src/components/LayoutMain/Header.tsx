import React from "react";
import Logo from "./Logo";
import NavMenu from "./NavMenu";

export default function Header() {
  return (
    <div className="flex items-center gap-20 px-8 py-3 bg-primary h-[50px]">
      <Logo />
      <NavMenu />
    </div>
  );
}

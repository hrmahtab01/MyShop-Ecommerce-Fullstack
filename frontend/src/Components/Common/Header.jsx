import React from "react";
import Topbar from "../Layout/Topbar";
import Navbar from "../Layout/Navbar";

const Header = () => {
  return (
    <header className="border-b border-red-200">
      <Topbar />
      <Navbar />
    </header>
  );
};

export default Header;

import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";

const Layout = () => {
  return (
    <div className="flex w-full h-screen flex-col">
      {/* Navbar at the top */}
      <div className="w-full h-[10%]">
        <Navbar />
      </div>
      
      {/* Main content below the Navbar */}
      <div className="w-full h-[90%]">
        <Outlet />
      </div>
    </div>
  );
};

export default Layout;

import React from "react";
import NavBar from "./NavBar";
import { Outlet } from "react-router-dom";

function OutLet() {
  return (
    <NavBar>
    <div className="m-4">
      <Outlet />
    </div>
    </NavBar>
  );
}

export default OutLet;

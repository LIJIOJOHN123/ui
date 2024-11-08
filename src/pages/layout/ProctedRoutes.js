import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { getLocalStorage } from "../../utils/LocalStorage";
import NavBar from "./NavBar";

const PrivateRoute = () => {
  const tokenExist = getLocalStorage("authToken");

  return tokenExist ? (
    <NavBar>
      <div className="m-2">
        <Outlet />
      </div>
    </NavBar>
  ) : (
    <Navigate to="/auth/login" />
  );
};

export default PrivateRoute;

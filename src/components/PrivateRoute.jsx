import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
import Login from "./pages/login";
export default function PrivateRoute() {
  const { user } = useSelector((state) => state.user);
  const { token } = user;
  return token ? <Outlet /> : <Navigate to={"/login"} />;
}

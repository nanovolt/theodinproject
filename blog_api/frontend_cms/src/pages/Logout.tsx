import { Navigate } from "react-router-dom";
import { currentUserApiSlice } from "../features/currentUser/currentUserSlice";

export const Logout = () => {
  currentUserApiSlice.useLogoutQuery();

  return <Navigate to="/" replace />;
};

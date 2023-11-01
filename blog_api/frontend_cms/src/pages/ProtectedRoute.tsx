import { Navigate, Outlet, useLocation } from "react-router-dom";
import { currentUserApiSlice } from "../features/currentUser/currentUserSlice";
import { RouterLocation } from "../types/types";

type ProtectedRouteProps = {
  redirectPath: string;
};

export const ProtectedRoute = ({ redirectPath = "/" }: ProtectedRouteProps) => {
  const { data: currentUser } = currentUserApiSlice.useMeQuery();
  const location = useLocation() as RouterLocation;

  if (!currentUser) {
    return <Navigate to={redirectPath} state={{ from: location.pathname, type: "url" }} replace />;
  }

  return <Outlet />;
};

import { Loader } from "@/components/loader";
import type { ReactNode } from "react";
import { Navigate, useLocation } from "react-router";
import { useAuth } from "../hooks/useAuth";

interface ProtectedRouteProps {
  children: ReactNode;
}

export function ProtectedRoute({ children }: ProtectedRouteProps) {
  const { user, isLoading } = useAuth();
  const location = useLocation();

  if (isLoading) {
    return <Loader />;
  }

  if (
    !user &&
    location.pathname !== "/login" &&
    location.pathname !== "/register" &&
    location.pathname !== "/unauthorized"
  ) {
    return <Navigate to="/unauthorized" state={{ from: location }} replace />;
  }
  return <>{children}</>;
}

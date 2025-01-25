import { useCheckAuth } from "@/modules/auth/hooks/useCheckAuth";
import { Outlet } from "react-router";

export function AuthLayout() {
  useCheckAuth();

  return (
    <>
      <Outlet />
    </>
  );
}

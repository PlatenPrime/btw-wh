import { AuthContext } from "@/modules/auth/providers/auth-provider/auth-provider.tsx";
import type { AuthContextType } from "@shared/modules/auth";
import { useContext } from "react";

export function useAuth(): AuthContextType {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}

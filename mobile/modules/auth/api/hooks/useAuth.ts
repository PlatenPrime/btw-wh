import { AuthContext } from "@/modules/auth/providers/auth-provider/auth-provider.tsx";
import { useContext } from "react";
import type { AuthContextType } from "../types";

export function useAuth(): AuthContextType {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}


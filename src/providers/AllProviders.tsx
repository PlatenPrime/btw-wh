import React from "react";
import { AuthProvider } from "./AuthProvider";

export function AllProviders({ children }: { children: React.ReactNode }) {
  return <AuthProvider>{children}</AuthProvider>;
}

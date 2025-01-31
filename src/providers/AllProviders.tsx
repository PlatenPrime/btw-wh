import { QueryProvider } from "@/providers/QueryProvider";
import React from "react";

export function AllProviders({ children }: { children: React.ReactNode }) {
  return <QueryProvider>{children}</QueryProvider>;
}

import { AuthProvider } from "@/modules/auth/providers/auth-provider/auth-provider";
import { QueryProvider } from "./query-provider";

export const Providers = ({ children }: { children: React.ReactNode }) => {
  return (
    <AuthProvider>
      <QueryProvider>{children}</QueryProvider>
    </AuthProvider>
  );
};


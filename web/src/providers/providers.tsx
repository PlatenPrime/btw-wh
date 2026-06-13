import { AppVersionWatcherContainer } from "@/components/shared/app-version";
import { Toaster } from "@/components/ui/sonner";
import { AuthProvider } from "@/modules/auth/providers/auth-provider/auth-provider";
import { QueryProvider } from "./query-provider";
import { ThemeProvider } from "./theme-provider";

export const Providers = ({ children }: { children: React.ReactNode }) => {
  return (
    <AuthProvider>
      <QueryProvider>
        <ThemeProvider>
          <AppVersionWatcherContainer />
          {children}
          <Toaster />
        </ThemeProvider>
      </QueryProvider>
    </AuthProvider>
  );
};

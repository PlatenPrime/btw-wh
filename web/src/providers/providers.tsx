import { AppVersionWatcherContainer } from "@/components/shared/app-version";
import { Toaster } from "@/components/ui/sonner";
import { ApiTasksProvider } from "@/modules/apitasks/providers";
import { AuthProvider } from "@/modules/auth/providers/auth-provider/auth-provider";
import { ExcelJobsProvider } from "@/modules/excel-jobs/providers";
import { QueryProvider } from "./query-provider";
import { ThemeProvider } from "./theme-provider";

export const Providers = ({ children }: { children: React.ReactNode }) => {
  return (
    <AuthProvider>
      <QueryProvider>
        <ThemeProvider>
          <ExcelJobsProvider>
            <ApiTasksProvider>
              <AppVersionWatcherContainer />
              {children}
              <Toaster />
            </ApiTasksProvider>
          </ExcelJobsProvider>
        </ThemeProvider>
      </QueryProvider>
    </AuthProvider>
  );
};

import { AppVersionWatcherContainer } from "@/components/shared/app-version";
import { Toaster } from "@/components/ui/sonner";
import { AuthProvider } from "@/modules/auth/providers/auth-provider/auth-provider";
import { ExcelJobsPanel } from "@/modules/excel-jobs/components/containers/excel-jobs-panel";
import { ExcelJobsProvider } from "@/modules/excel-jobs/providers";
import { QueryProvider } from "./query-provider";
import { ThemeProvider } from "./theme-provider";

export const Providers = ({ children }: { children: React.ReactNode }) => {
  return (
    <AuthProvider>
      <QueryProvider>
        <ThemeProvider>
          <ExcelJobsProvider>
            <AppVersionWatcherContainer />
            {children}
            <ExcelJobsPanel />
            <Toaster />
          </ExcelJobsProvider>
        </ThemeProvider>
      </QueryProvider>
    </AuthProvider>
  );
};

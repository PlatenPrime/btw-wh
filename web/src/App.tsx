import { ErrorBoundary } from "@/components/shared/error-components";
import { Layout } from "@/components/shared/layout/layout";
import { ThemeProvider } from "@/providers/theme-provider.tsx";

function App() {
  return (
    <ErrorBoundary>
      <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
        <Layout />
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;

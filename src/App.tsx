import { ErrorBoundary } from "./components/error-components";
import { Layout } from "./components/layout/layout";
import { ThemeProvider } from "./providers/theme-provider";

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

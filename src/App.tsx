import { Layout } from "./components/layout/layout";
import { AuthProvider } from "./modules/auth/components/auth-provider";
import { ThemeProvider } from "./providers/theme-provider";

function App() {
  return (
    <AuthProvider>
      <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
        <Layout />
      </ThemeProvider>
    </AuthProvider>
  );
}

export default App;

import "./App.css";
import { ThemeProvider } from "./components/theme-provider";
import { Layout } from "./pages/layout";

function App() {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      {/* <h1 className="text-3xl font-bold underline bg-background text-foreground">
        Hello world!
      </h1>
      <Button variant="outline">Button</Button>
      <Button variant="secondary">Secondary</Button>
      <Button variant="destructive">Destructive</Button>
      <ModeToggle />
      <div
        className="bg-zinc-950 dark:bg-white size-8
      "
      />
      <div className="bg-primary text-primary-foreground ">Hello</div> */}
      <Layout />
    </ThemeProvider>
  );
}

export default App;

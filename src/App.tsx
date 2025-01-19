import LoginPage from "@/pages/login/LoginPage";
import { ThemeToggle } from "@/ThemeToggle";

function App() {
  return (
    <>
      <div className="bg-background text-foreground">background</div>

      <div className=" flex items-center justify-center">
        <ThemeToggle />
      </div>
      <LoginPage />
    </>
  );
}

export default App;

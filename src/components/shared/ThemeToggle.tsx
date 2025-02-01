import { useTheme } from "@/hooks/useTheme/useTheme";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";
import { Button } from "../ui/button";
import { MoonStar, Sun } from "lucide-react";

export function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();

  return (
    <Button
      variant="outline"
      onClick={toggleTheme}
     
    >
      <VisuallyHidden>Toggle theme</VisuallyHidden>
      {theme === "light" ? <Sun /> : <MoonStar />}
    </Button>
  );
}



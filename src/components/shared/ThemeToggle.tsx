import { useTheme } from "@/hooks/useTheme/useTheme";

export function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      className="p-2 rounded bg-gray-200 dark:bg-gray-800"
    >
      {theme === "light" ? "🌞" : "🌜"}
    </button>
  );
}

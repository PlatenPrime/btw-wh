import { ThemeProviderContext } from "@/providers/theme-provider";
import { useContext } from "react";
import { useColorScheme as useRNColorScheme } from "react-native";

export function useColorScheme() {
  const context = useContext(ThemeProviderContext);
  const systemColorScheme = useRNColorScheme();

  // Fallback на системный useColorScheme, если ThemeProvider недоступен
  if (context === undefined) {
    return systemColorScheme;
  }

  return context.resolvedTheme;
}

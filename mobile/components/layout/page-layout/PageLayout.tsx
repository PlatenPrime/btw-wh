import { Header, HeaderActionsProvider } from "@/components/layout/header";
import { ThemedBox } from "@/components/themed";
import { ThemedView } from "@/components/themed/themed-view";
import { useThemeValue } from "@/hooks/use-theme-value";
import { cn } from "@/lib/utils";
import { useSafeAreaInsets } from "react-native-safe-area-context";

interface PageLayoutProps {
  title: string;
  children: React.ReactNode;
}

export function PageLayout({ title, children }: PageLayoutProps) {
  const insets = useSafeAreaInsets();
  const headerHeight = 56 + insets.top;
  const theme = useThemeValue();

  return (
    <HeaderActionsProvider>
      <ThemedView className={cn("flex-1", theme === "dark" ? "bg-slate-950" : "bg-slate-100")}>
        <Header title={title} />
        <ThemedBox className="flex-1" style={{ paddingTop: headerHeight }}>
          {children}
        </ThemedBox>
      </ThemedView>
    </HeaderActionsProvider>
  );
}

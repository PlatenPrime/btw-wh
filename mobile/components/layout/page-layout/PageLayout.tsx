import { Header, HeaderActionsProvider } from "@/components/layout/header";
import { HeroGradient } from "@/components/shared/hero-gradient";
import { PageBackground } from "@/components/shared/page-background";
import { ThemedBox } from "@/components/themed";
import { ThemedView } from "@/components/themed/themed-view";
import { useThemeValue } from "@/hooks/use-theme-value";
import { cn } from "@/lib/utils";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { View } from "react-native";

interface PageLayoutProps {
  title: string;
  children: React.ReactNode;
  useHeroGradient?: boolean;
}

export function PageLayout({ title, children, useHeroGradient = false }: PageLayoutProps) {
  const insets = useSafeAreaInsets();
  const headerHeight = 56 + insets.top;
  const theme = useThemeValue();

  return (
    <HeaderActionsProvider>
      <ThemedView className={cn("flex-1", theme === "dark" ? "bg-neutral-950" : "bg-neutral-100")}>
        <PageBackground />
        <Header title={title} />
        <ThemedBox className="flex-1" style={{ paddingTop: headerHeight }}>
          {useHeroGradient ? (
            <View className="flex-1">
              <HeroGradient />
              {children}
            </View>
          ) : (
            children
          )}
        </ThemedBox>
      </ThemedView>
    </HeaderActionsProvider>
  );
}

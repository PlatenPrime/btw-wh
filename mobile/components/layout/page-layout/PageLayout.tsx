import { ThemedBox } from "@/components/themed";
import { ThemedView } from "@/components/themed/themed-view";
import { Header, HeaderActionsProvider } from "@/components/layout/header";
import { useSafeAreaInsets } from "react-native-safe-area-context";

interface PageLayoutProps {
  title: string;
  children: React.ReactNode;
}

export function PageLayout({ title, children }: PageLayoutProps) {
  const insets = useSafeAreaInsets();
  const headerHeight = 56 + insets.top;

  return (
    <HeaderActionsProvider>
      <ThemedView className="flex-1">
        <Header title={title} />
        <ThemedBox className="flex-1" style={{ paddingTop: headerHeight }}>
          {children}
        </ThemedBox>
      </ThemedView>
    </HeaderActionsProvider>
  );
}

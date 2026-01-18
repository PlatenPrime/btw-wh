import { ThemedText } from "@/components/themed/themed-text";
import { ThemedBox, ThemedHStack, ThemedPressable } from "@/components/themed";
import { ThemedView } from "@/components/themed/themed-view";
import { useThemeValue } from "@/hooks/use-theme-value";
import { cn } from "@/lib/utils";
import { View } from "react-native";

interface ZoneCardViewProps {
  title: string;
  bar: number;
  sector: number;
  onPress?: () => void;
  menu?: React.ReactNode;
}

export function ZoneCardView({
  title,
  bar,
  sector,
  onPress,
  menu,
}: ZoneCardViewProps) {
  const theme = useThemeValue();

  return (
    <ThemedView
      className={cn(
        "p-4 rounded-lg border bg-background-0",
        theme === "dark" ? "border-outline-50" : "border-outline-100"
      )}
    >
      <ThemedHStack className="items-center justify-between">
        <ThemedPressable onPress={onPress} className="flex-1">
          <ThemedBox className="flex-1 min-w-0 gap-2">
            <ThemedText type="title" className="text-xl">
              {title}
            </ThemedText>
            <ThemedBox className="gap-1">
              <ThemedText type="default" className="text-sm text-typography-500">
                Штрих-код: {bar}
              </ThemedText>
              <ThemedText type="default" className="text-sm text-typography-500">
                Сектор: {sector}
              </ThemedText>
            </ThemedBox>
          </ThemedBox>
        </ThemedPressable>
        {menu && <View>{menu}</View>}
      </ThemedHStack>
    </ThemedView>
  );
}


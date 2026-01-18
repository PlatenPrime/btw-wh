import { ThemedBox, ThemedHStack, ThemedPressable } from "@/components/themed";
import { ThemedView } from "@/components/themed/themed-view";
import { ThemedText } from "@/components/themed/themed-text";
import { useThemeValue } from "@/hooks/use-theme-value";
import { cn } from "@/lib/utils";
import { View } from "react-native";

interface RowCardViewProps {
  title: string;

  onPress: () => void;
  menu?: React.ReactNode;
}

export function RowCardView({
  title,

  onPress,
  menu,
}: RowCardViewProps) {
  const theme = useThemeValue();

  return (
    <ThemedView
      className={cn(
        "p-2 rounded-lg border bg-background-0",
        theme === "dark" ? "border-outline-50" : "border-outline-100"
      )}
    >
      <ThemedHStack className="items-center justify-between">
        <ThemedPressable onPress={onPress} className="flex-1">
          <ThemedBox className="flex-1 min-w-0 items-center justify-center ">
            <ThemedText type="title" className="text-xl">
              {title}
            </ThemedText>
          </ThemedBox>
        </ThemedPressable>
        {menu && <View>{menu}</View>}
      </ThemedHStack>
    </ThemedView>
  );
}

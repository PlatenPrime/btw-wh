import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";
import { Pressable, VStack } from "@/components/ui";
import { Icon, type IconFamily } from "@/components/ui/icon";
import { SemanticColors } from "@/constants/theme";
import { useThemeColors } from "@/hooks/use-theme-colors";
import { hexToRgba } from "@/utils/color-utils";
import type { QuickAccessTrigger } from "./types";

interface QuickAccessPanelViewProps {
  triggers: QuickAccessTrigger[];
}

export function QuickAccessPanelView({ triggers }: QuickAccessPanelViewProps) {
  // Используем Tailwind классы для статических цветов вместо style prop
  if (triggers.length === 0) {
    return null;
  }

  return (
    <ThemedView className="p-4 rounded-lg border border-outline-100 bg-background-0">
      <VStack className="gap-4">
        <ThemedText type="defaultSemiBold" className="text-lg text-center">
          Панель швидкого доступу
        </ThemedText>
        <VStack className="gap-3">
          {triggers.map((trigger) => {
            // iconColors остаются статическими hex значениями, так как это специфичные цвета
            const colorHex = SemanticColors.iconColors[trigger.color];
            const backgroundColor = hexToRgba(colorHex, 0.15);
            const borderColor = hexToRgba(colorHex, 0.9);

            return (
              <Pressable
                key={trigger.id}
                onPress={trigger.onPress}
                className="flex-row items-center p-4 rounded-lg"
                style={{
                  backgroundColor,
                  borderWidth: 1,
                  borderColor,
                }}
              >
                <Icon
                  family={(trigger.iconFamily || "MaterialIcons") as IconFamily}
                  name={trigger.icon as any}
                  size={24}
                  color={colorHex}
                />
                <ThemedText
                  type="defaultSemiBold"
                  className="ml-3 text-base flex-1"
                >
                  {trigger.title}
                </ThemedText>
              </Pressable>
            );
          })}
        </VStack>
      </VStack>
    </ThemedView>
  );
}

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
  const { card } = useThemeColors();

  if (triggers.length === 0) {
    return null;
  }

  return (
    <ThemedView
      className="p-4 rounded-lg border"
      style={{
        backgroundColor: card.bg,
        borderColor: card.border,
      }}
    >
      <VStack className="gap-4">
        <ThemedText type="defaultSemiBold" className="text-lg text-center">
          Панель швидкого доступу
        </ThemedText>
        <VStack className="gap-3">
          {triggers.map((trigger) => {
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

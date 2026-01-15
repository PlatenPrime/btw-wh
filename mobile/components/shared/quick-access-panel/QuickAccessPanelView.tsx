import {
  ThemedIcon,
  ThemedPressable,
  ThemedText,
  ThemedVStack,
  ThemedView,
} from "@/components/themed";
import type { IconFamily } from "@/components/types";
import { SemanticColors } from "@/constants/theme";
import { hexToRgba } from "@/utils/color-utils";
import type { QuickAccessTrigger } from "./types";

interface QuickAccessPanelViewProps {
  triggers: QuickAccessTrigger[];
}

export function QuickAccessPanelView({ triggers }: QuickAccessPanelViewProps) {
  if (triggers.length === 0) {
    return null;
  }

  return (
    <ThemedView className="p-4 rounded-lg border border-outline-50 bg-background-0">
      <ThemedVStack className="gap-4">
        <ThemedText type="defaultSemiBold" className="text-lg text-center">
          Панель швидкого доступу
        </ThemedText>
        <ThemedVStack className="gap-3">
          {triggers.map((trigger) => {
            const colorHex = SemanticColors.iconColors[trigger.color];
            const backgroundColor = hexToRgba(colorHex, 0.15);
            const borderColor = hexToRgba(colorHex, 0.9);

            return (
              <ThemedPressable
                key={trigger.id}
                onPress={trigger.onPress}
                className="flex-row items-center p-4 rounded-lg"
                style={{
                  backgroundColor,
                  borderWidth: 1,
                  borderColor,
                }}
              >
                <ThemedIcon
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
              </ThemedPressable>
            );
          })}
        </ThemedVStack>
      </ThemedVStack>
    </ThemedView>
  );
}

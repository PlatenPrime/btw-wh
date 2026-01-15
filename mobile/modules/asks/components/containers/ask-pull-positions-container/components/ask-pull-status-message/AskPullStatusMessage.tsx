import { ThemedHStack, ThemedIcon } from "@/components/themed";
import { ThemedText } from "@/components/themed/themed-text";
import type { AskPullStatusMessage } from "@/modules/asks/utils/get-ask-pull-status-message/getAskPullStatusMessage";

import { SemanticColors } from "@/constants/theme";
import { useTheme } from "@/providers/theme-provider";
import { hexToRgba } from "@/utils/color-utils";
import { View } from "react-native";

interface AskPullStatusMessageProps {
  statusMessage: AskPullStatusMessage;
}

export function AskPullStatusMessage({
  statusMessage,
}: AskPullStatusMessageProps) {
  const { resolvedTheme } = useTheme();
  const theme = resolvedTheme === "dark" ? "dark" : "light";

  // Используем цвета из SemanticColors напрямую
  // Для success используем emerald из iconColors (специфичный цвет)
  // и создаем полупрозрачный фон через opacity
  const statusMessageVariants = {
    success: {
      borderColor: SemanticColors.iconColors.emerald,
      // Используем hexToRgba для создания полупрозрачного фона из hex цвета
      bgColor: hexToRgba(SemanticColors.iconColors.emerald, 0.10),
      iconColor: SemanticColors.iconColors.emerald,
    },
    warning: {
      borderColor: SemanticColors.error.border,
      bgColor: SemanticColors.error.bg[theme],
      iconColor: SemanticColors.error.text,
    },
    default: {
      borderColor: SemanticColors.card.border[theme],
      bgColor: SemanticColors.card.bg[theme],
      iconColor: SemanticColors.iconColors.teal,
    },
  };

  const variant = statusMessageVariants[statusMessage.variant];

  return (
    <View
      className="rounded-lg  p-2"
      style={{
        backgroundColor: variant.bgColor,
        borderColor: variant.borderColor,
      }}
    >
      <ThemedHStack className="items-center gap-3">
        <ThemedIcon
          family="MaterialIcons"
          name={statusMessage.iconName}
          size={20}
          color={variant.iconColor}
        />
        <ThemedText type="default" className="text-sm flex-1">
          {statusMessage.message}
        </ThemedText>
      </ThemedHStack>
    </View>
  );
}

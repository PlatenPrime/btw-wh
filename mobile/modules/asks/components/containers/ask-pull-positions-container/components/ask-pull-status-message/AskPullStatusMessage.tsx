import { ThemedText } from "@/components/themed/themed-text";
import { ThemedIcon } from "@/components/themed";
import type { AskPullStatusMessage } from "@/modules/asks/utils/get-ask-pull-status-message/getAskPullStatusMessage";
import { ThemedHStack } from "@/components/themed";
import { useThemeColors } from "@/hooks/use-theme-colors";
import { SemanticColors } from "@/constants/theme";
import { hexToRgba } from "@/utils/color-utils";
import { View } from "react-native";

interface AskPullStatusMessageProps {
  statusMessage: AskPullStatusMessage;
}

export function AskPullStatusMessage({
  statusMessage,
}: AskPullStatusMessageProps) {
  const { card, error } = useThemeColors();

  // Используем цвета из токенов через useThemeColors
  // Для success используем emerald из iconColors (специфичный цвет)
  // и создаем полупрозрачный фон через opacity
  const statusMessageVariants = {
    success: {
      borderColor: SemanticColors.iconColors.emerald,
      // Используем hexToRgba для создания полупрозрачного фона из hex цвета
      bgColor: hexToRgba(SemanticColors.iconColors.emerald, 0.15),
      iconColor: SemanticColors.iconColors.emerald,
    },
    warning: {
      borderColor: error.border,
      bgColor: error.bg,
      iconColor: error.text,
    },
    default: {
      borderColor: card.border,
      bgColor: card.bg,
      iconColor: SemanticColors.iconColors.teal,
    },
  };

  const variant = statusMessageVariants[statusMessage.variant];

  return (
    <View
      className="rounded-lg border p-2"
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


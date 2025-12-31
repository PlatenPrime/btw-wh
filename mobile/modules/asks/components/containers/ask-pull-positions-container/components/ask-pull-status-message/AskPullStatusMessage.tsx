import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";
import { Icon } from "@/components/ui/icon";
import type { AskPullStatusMessage } from "@/modules/asks/utils/get-ask-pull-status-message/getAskPullStatusMessage";
import { HStack } from "@/components/ui";
import { useThemeColors } from "@/hooks/use-theme-colors";
import { SemanticColors } from "@/constants/theme";
import { useColorScheme } from "nativewind";
import { View } from "react-native";

interface AskPullStatusMessageProps {
  statusMessage: AskPullStatusMessage;
}

export function AskPullStatusMessage({
  statusMessage,
}: AskPullStatusMessageProps) {
  const { card } = useThemeColors();
  const { colorScheme } = useColorScheme();
  const theme = colorScheme === "dark" ? "dark" : "light";

  const statusMessageVariants = {
    success: {
      borderColor: SemanticColors.iconColors.emerald,
      bgColor: theme === "light" ? "#d1fae555" : "#064e3b55",
      iconColor: SemanticColors.iconColors.emerald,
    },
    warning: {
      borderColor: SemanticColors.error.border,
      bgColor: SemanticColors.error.bg[theme],
      iconColor: SemanticColors.error.text,
    },
    default: {
      borderColor: card.border,
      bgColor: card.bg,
      iconColor: SemanticColors.iconColors.teal ,
    },
  };

  const variant = statusMessageVariants[statusMessage.variant];

  return (
    <View
      className="rounded-lg border p-2 "
      style={{
        backgroundColor: variant.bgColor,
        borderColor: variant.borderColor,
      }}
    >
      <HStack className="items-center gap-3">
        <Icon
          family="MaterialIcons"
          name={statusMessage.iconName}
          size={20}
          color={variant.iconColor}
        />
        <ThemedText type="default" className="text-sm flex-1">
          {statusMessage.message}
        </ThemedText>
      </HStack>
    </View>
  );
}


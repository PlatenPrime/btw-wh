import { ThemedText } from "@/components/themed/themed-text";
import { Icon } from "@/components/ui/icon";
import { SemanticColors } from "@/constants/theme";
import { useThemeColors } from "@/hooks/use-theme-colors";
import { formatDateTime } from "@/modules/asks/utils/format-date";
import type { ExistingAsk } from "@/modules/defs/api/types/dto";
import { View } from "react-native";

interface DefCardAskBidProps {
  ask: ExistingAsk;
}

export function DefCardAskBid({ ask }: DefCardAskBidProps) {
  const { theme } = useThemeColors();

  return (
    <View
      className="rounded-md border p-2"
      style={{
        borderColor: theme === "dark" ? "rgba(196, 181, 253, 0.2)" : "#e9d5ff",
        backgroundColor:
          theme === "dark" ? "rgba(139, 92, 246, 0.2)" : "#f3e8ff",
      }}
    >
      <View className="flex-row items-center gap-2">
        <Icon family="MaterialIcons" name="person" size={16} color={SemanticColors.iconColors.indigo} />
        <ThemedText className="text-sm">{ask.askerName}</ThemedText>
      </View>
      <View className="flex-row items-center gap-2">
        <Icon family="MaterialIcons" name="calendar-month" size={16} color={SemanticColors.iconColors.indigo} />
        <ThemedText className="text-sm">{formatDateTime(ask.createdAt)}</ThemedText>
      </View>
    </View>
  );
}

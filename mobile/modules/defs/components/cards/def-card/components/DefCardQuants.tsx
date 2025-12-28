import { View } from "react-native";
import { ThemedText } from "@/components/themed-text";
import type { DeficitItem } from "@/modules/defs/api/types/dto";
import { useThemeColors } from "@/hooks/use-theme-colors";

interface DefCardQuantsProps {
  defItem: DeficitItem;
}

export function DefCardQuants({ defItem }: DefCardQuantsProps) {
  const { theme } = useThemeColors();
  const isCritical = defItem.status === "critical";
  const quantColor = defItem.quant === 0 ? "#dc2626" : undefined; // red-600
  const difQuantColor = isCritical ? "#dc2626" : "#d97706"; // red-600 : amber-600

  return (
    <View className="gap-1 px-2 pb-2">
            <View className="flex-row justify-between border-b border-outline-100 pb-1">
        <ThemedText className="text-sm">Сайт:</ThemedText>
        <ThemedText className="text-sm font-medium">
          {defItem.sharikQuant}
        </ThemedText>
      </View>
      <View className="flex-row justify-between border-b border-outline-100 pb-1">
        <ThemedText className="text-sm">Запаси:</ThemedText>
        <ThemedText
          className="text-sm font-medium"
          style={quantColor ? { color: quantColor } : undefined}
        >
          {defItem.quant}
        </ThemedText>
      </View>

      <View className="flex-row justify-between border-b border-outline-100 pb-1">
        <ThemedText className="text-sm">Вітрина:</ThemedText>
        <ThemedText
          className="text-sm font-medium"
          style={{ color: difQuantColor }}
        >
          {defItem.difQuant}
        </ThemedText>
      </View>
    </View>
  );
}

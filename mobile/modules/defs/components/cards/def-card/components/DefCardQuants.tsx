import { ThemedIcon } from "@/components/themed";
import { ThemedText } from "@/components/themed/themed-text";
import type { DeficitItem } from "@/modules/defs/api/types/dto";
import { View } from "react-native";

interface DefCardQuantsProps {
  defItem: DeficitItem;
}

const ICON_COLORS = {
  light: "#6b7280",
  dark: "#9ca3af",
} as const;

export function DefCardQuants({ defItem }: DefCardQuantsProps) {
  const isCritical = defItem.status === "critical";
  const quantColor = defItem.quant === 0 ? "#dc2626" : undefined; // red-600
  const difQuantColor = isCritical ? "#dc2626" : "#d97706"; // red-600 : amber-600

  return (
    <View className="gap-1 px-2 pb-2">
      <View
        className="flex-row justify-between border-b border-outline-50 pb-1 items-center"
        accessibilityLabel={`Сайт: ${defItem.sharikQuant}`}
      >
        <ThemedIcon
          family="MaterialIcons"
          name="language"
          size={16}
          lightColor={ICON_COLORS.light}
          darkColor={ICON_COLORS.dark}
        />
        <ThemedText className="text-sm font-medium">
          {defItem.sharikQuant}
        </ThemedText>
      </View>
      <View
        className="flex-row justify-between border-b border-outline-50 pb-1 items-center"
        accessibilityLabel={`Запаси: ${defItem.quant}`}
      >
        <ThemedIcon
          family="MaterialIcons"
          name="warehouse"
          size={16}
          lightColor={ICON_COLORS.light}
          darkColor={ICON_COLORS.dark}
        />
        <ThemedText
          className="text-sm font-medium"
          style={quantColor ? { color: quantColor } : undefined}
        >
          {defItem.quant}
        </ThemedText>
      </View>
      <View
        className="flex-row justify-between border-b border-outline-50 pb-1 items-center"
        accessibilityLabel={`Вітрина: ${defItem.difQuant}`}
      >
        <ThemedIcon
          family="MaterialIcons"
          name="storefront"
          size={16}
          lightColor={ICON_COLORS.light}
          darkColor={ICON_COLORS.dark}
        />
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

import { View } from "react-native";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { ThemedText } from "@/components/themed-text";

interface PalletInfoViewProps {
  totalPositions: number;
  totalBoxes: number;
  iconColor: string;
}

export function PalletInfoView({
  totalPositions,
  totalBoxes,
  iconColor,
}: PalletInfoViewProps) {
  return (
    <View className="flex-row items-center justify-center gap-4">
      <View className="flex-row items-center gap-1">
        <MaterialIcons name="description" size={16} color={iconColor} />
        <ThemedText type="defaultSemiBold" className="text-sm">
          {totalPositions}
        </ThemedText>
      </View>

      <View className="flex-row items-center gap-1">
        <MaterialIcons name="inventory" size={16} color={iconColor} />
        <ThemedText type="defaultSemiBold" className="text-sm">
          {totalBoxes}
        </ThemedText>
      </View>
    </View>
  );
}


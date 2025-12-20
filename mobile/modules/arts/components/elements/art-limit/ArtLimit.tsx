import { View } from "react-native";
import { ThemedText } from "@/components/themed-text";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";

interface ArtLimitProps {
  limit: number | undefined;
}

export function ArtLimit({ limit }: ArtLimitProps) {
  if (!limit) return null;

  const iconColor = "#ef4444"; // rose-500

  return (
    <View className="flex-row items-center gap-2">
      <MaterialIcons name="swap-horiz" size={16} color={iconColor} />
      <ThemedText type="default" className="text-xs">
        {limit}
      </ThemedText>
    </View>
  );
}


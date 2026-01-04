import { View } from "react-native";
import { ThemedText } from "@/components/themed/themed-text";
import { ThemedIcon } from "@/components/themed";
import { SemanticColors } from "@/constants/theme";

interface ArtLimitProps {
  limit: number | undefined;
}

export function ArtLimit({ limit }: ArtLimitProps) {
  if (!limit) return null;

  const iconColor = SemanticColors.destructive;

  return (
    <View className="flex-row items-center gap-2">
      <ThemedIcon family="MaterialIcons" name="swap-horiz" size={16} color={iconColor} />
      <ThemedText type="default" className="text-sm">
        {limit}
      </ThemedText>
    </View>
  );
}


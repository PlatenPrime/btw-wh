import { View } from "react-native";
import { ThemedText } from "@/components/themed-text";
import { Icon } from "@/components/ui/icon";
import { SemanticColors } from "@/constants/theme";

interface ArtLimitProps {
  limit: number | undefined;
}

export function ArtLimit({ limit }: ArtLimitProps) {
  if (!limit) return null;

  const iconColor = SemanticColors.destructive;

  return (
    <View className="flex-row items-center gap-2">
      <Icon family="MaterialIcons" name="swap-horiz" size={16} color={iconColor} />
      <ThemedText type="default" className="text-xs">
        {limit}
      </ThemedText>
    </View>
  );
}


import { View } from "react-native";
import { ThemedText } from "@/components/themed/themed-text";
import { ThemedIcon } from "@/components/themed";
import { SemanticColors } from "@/constants/theme";

interface AskZoneProps {
  zone?: string;
}

export function AskZone({ zone }: AskZoneProps) {
  if (!zone) {
    return null;
  }

  const iconColor = SemanticColors.icon.orange;

  return (
    <View className="flex-row items-center gap-2">
      <ThemedIcon family="MaterialIcons" name="place" size={16} color={iconColor} />
      <ThemedText type="default" className="text-sm">
        {zone}
      </ThemedText>
    </View>
  );
}

import { View } from "react-native";
import { ThemedText } from "@/components/themed/themed-text";
import { ThemedIcon } from "@/components/themed";
import type { ArtDto } from "@/modules/arts/api/types/dto";
import { useColorScheme } from "@/hooks/use-color-scheme";
import { SemanticColors } from "@/constants/theme";

interface ArtZoneProps {
  artData: ArtDto;
}

export function ArtZone({ artData }: ArtZoneProps) {
  const colorScheme = useColorScheme() ?? "light";
  const iconColor = SemanticColors.icon.orange;

  return (
    <View className="flex-row items-center gap-2">
      <ThemedIcon family="MaterialIcons" name="place" size={16} color={iconColor} />
      <ThemedText type="default" className="text-sm">
        {artData.zone}
      </ThemedText>
    </View>
  );
}


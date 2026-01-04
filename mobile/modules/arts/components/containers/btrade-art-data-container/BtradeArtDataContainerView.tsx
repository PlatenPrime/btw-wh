import { View } from "react-native";
import { ThemedText } from "@/components/themed/themed-text";
import { ThemedIcon } from "@/components/themed";
import type { BtradeArtInfoDto } from "@/modules/arts/api/types/dto";
import { SemanticColors } from "@/constants/theme";

interface BtradeArtDataContainerViewProps {
  data: BtradeArtInfoDto;
}

export function BtradeArtDataContainerView({
  data,
}: BtradeArtDataContainerViewProps) {
  return (
    <View className="gap-2">
      <View className="flex-row items-center gap-2">
        <ThemedIcon family="MaterialIcons" name="warehouse" size={16} color={SemanticColors.icon.warehouse} />
        <ThemedText type="default" className="text-sm">
          {data.quantity}
        </ThemedText>
      </View>
      <View className="flex-row items-center gap-2">
        <ThemedIcon family="MaterialIcons" name="attach-money" size={16} color={SemanticColors.icon.money} />
        <ThemedText type="default" className="text-sm">
          {data.price} грн
        </ThemedText>
      </View>
    </View>
  );
}


import { View } from "react-native";
import { ThemedText } from "@/components/themed-text";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
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
        <MaterialIcons name="warehouse" size={16} color={SemanticColors.icon.warehouse} />
        <ThemedText type="default" className="text-xs">
          {data.quantity}
        </ThemedText>
      </View>
      <View className="flex-row items-center gap-2">
        <MaterialIcons name="attach-money" size={16} color={SemanticColors.icon.money} />
        <ThemedText type="default" className="text-xs">
          {data.price} грн
        </ThemedText>
      </View>
    </View>
  );
}


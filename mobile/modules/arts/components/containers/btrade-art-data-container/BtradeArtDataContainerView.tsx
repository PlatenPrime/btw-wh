import { View } from "react-native";
import { ThemedText } from "@/components/themed-text";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import type { BtradeArtInfoDto } from "@/modules/arts/api/types/dto";

interface BtradeArtDataContainerViewProps {
  data: BtradeArtInfoDto;
}

export function BtradeArtDataContainerView({
  data,
}: BtradeArtDataContainerViewProps) {
  return (
    <View className="gap-2">
      <View className="flex-row items-center gap-2">
        <MaterialIcons name="warehouse" size={16} color="#0ea5e9" />
        <ThemedText type="default" className="text-xs">
          {data.quantity}
        </ThemedText>
      </View>
      <View className="flex-row items-center gap-2">
        <MaterialIcons name="attach-money" size={16} color="#10b981" />
        <ThemedText type="default" className="text-xs">
          {data.price} грн
        </ThemedText>
      </View>
    </View>
  );
}


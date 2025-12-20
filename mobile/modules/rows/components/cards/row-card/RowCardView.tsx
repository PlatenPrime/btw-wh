import { ThemedText } from "@/components/themed-text";
import { TouchableOpacity, View } from "react-native";

interface RowCardViewProps {
  title: string;
  palletsCount: number;
  onPress: () => void;
  bgColor: string;
  borderColor: string;
}

export function RowCardView({
  title,
  palletsCount,
  onPress,
  bgColor,
  borderColor,
}: RowCardViewProps) {
  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={0.7}
      className="p-4 rounded-lg border"
      style={{
        backgroundColor: bgColor,
        borderColor: borderColor,
      }}
    >
      <View className="items-center">
        <ThemedText type="title" className="text-xl mb-2">
          {title}
        </ThemedText>
        <ThemedText type="default" className="text-sm">
          Паллет: {palletsCount}
        </ThemedText>
      </View>
    </TouchableOpacity>
  );
}


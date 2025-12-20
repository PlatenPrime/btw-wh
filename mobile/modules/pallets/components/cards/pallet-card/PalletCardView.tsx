import { ThemedText } from "@/components/themed-text";
import { TouchableOpacity, View } from "react-native";

interface PalletCardViewProps {
  title: string;
  sector?: string;
  isEmpty: boolean;
  isDef: boolean;
  onPress: () => void;
  bgColor: string;
  borderColor: string;
}

export function PalletCardView({
  title,
  sector,
  isEmpty,
  isDef,
  onPress,
  bgColor,
  borderColor,
}: PalletCardViewProps) {
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
      <View className="gap-2">
        <View className="flex-row items-center justify-between">
          <ThemedText type="title" className="text-lg">
            {title}
          </ThemedText>
          {isEmpty && (
            <View className="rounded-md px-2 py-1 bg-gray-200 dark:bg-gray-700">
              <ThemedText type="default" className="text-xs">
                порожня
              </ThemedText>
            </View>
          )}
        </View>
        <View className="gap-1">
          <View className="flex-row items-center justify-between">
            <ThemedText type="default" className="text-xs">
              Сектор:
            </ThemedText>
            <ThemedText type="default" className="text-xs">
              {sector ?? "Немає"}
            </ThemedText>
          </View>
          <View className="flex-row items-center justify-between">
            <ThemedText type="default" className="text-xs">
              Аналіз:
            </ThemedText>
            <ThemedText type="default" className="text-xs">
              {isDef ? "Так" : "Ні"}
            </ThemedText>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
}


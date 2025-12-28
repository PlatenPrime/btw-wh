import { View } from "react-native";
import { ThemedText } from "@/components/themed-text";

export function DefsGridEmpty() {
  return (
    <View className="flex-1 justify-center items-center py-12">
      <ThemedText type="title" className="text-lg font-medium mb-2">
        Немає дефіцитів
      </ThemedText>
      <ThemedText type="default" className="text-sm opacity-70">
        Всі артикули в нормі
      </ThemedText>
    </View>
  );
}

import { ThemedView } from "@/components/themed-view";
import { ThemedText } from "@/components/themed-text";
import { View } from "react-native";
import { useLocalSearchParams } from "expo-router";

export default function AskScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();

  if (!id) {
    return (
      <ThemedView className="flex-1 justify-center items-center p-4">
        <ThemedText type="default" className="text-center">
          ID запиту не знайдено
        </ThemedText>
      </ThemedView>
    );
  }

  return (
    <ThemedView className="flex-1">
      <View className="flex-1 justify-center items-center p-4">
        <ThemedText type="title">Запит: {id}</ThemedText>
      </View>
    </ThemedView>
  );
}

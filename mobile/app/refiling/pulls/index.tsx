import { ThemedView } from "@/components/themed-view";
import { ThemedText } from "@/components/themed-text";
import { View } from "react-native";

export default function PullsScreen() {
  return (
    <ThemedView className="flex-1">
      <View className="flex-1 justify-center items-center p-4">
        <ThemedText type="title">Зняття</ThemedText>
      </View>
    </ThemedView>
  );
}

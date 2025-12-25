import { AsksFetcher } from "@/modules/asks/components/fetchers/asks-fetcher/AsksFetcher";
import { ThemedView } from "@/components/themed-view";
import { ThemedText } from "@/components/themed-text";
import { View } from "react-native";

export default function AsksScreen() {
  return (
    <ThemedView className="flex-1">
      <View className="flex-1">
        <AsksFetcher />
      </View>
    </ThemedView>
  );
}

import { ThemedText } from "@/components/themed/themed-text";
import { ThemedView } from "@/components/themed/themed-view";
import { Image } from "expo-image";
import { View } from "react-native";

export function HomeLogoView() {
  return (
    <ThemedView className="p-4 rounded-lg border border-outline-50 items-center bg-background-0">
      <View className="rounded-lg p-2">
        <Image
          source={require("@/assets/images/logo-btw.jpg")}
          style={{ width: 220, height: 220, borderRadius: 10 }}
          contentFit="contain"
        />
      </View>
      <ThemedText type="title" className="text-center text-2xl">
        BTrade Warehouse App
      </ThemedText>
    </ThemedView>
  );
}

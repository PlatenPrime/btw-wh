import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";
import { useThemeColors } from "@/hooks/use-theme-colors";
import { Image } from "expo-image";
import { View } from "react-native";

export function HomeLogoView() {
  const { card } = useThemeColors();

  return (
    <ThemedView
      className="p-4 rounded-lg border items-center"
      style={{
        backgroundColor: card.bg,
        borderColor: card.border,
      }}
    >
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

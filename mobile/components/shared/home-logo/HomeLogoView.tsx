import { GlassCard } from "@/components/shared/glass-card";
import { ThemedText } from "@/components/themed/themed-text";
import { Image } from "expo-image";
import { View } from "react-native";

export function HomeLogoView() {
  return (
    <GlassCard className="items-center p-6">
      <View className="items-center gap-4">
        <View className="overflow-hidden rounded-xl p-2">
          <Image
            source={require("@/assets/images/logo-btw.jpg")}
            style={{ width: 220, height: 220, borderRadius: 12 }}
            contentFit="contain"
          />
        </View>
        <ThemedText
          type="title"
          className="text-center text-3xl font-bold tracking-tight"
        >
          BTrade Warehouse App
        </ThemedText>
        <ThemedText
          type="default"
          className="text-center text-base text-typography-500"
        >
          Warehouse Management
        </ThemedText>
      </View>
    </GlassCard>
  );
}

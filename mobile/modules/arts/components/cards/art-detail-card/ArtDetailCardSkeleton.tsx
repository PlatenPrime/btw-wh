import { View } from "react-native";
import { ThemedView } from "@/components/themed-view";
import { useColorScheme } from "@/hooks/use-color-scheme";
import { BtradeArtDataSkeleton } from "@/modules/arts/components/containers/btrade-art-data-container/BtradeArtDataSkeleton";

export function ArtDetailCardSkeleton() {
  const colorScheme = useColorScheme() ?? "light";
  const bgColor = colorScheme === "light" ? "#fff" : "#1f2937";
  const borderColor = colorScheme === "light" ? "#d1d5db" : "#4b5563";

  return (
    <ThemedView
      className="p-3 rounded-lg border"
      style={{
        backgroundColor: bgColor,
        borderColor: borderColor,
      }}
    >
      <View className="gap-3">
        {/* Скелетон для изображения и названия */}
        <View className="flex-row items-start gap-3">
          <ThemedView className="h-[60px] w-[60px] rounded-lg" />
          <View className="flex-1 gap-2">
            <ThemedView className="h-4 w-32 rounded" />
            <ThemedView className="h-3 w-48 rounded" />
          </View>
        </View>

        {/* Скелетон для зоны, лимита и данных Btrade */}
        <View className="gap-2">
          <View className="flex-row items-center gap-2">
            <ThemedView className="h-4 w-4 rounded" />
            <ThemedView className="h-3 w-12 rounded" />
          </View>
          <View className="flex-row items-center gap-2">
            <ThemedView className="h-4 w-4 rounded" />
            <ThemedView className="h-3 w-12 rounded" />
          </View>
          <BtradeArtDataSkeleton />
        </View>
      </View>
    </ThemedView>
  );
}


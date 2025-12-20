import { View } from "react-native";
import { ThemedView } from "@/components/themed-view";
import { useColorScheme } from "@/hooks/use-color-scheme";

export function ArtGridCardSkeleton() {
  const colorScheme = useColorScheme() ?? "light";

  const bgColor = colorScheme === "light" ? "#fff" : "#1f2937";
  const borderColor = colorScheme === "light" ? "#d1d5db" : "#4b5563";
  const skeletonColor = colorScheme === "light" ? "#e5e7eb" : "#374151";

  return (
    <View
      className="flex-row items-center p-3 rounded-lg border"
      style={{
        backgroundColor: bgColor,
        borderColor: borderColor,
      }}
    >
      <View
        style={{
          width: 60,
          height: 60,
          borderRadius: 8,
          backgroundColor: skeletonColor,
        }}
      />
      <View className="ml-3 flex-1">
        <View
          style={{
            height: 16,
            width: 120,
            borderRadius: 4,
            backgroundColor: skeletonColor,
            marginBottom: 8,
          }}
        />
        <View
          style={{
            height: 14,
            width: "100%",
            borderRadius: 4,
            backgroundColor: skeletonColor,
            marginBottom: 4,
          }}
        />
        <View
          style={{
            height: 14,
            width: "80%",
            borderRadius: 4,
            backgroundColor: skeletonColor,
          }}
        />
      </View>
    </View>
  );
}

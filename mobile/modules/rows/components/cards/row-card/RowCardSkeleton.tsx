import { View } from "react-native";
import { ThemedText } from "@/components/themed-text";

export function RowCardSkeleton() {
  return (
    <View className="p-4 rounded-lg border border-gray-300 bg-gray-100 dark:bg-gray-800 dark:border-gray-700">
      <View className="items-center">
        <View className="h-6 w-24 bg-gray-300 dark:bg-gray-600 rounded mb-2" />
        <View className="h-4 w-16 bg-gray-300 dark:bg-gray-600 rounded" />
      </View>
    </View>
  );
}


import { View } from "react-native";

export function PalletCardSkeleton() {
  return (
    <View className="p-4 rounded-lg border border-gray-300 bg-gray-100 dark:bg-gray-800 dark:border-gray-700">
      <View className="gap-2">
        <View className="flex-row items-center justify-between">
          <View className="h-5 w-24 bg-gray-300 dark:bg-gray-600 rounded" />
          <View className="h-4 w-16 bg-gray-300 dark:bg-gray-600 rounded" />
        </View>
        <View className="gap-1">
          <View className="h-3 w-full bg-gray-300 dark:bg-gray-600 rounded" />
          <View className="h-3 w-3/4 bg-gray-300 dark:bg-gray-600 rounded" />
        </View>
      </View>
    </View>
  );
}


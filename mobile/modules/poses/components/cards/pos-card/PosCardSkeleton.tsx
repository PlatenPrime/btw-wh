import { View } from "react-native";

export function PosCardSkeleton() {
  return (
    <View className="p-4 rounded-lg border border-gray-300 bg-gray-100 dark:bg-gray-800 dark:border-gray-700">
      <View className="gap-2">
        <View>
          <View className="h-5 w-32 bg-gray-300 dark:bg-gray-600 rounded mb-2" />
          <View className="h-4 w-full bg-gray-300 dark:bg-gray-600 rounded mb-2" />
        </View>
        <View className="flex-row gap-4">
          <View className="flex-1">
            <View className="h-3 w-16 bg-gray-300 dark:bg-gray-600 rounded mb-1" />
            <View className="h-4 w-20 bg-gray-300 dark:bg-gray-600 rounded" />
          </View>
          <View className="flex-1">
            <View className="h-3 w-16 bg-gray-300 dark:bg-gray-600 rounded mb-1" />
            <View className="h-4 w-12 bg-gray-300 dark:bg-gray-600 rounded" />
          </View>
          <View className="flex-1">
            <View className="h-3 w-16 bg-gray-300 dark:bg-gray-600 rounded mb-1" />
            <View className="h-4 w-12 bg-gray-300 dark:bg-gray-600 rounded" />
          </View>
        </View>
      </View>
    </View>
  );
}


import { View } from "react-native";
import { RowCardSkeleton } from "@/modules/rows/components/cards/row-card/RowCardSkeleton";

export function RowsContainerSkeleton() {
  return (
    <View className="flex-1 p-2">
      {[1, 2, 3, 4].map((i) => (
        <View key={i} className="mb-2">
          <RowCardSkeleton />
        </View>
      ))}
    </View>
  );
}


import { View } from "react-native";
import { AsksListCardSkeleton } from "@/modules/asks/components/cards/asks-list-card/AsksListCardSkeleton";

export function AsksListSkeleton() {
  return (
    <View className="gap-2">
      {Array.from({ length: 3 }).map((_, index) => (
        <AsksListCardSkeleton key={index} />
      ))}
    </View>
  );
}


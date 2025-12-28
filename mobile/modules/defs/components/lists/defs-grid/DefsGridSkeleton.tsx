import { View } from "react-native";
import { DefCardSkeleton } from "@/modules/defs/components/cards/def-card/DefCardSkeleton";

export function DefsGridSkeleton() {
  return (
    <View className="gap-2">
      {[1, 2, 3, 4, 5].map((item) => (
        <DefCardSkeleton key={item} />
      ))}
    </View>
  );
}
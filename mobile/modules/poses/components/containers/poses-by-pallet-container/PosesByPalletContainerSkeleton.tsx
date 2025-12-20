import { View } from "react-native";
import { PosCardSkeleton } from "@/modules/poses/components/cards/pos-card/PosCardSkeleton";

export function PosesByPalletContainerSkeleton() {
  return (
    <View className="flex-1 p-2">
      {[1, 2, 3, 4].map((i) => (
        <View key={i} className="mb-2">
          <PosCardSkeleton />
        </View>
      ))}
    </View>
  );
}


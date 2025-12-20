import { View } from "react-native";
import { PalletCardSkeleton } from "@/modules/pallets/components/cards/pallet-card/PalletCardSkeleton";

export function PalletsByRowContainerSkeleton() {
  return (
    <View className="flex-1 p-2">
      {[1, 2, 3, 4].map((i) => (
        <View key={i} className="mb-2">
          <PalletCardSkeleton />
        </View>
      ))}
    </View>
  );
}


import { ThemedVStack } from "@/components/themed";
import { ArtsByZoneContainerSkeleton } from "@/modules/zones/components/containers/arts-by-zone-container/ArtsByZoneContainerSkeleton";
import { ZoneDetailsCardSkeleton } from "@/modules/zones/components/cards/zone-details-card/ZoneDetailsCardSkeleton";
import { ScrollView, View } from "react-native";

export function ZoneContainerSkeleton() {
  return (
    <View className="flex-1">
      <ScrollView className="flex-1" contentContainerClassName="gap-4 p-4">
        <ThemedVStack className="gap-4">
          <ZoneDetailsCardSkeleton />
          <ArtsByZoneContainerSkeleton />
        </ThemedVStack>
      </ScrollView>
    </View>
  );
}

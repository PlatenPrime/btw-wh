import { ThemedBox } from "@/components/themed";
import { ZoneCardSkeleton } from "@/modules/zones/components/cards/zone-card/ZoneCardSkeleton";

export function ZonesContainerSkeleton() {
  return (
    <ThemedBox className="flex-1 p-2">
      {Array.from({ length: 10 }, (_, index) => index).map((index) => (
        <ThemedBox key={index} className="mb-2">
          <ZoneCardSkeleton />
        </ThemedBox>
      ))}
    </ThemedBox>
  );
}


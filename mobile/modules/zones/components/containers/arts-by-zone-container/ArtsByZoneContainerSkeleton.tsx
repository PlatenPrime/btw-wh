import { ThemedVStack, ThemedBox } from "@/components/themed";
import { ThemedText } from "@/components/themed/themed-text";
import { ArtGridCardSkeleton } from "@/modules/arts/components/cards/arts-grid-card/ArtGridCardSkeleton";

export function ArtsByZoneContainerSkeleton() {
  return (
    <ThemedVStack className="gap-4">
      <ThemedText type="defaultSemiBold" className="text-lg">
        Артикули
      </ThemedText>
      <ThemedVStack className="gap-2">
        {Array.from({ length: 5 }).map((_, index) => (
          <ThemedBox key={`skeleton-${index}`} className="mb-2">
            <ArtGridCardSkeleton />
          </ThemedBox>
        ))}
      </ThemedVStack>
    </ThemedVStack>
  );
}


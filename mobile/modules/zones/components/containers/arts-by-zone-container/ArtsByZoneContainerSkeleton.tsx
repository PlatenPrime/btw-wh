import { VStack, Box } from "@/components/ui";
import { ThemedText } from "@/components/themed-text";
import { ArtGridCardSkeleton } from "@/modules/arts/components/cards/arts-grid-card/ArtGridCardSkeleton";

export function ArtsByZoneContainerSkeleton() {
  return (
    <VStack className="gap-4">
      <ThemedText type="defaultSemiBold" className="text-lg">
        Артикули
      </ThemedText>
      <VStack className="gap-2">
        {Array.from({ length: 5 }).map((_, index) => (
          <Box key={`skeleton-${index}`} className="mb-2">
            <ArtGridCardSkeleton />
          </Box>
        ))}
      </VStack>
    </VStack>
  );
}


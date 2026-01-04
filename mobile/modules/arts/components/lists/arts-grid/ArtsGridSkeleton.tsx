import { ThemedFlatList, ThemedBox } from "@/components/themed";
import { ArtGridCardSkeleton } from "@/modules/arts/components/cards/arts-grid-card/ArtGridCardSkeleton";

export function ArtsGridSkeleton() {
  return (
    <ThemedFlatList
      data={Array.from({ length: 10 })}
      renderItem={() => (
        <ThemedBox className="mb-2">
          <ArtGridCardSkeleton />
        </ThemedBox>
      )}
      keyExtractor={(_, index) => `skeleton-${index}`}
      numColumns={1}
      contentContainerClassName="p-2"
      showsVerticalScrollIndicator={false}
    />
  );
}

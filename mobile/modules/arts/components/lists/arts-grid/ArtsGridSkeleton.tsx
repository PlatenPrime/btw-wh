import { FlatList, Box } from "@/components/ui";
import { ArtGridCardSkeleton } from "@/modules/arts/components/cards/arts-grid-card/ArtGridCardSkeleton";

export function ArtsGridSkeleton() {
  return (
    <FlatList
      data={Array.from({ length: 10 })}
      renderItem={() => (
        <Box className="mb-2">
          <ArtGridCardSkeleton />
        </Box>
      )}
      keyExtractor={(_, index) => `skeleton-${index}`}
      numColumns={1}
      contentContainerClassName="p-2"
      showsVerticalScrollIndicator={false}
    />
  );
}

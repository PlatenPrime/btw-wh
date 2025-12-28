import { VStack, Box } from "@/components/ui";
import { ThemedText } from "@/components/themed-text";
import type { ArtDto } from "@/modules/arts/api/types/dto";
import { ArtsGridCard } from "@/modules/arts/components/cards/arts-grid-card/ArtsGridCard";

interface ArtsByZoneContainerViewProps {
  data: ArtDto[];
  total: number;
}

export function ArtsByZoneContainerView({
  data,
  total,
}: ArtsByZoneContainerViewProps) {
  return (
    <VStack className="gap-4">
      <ThemedText type="defaultSemiBold" className="text-lg">
        Артикули
      </ThemedText>
      {data.length === 0 ? (
        <Box className="justify-center items-center py-8">
          <ThemedText type="default" className="text-center opacity-70">
            Немає артикулів
          </ThemedText>
        </Box>
      ) : (
        <VStack className="gap-2">
          {data.map((art) => (
            <Box key={art.artikul} className="mb-2">
              <ArtsGridCard art={art} />
            </Box>
          ))}
        </VStack>
      )}
    </VStack>
  );
}


import { ThemedVStack, ThemedBox } from "@/components/themed";
import { ThemedText } from "@/components/themed/themed-text";
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
    <ThemedVStack className="gap-2">
      <ThemedText type="defaultSemiBold" className="text-lg text-center">
        Артикули
      </ThemedText>
      {data.length === 0 ? (
        <ThemedBox className="justify-center items-center py-8">
          <ThemedText type="default" className="text-center opacity-70">
            Немає артикулів
          </ThemedText>
        </ThemedBox>
      ) : (
        <ThemedVStack className="gap-2">
          {data.map((art) => (
            <ThemedBox key={art.artikul} className="mb-2">
              <ArtsGridCard art={art} />
            </ThemedBox>
          ))}
        </ThemedVStack>
      )}
    </ThemedVStack>
  );
}


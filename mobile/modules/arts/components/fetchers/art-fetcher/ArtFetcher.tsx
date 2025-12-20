import { View } from "react-native";
import { ThemedView } from "@/components/themed-view";
import { ThemedText } from "@/components/themed-text";
import { useOneArtQuery } from "@/modules/arts/api/hooks/queries/useOneArtQuery";
import type { ArtDto } from "@/modules/arts/api/types/dto";
import type { ComponentType } from "react";
import { ArtContainer } from "@/modules/arts/components/containers/art-container/ArtContainer";
import { ArtContainerSkeleton } from "@/modules/arts/components/containers/art-container/ArtContainerSkeleton";

interface ArtFetcherProps {
  artikul: string;
  ContainerComponent?: ComponentType<{ artData: ArtDto }>;
  SkeletonComponent?: ComponentType;
}

export function ArtFetcher({
  artikul,
  ContainerComponent = ArtContainer,
  SkeletonComponent = ArtContainerSkeleton,
}: ArtFetcherProps) {
  const {
    data: artResponse,
    isLoading,
    error,
    refetch,
  } = useOneArtQuery(artikul);

  if (isLoading) return <SkeletonComponent />;

  if (error) {
    return (
      <ThemedView className="flex-1 justify-center items-center p-4">
        <ThemedText type="defaultSemiBold" className="text-center mb-2">
          Помилка завантаження артикулу
        </ThemedText>
        <ThemedText type="default" className="text-center">
          {error instanceof Error ? error.message : "Не вдалося завантажити артикул"}
        </ThemedText>
      </ThemedView>
    );
  }

  if (!artResponse || !artResponse.exists) {
    return (
      <ThemedView className="flex-1 justify-center items-center p-4">
        <ThemedText type="defaultSemiBold" className="text-center mb-2">
          Артикул не знайдено
        </ThemedText>
        <ThemedText type="default" className="text-center opacity-70">
          Артикул з таким кодом не існує або був видалений
        </ThemedText>
      </ThemedView>
    );
  }

  return <ContainerComponent artData={artResponse.data!} />;
}


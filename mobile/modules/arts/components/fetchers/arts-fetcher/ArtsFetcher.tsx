import { useState } from "react";
import type { ComponentType } from "react";
import type { ArtDto } from "@/modules/arts/api/types/dto";
import { useArtsInfiniteQuery } from "@/modules/arts/api/hooks/queries/useArtsInfiniteQuery";
import { ArtsContainer } from "@/modules/arts/components/containers/arts-container/ArtsContainer";
import { ArtsContainerSkeleton } from "@/modules/arts/components/containers/arts-container/ArtsContainerSkeleton";
import { ThemedView } from "@/components/themed-view";
import { ThemedText } from "@/components/themed-text";
import { View } from "react-native";

interface ArtsFetcherProps {
  ContainerComponent?: ComponentType<{
    data: ArtDto[];
    isFetchingNextPage: boolean;
    hasNextPage: boolean;
    fetchNextPage: () => void;
    search: string;
    onSearchChange: React.Dispatch<React.SetStateAction<string>>;
  }>;
  SkeletonComponent?: ComponentType;
  limit?: number;
  initialSearch?: string;
}

export function ArtsFetcher({
  ContainerComponent = ArtsContainer,
  SkeletonComponent = ArtsContainerSkeleton,
  limit = 20,
  initialSearch = "",
}: ArtsFetcherProps) {
  const [search, setSearch] = useState(initialSearch);

  const {
    data,
    isLoading,
    isFetchingNextPage,
    fetchNextPage,
    hasNextPage,
    error,
  } = useArtsInfiniteQuery({
    limit,
    search,
  });

  if (isLoading) return <SkeletonComponent />;

  if (error) {
    return (
      <ThemedView className="flex-1 justify-center items-center p-4">
        <ThemedText type="defaultSemiBold" className="text-center mb-2">
          Помилка завантаження артикулів
        </ThemedText>
        <ThemedText type="default" className="text-center">
          {error instanceof Error ? error.message : "Не вдалося завантажити артикули"}
        </ThemedText>
      </ThemedView>
    );
  }

  if (!data) {
    return (
      <ThemedView className="flex-1 justify-center items-center p-4">
        <ThemedText type="default" className="text-center">
          Немає даних для відображення
        </ThemedText>
      </ThemedView>
    );
  }

  const flatData = data?.pages.flatMap((page) => page.data) ?? [];

  return (
    <ContainerComponent
      data={flatData}
      isFetchingNextPage={isFetchingNextPage}
      hasNextPage={hasNextPage ?? false}
      fetchNextPage={fetchNextPage}
      search={search}
      onSearchChange={setSearch}
    />
  );
}

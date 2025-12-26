import { View } from "react-native";
import type { ArtDto } from "@/modules/arts/api/types/dto";
import { ArtsGrid } from "@/modules/arts/components/lists/arts-grid/ArtsGrid";
import { SearchPanel } from "@/modules/arts/components/shared/search-panel/SearchPanel";
import { ThemedText } from "@/components/themed-text";

interface ArtsContainerViewProps {
  data: ArtDto[];
  isFetchingNextPage: boolean;
  search: string;
  onSearchChange: (text: string) => void;
  onEndReached?: () => void;
  refreshing?: boolean;
  onRefresh?: () => void;
}

export function ArtsContainerView({
  data,
  isFetchingNextPage,
  search,
  onSearchChange,
  onEndReached,
  refreshing,
  onRefresh,
}: ArtsContainerViewProps) {
  return (
    <View className="flex-1">
      <View className="p-2">
        <SearchPanel
          search={search}
          onSearchChange={onSearchChange}
          placeholder="Пошук артикулів..."
        />
      </View>
      <ArtsGrid
        arts={data}
        onEndReached={onEndReached}
        refreshing={refreshing}
        onRefresh={onRefresh}
      />
      {isFetchingNextPage && (
        <View className="py-2">
          <ThemedText type="default" className="text-center">
            Завантаження...
          </ThemedText>
        </View>
      )}
    </View>
  );
}

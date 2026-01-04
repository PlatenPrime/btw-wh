import { ThemedBox, ThemedHStack, ThemedButton } from "@/components/themed";
import type { ZonesResponseDto } from "@/modules/zones/api/types/dto";
import { ZonesList } from "@/modules/zones/components/lists/zones-list/ZonesList";
import { ThemedText } from "@/components/themed/themed-text";
import { CreateZoneDialog } from "@/modules/zones/components/dialogs/create-zone-dialog/CreateZoneDialog";
import { ZonesControls } from "@/modules/zones/components/controls/zones-controls/ZonesControls";

interface ZonesContainerViewProps {
  data: ZonesResponseDto | undefined;
  isLoading: boolean;
  createDialogOpen: boolean;
  setCreateDialogOpen: (open: boolean) => void;
  onCreateSuccess: () => void;
  refreshing?: boolean;
  onRefresh?: () => void;
  onPageChange?: (page: number) => void;
  search: string;
  onSearchChange: (search: string) => void;
  sortBy: "title" | "bar" | "sector" | "createdAt";
  onSortByChange: (sortBy: "title" | "bar" | "sector" | "createdAt") => void;
  sortOrder: "asc" | "desc";
  onSortOrderChange: (sortOrder: "asc" | "desc") => void;
}

export function ZonesContainerView({
  data,
  isLoading,
  createDialogOpen,
  setCreateDialogOpen,
  onCreateSuccess,
  refreshing,
  onRefresh,
  onPageChange,
  search,
  onSearchChange,
  sortBy,
  onSortByChange,
  sortOrder,
  onSortOrderChange,
}: ZonesContainerViewProps) {
  if (isLoading) {
    return (
      <ThemedBox className="flex-1 justify-center items-center py-8">
        <ThemedText type="default" className="text-center">
          Завантаження...
        </ThemedText>
      </ThemedBox>
    );
  }

  const pagination = data?.pagination;
  const zones = data?.data;

  return (
    <>
      <ThemedBox className="flex-1">
        <ZonesControls
          search={search}
          onSearchChange={onSearchChange}
          sortBy={sortBy}
          onSortByChange={onSortByChange}
          sortOrder={sortOrder}
          onSortOrderChange={onSortOrderChange}
        />
        <ZonesList zones={zones} refreshing={refreshing} onRefresh={onRefresh} />
        
        {pagination && pagination.totalPages > 1 && (
          <ThemedBox className="p-4 border-t border-outline-100">
            <ThemedHStack className="items-center justify-between gap-2">
              <ThemedButton
                onPress={() => onPageChange?.(pagination.page - 1)}
                disabled={!pagination.hasPrev}
                variant="outline"
                className="flex-1"
              >
                <ThemedText className="font-semibold">Попередня</ThemedText>
              </ThemedButton>
              <ThemedText type="default" className="text-sm">
                Сторінка {pagination.page} з {pagination.totalPages}
              </ThemedText>
              <ThemedButton
                onPress={() => onPageChange?.(pagination.page + 1)}
                disabled={!pagination.hasNext}
                variant="outline"
                className="flex-1"
              >
                <ThemedText className="font-semibold">Наступна</ThemedText>
              </ThemedButton>
            </ThemedHStack>
          </ThemedBox>
        )}
      </ThemedBox>
      
      <CreateZoneDialog
        open={createDialogOpen}
        onOpenChange={setCreateDialogOpen}
        onSuccess={onCreateSuccess}
      />
    </>
  );
}


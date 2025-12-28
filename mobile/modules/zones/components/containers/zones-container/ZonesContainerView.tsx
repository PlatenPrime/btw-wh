import { Box } from "@/components/ui";
import type { ZonesResponseDto } from "@/modules/zones/api/types/dto";
import { ZonesList } from "@/modules/zones/components/lists/zones-list/ZonesList";
import { ThemedText } from "@/components/themed-text";
import { CreateZoneDialog } from "@/modules/zones/components/dialogs/create-zone-dialog/CreateZoneDialog";
import { HStack, Button, Text } from "@/components/ui";
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
      <Box className="flex-1 justify-center items-center py-8">
        <ThemedText type="default" className="text-center">
          Завантаження...
        </ThemedText>
      </Box>
    );
  }

  const pagination = data?.pagination;
  const zones = data?.data;

  return (
    <>
      <Box className="flex-1">
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
          <Box className="p-4 border-t border-outline-100">
            <HStack className="items-center justify-between gap-2">
              <Button
                onPress={() => onPageChange?.(pagination.page - 1)}
                disabled={!pagination.hasPrev}
                variant="outline"
                className="flex-1"
              >
                <Text className="font-semibold">Попередня</Text>
              </Button>
              <ThemedText type="default" className="text-sm">
                Сторінка {pagination.page} з {pagination.totalPages}
              </ThemedText>
              <Button
                onPress={() => onPageChange?.(pagination.page + 1)}
                disabled={!pagination.hasNext}
                variant="outline"
                className="flex-1"
              >
                <Text className="font-semibold">Наступна</Text>
              </Button>
            </HStack>
          </Box>
        )}
      </Box>
      
      <CreateZoneDialog
        open={createDialogOpen}
        onOpenChange={setCreateDialogOpen}
        onSuccess={onCreateSuccess}
      />
    </>
  );
}


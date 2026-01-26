import type { ZonesResponseDto } from "@/modules/zones/api/types/dto";
import { ZonesHeaderActions } from "@/modules/zones/components/actions/zones-header-actions";
import { ZonesContainerView } from "./ZonesContainerView";

interface ZonesContainerProps {
  data: ZonesResponseDto | undefined;
  isLoading: boolean;
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

export function ZonesContainer({
  data,
  isLoading,
  refreshing,
  onRefresh,
  onPageChange,
  search,
  onSearchChange,
  sortBy,
  onSortByChange,
  sortOrder,
  onSortOrderChange,
}: ZonesContainerProps) {
  return (
    <>
      <ZonesHeaderActions />
      <ZonesContainerView
        data={data}
        isLoading={isLoading}
        refreshing={refreshing}
        onRefresh={onRefresh}
        onPageChange={onPageChange}
        search={search}
        onSearchChange={onSearchChange}
        sortBy={sortBy}
        onSortByChange={onSortByChange}
        sortOrder={sortOrder}
        onSortOrderChange={onSortOrderChange}
      />
    </>
  );
}


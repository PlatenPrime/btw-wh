import { useState } from "react";
import { useRegisterHeaderActions } from "@/components/layout/header";
import type { ZonesResponseDto } from "@/modules/zones/api/types/dto";
import type { ZoneDto } from "@/modules/zones/api/types/dto";
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
  const [createDialogOpen, setCreateDialogOpen] = useState(false);

  useRegisterHeaderActions([
    {
      id: "create-zone",
      label: "Створити зону",
      icon: "add",
      iconColor: "emerald",
      textColor: "emerald",
      variant: "default",
      onClick: () => setCreateDialogOpen(true),
    },
  ]);

  const handleCreateSuccess = () => {
    setCreateDialogOpen(false);
  };

  return (
    <ZonesContainerView
      data={data}
      isLoading={isLoading}
      createDialogOpen={createDialogOpen}
      setCreateDialogOpen={setCreateDialogOpen}
      onCreateSuccess={handleCreateSuccess}
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
  );
}


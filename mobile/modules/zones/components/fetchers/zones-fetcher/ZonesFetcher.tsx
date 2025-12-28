import { useState } from "react";
import { useZonesQuery } from "@/modules/zones/api/hooks/queries/useZonesQuery";
import { ZonesContainer } from "@/modules/zones/components/containers/zones-container/ZonesContainer";
import { ZonesContainerSkeleton } from "@/modules/zones/components/containers/zones-container/ZonesContainerSkeleton";

export function ZonesFetcher() {
  const [page, setPage] = useState(1);
  const [limit] = useState(20);
  const [search, setSearch] = useState("");
  const [sortBy, setSortBy] = useState<"title" | "bar" | "sector" | "createdAt">("sector");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");

  const { data, isLoading, refetch, isRefetching } = useZonesQuery({
    page,
    limit,
    search,
    sortBy,
    sortOrder,
  });

  const handlePageChange = (newPage: number) => {
    setPage(newPage);
  };

  const handleSearchChange = (newSearch: string) => {
    setSearch(newSearch);
    setPage(1); // Сбрасываем на первую страницу при поиске
  };

  const handleSortByChange = (newSortBy: "title" | "bar" | "sector" | "createdAt") => {
    setSortBy(newSortBy);
    setPage(1); // Сбрасываем на первую страницу при изменении сортировки
  };

  const handleSortOrderChange = (newSortOrder: "asc" | "desc") => {
    setSortOrder(newSortOrder);
    setPage(1); // Сбрасываем на первую страницу при изменении направления сортировки
  };

  if (isLoading) {
    return <ZonesContainerSkeleton />;
  }

  return (
    <ZonesContainer
      data={data}
      isLoading={isLoading}
      refreshing={isRefetching}
      onRefresh={() => void refetch()}
      onPageChange={handlePageChange}
      search={search}
      onSearchChange={handleSearchChange}
      sortBy={sortBy}
      onSortByChange={handleSortByChange}
      sortOrder={sortOrder}
      onSortOrderChange={handleSortOrderChange}
    />
  );
}


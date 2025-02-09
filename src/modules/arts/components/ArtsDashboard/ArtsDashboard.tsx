import { SearchInput } from "@/components/shared/SearchInput/SearchInput";
import { useQueryArts } from "@/modules/arts/api/useQueryArts";
import { ArtsPagination } from "@/modules/arts/components/ArtsDashboard/ArtPagination/ArtsPagination";
import { ArtsLimit } from "@/modules/arts/components/ArtsDashboard/ArtsLimit/ArtsLimit";
import { ArtsList } from "@/modules/arts/components/ArtsDashboard/ArtsList/ArtsList";
import { useState } from "react";

export function ArtsDashboard() {
  const [page, setPage] = useState<number>(1);
  const [limit, setLimit] = useState(10);
  const [search, setSearch] = useState<string>("");

  const { data, isLoading } = useQueryArts({
    page: page,
    limit: limit,
    search: search,
  });

  const handleSearch = (searchTerm: string) => {
    setSearch(searchTerm); // Обновляем состояние поиска
  };

  return (
    <div className="flex flex-col gap-4">
      <p>{isLoading && "loading..."}</p>
      <div className="flex gap-2">
        <SearchInput delay={500} onSearch={handleSearch} />
        <ArtsLimit limit={limit} setLimit={setLimit} />
      </div>
      <ArtsPagination
        page={data?.page ?? 1}
        totalPages={data?.totalPages ?? 1}
        handlePageChange={setPage}
      />

      <ArtsList data={data?.data} />
    </div>
  );
}

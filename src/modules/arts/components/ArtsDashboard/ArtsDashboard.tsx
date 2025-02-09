import { useQueryArts } from "@/modules/arts/api/useQueryArts";
import { ArtsPagination } from "@/modules/arts/components/ArtsDashboard/ArtPagination/ArtsPagination";
import { ArtsList } from "@/modules/arts/components/ArtsDashboard/ArtsList/ArtsList";
import { useState } from "react";
import ArtsLimit from "./ArtsLimit/ArtsLimit";

export function ArtsDashboard() {
  const [page, setPage] = useState<number>(1);
  const [limit, setLimit] = useState(10);
  const [search] = useState<string>("");

  const { data, isLoading } = useQueryArts({
    page: page,
    limit: limit,
    search: search,
  });


  return (
    <div>
      <p>{isLoading && "loading..."}</p>
      <p>Search</p>
      <div>
        <ArtsList data={data?.data} />
      </div>
      <ArtsPagination
        page={data?.page ?? 1}
        totalPages={data?.totalPages ?? 1}
        handlePageChange={setPage}
      />
      <ArtsLimit limit={limit} setLimit={setLimit} />
    </div>
  );
}

import { useCallback, useMemo } from "react";
import { useSearchParams } from "react-router";

import { PaginationControls } from "@/components/pagination-controls";
import { useArtsQuery } from "../hooks/useArtsQuery";
import { getParam } from "../utils/getParam";
import { updateSearchParams } from "../utils/updateSearchParams";
import { Grid } from "./arts-grid/Grid";
import { GridSkeleton } from "./arts-grid/GridSkeleton";
import { Status } from "./Status";
import { Toolbar } from "./Toolbar";

export function Dashboard() {
  const [params, setParams] = useSearchParams();

  const page = Number(getParam(params, "page", "1"));
  const search = getParam(params, "search", "");
  const limit = Number(getParam(params, "limit", "10"));

  const { data, isPending, isError, fetchStatus } = useArtsQuery({
    page,
    limit,
    search,
  });

  const handlePageChange = useCallback(
    (newPage: number) => {
      updateSearchParams(params, { page: String(newPage) }, setParams);
    },
    [params, setParams]
  );

  const handleSearchChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      updateSearchParams(
        params,
        {
          search: e.target.value,
          page: "1",
        },
        setParams
      );
    },
    [params, setParams]
  );

  const handleLimitChange = useCallback(
    (newLimit: number) => {
      updateSearchParams(
        params,
        {
          limit: String(newLimit),
          page: "1",
        },
        setParams
      );
    },
    [params, setParams]
  );

  const totalItems = useMemo(() => data?.total ?? 0, [data]);

  if (isError) return <Status message="Помилка завантаження даних" isError />;

  return (
    <main className="max-w-screen grid grid-cols-1 gap-4 p-2">
      <Toolbar
        total={totalItems}
        search={search}
        onSearchChange={handleSearchChange}
        limit={limit}
        onLimitChange={handleLimitChange}
        fetchStatus={fetchStatus}
        isPending={isPending}
      />

      <PaginationControls
        currentPage={data?.page ?? 1}
        totalPages={data?.totalPages ?? 1}
        onPageChange={handlePageChange}
        isPending={isPending}
      />

      {isPending ? <GridSkeleton /> : <Grid arts={data?.data} />}

      {fetchStatus === "fetching" && <p>Шукаємо...</p>}
    </main>
  );
}

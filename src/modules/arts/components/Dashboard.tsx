import { useCallback, useMemo } from "react";
import { useSearchParams } from "react-router";

import { PaginationControls } from "@/components/pagination-controls";
import { SelectLimit } from "@/components/select-limit";
import { Status } from "@/components/status";
import { getParam } from "../../../utils/getParam";
import { updateSearchParams } from "../../../utils/updateSearchParams";
import { useArtsQuery } from "../hooks/useArtsQuery";
import { ArtsFetchIndicator } from "./arts-panel/ArtsFetchIndicator";
import { Grid } from "./arts-grid/Grid";
import { GridSkeleton } from "./arts-grid/GridSkeleton";
import { SearchPanel } from "./arts-panel/SearchPanel";

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
      <div className="flex flex-col xl:flex-row items-center  gap-4">
        <div className="flex w-full xl:w-auto justify-between xl:justify-start gap-4">
          <ArtsFetchIndicator total={totalItems} fetchStatus={fetchStatus} />
          <SelectLimit
            limitOptions={[5, 10, 20, 50, 100]}
            limit={limit}
            setLimit={handleLimitChange}
          />
        </div>

        <SearchPanel search={search} onSearchChange={handleSearchChange} />

        <PaginationControls
          currentPage={data?.page ?? 1}
          totalPages={data?.totalPages ?? 1}
          onPageChange={handlePageChange}
          isPending={isPending}
        />
      </div>

      {isPending ? <GridSkeleton /> : <Grid arts={data?.data} />}
    </main>
  );
}

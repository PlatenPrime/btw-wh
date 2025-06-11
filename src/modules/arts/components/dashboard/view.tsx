import { PaginationControls } from "@/components/pagination-controls";
import { SelectLimit } from "@/components/select-limit";
import { useMemo } from "react";
import type { ArtsDto } from "../../types/dto";
import { ArtsFetchIndicator } from "../dashboard-fetch-indicator";
import { Grid } from "../dashboard-grid";
import { GridSkeleton } from "../dashboard-grid/skeleton";
import { SearchPanel } from "../dashboard-search";

type DashboardViewProps = {
  data: ArtsDto | undefined;
  isPending: boolean;
  fetchStatus: "idle" | "fetching" | "paused";
  page: number;
  search: string;
  limit: number;
  onPageChange: (page: number) => void;
  onSearchChange: (search: string) => void;
  onLimitChange: (limit: number) => void;
};

export function DashboardView({
  data,
  isPending,
  fetchStatus,
  search,
  limit,
  onPageChange,
  onSearchChange,
  onLimitChange,
}: DashboardViewProps) {
  const totalItems = useMemo(() => data?.total ?? 0, [data]);

  return (
    <main className="max-w-screen grid grid-cols-1 gap-4 p-2">
      <div className="flex flex-col xl:flex-row items-center gap-4 xl:gap-8">
        <SearchPanel
          search={search}
          onSearchChange={(e) => onSearchChange(e.target.value)}
        />
        <div className="flex w-full xl:w-auto justify-between xl:justify-start gap-4">
          <ArtsFetchIndicator total={totalItems} fetchStatus={fetchStatus} />
          <SelectLimit
            limitOptions={[5, 10, 20, 50, 100]}
            limit={limit}
            setLimit={onLimitChange}
          />
        </div>

        <PaginationControls
          currentPage={data?.page ?? 1}
          totalPages={data?.totalPages ?? 1}
          onPageChange={onPageChange}
          isPending={isPending}
        />
      </div>

      {isPending ? <GridSkeleton /> : <Grid arts={data?.data ?? []} />}
    </main>
  );
}

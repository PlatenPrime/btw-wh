import { FetchIndicator } from "@/components/fetch-indicator";
import { PaginationControls } from "@/components/pagination-controls";
import { SelectLimit } from "@/components/select-limit";
import { BookA } from "lucide-react";
import { useMemo } from "react";
import type { ArtsDto } from "../../types/dto";
import { Grid } from "../dashboard-grid";
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
    <main className="max-w-screen grid grid-cols-1 gap-2 md:gap-4 p-2 md:p-4">
      <div className="flex flex-col xl:flex-row items-center gap-4 ">
        <SearchPanel
          search={search}
          onSearchChange={(e) => onSearchChange(e.target.value)}
        />
        <div className="flex w-full xl:w-auto justify-between xl:justify-start gap-4">
          <FetchIndicator
            total={totalItems}
            fetchStatus={fetchStatus}
            icon={<BookA />}
          />
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

      <Grid arts={data?.data ?? []} isPending={isPending} />
    </main>
  );
}

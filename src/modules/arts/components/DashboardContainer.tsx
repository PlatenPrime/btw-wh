import { Status } from "@/components/status";
import { useArtsQuery } from "../hooks/useArtsQuery";
import { useDashboardParams } from "../hooks/useDashboardParams";
import { DashboardView } from "./DashboardView";

export function DashboardContainer() {
  const { page, search, limit, setPage, setSearch, setLimit } = useDashboardParams();
  const { data, isPending, isError, fetchStatus } = useArtsQuery({ page, limit, search });

  if (isError) return <Status message="Помилка завантаження даних" isError />;
  
  return (
    <DashboardView
      data={data}
      isPending={isPending}
      fetchStatus={fetchStatus}
      page={page}
      search={search}
      limit={limit}
      onPageChange={setPage}
      onSearchChange={setSearch}
      onLimitChange={setLimit}
    />
  );
}

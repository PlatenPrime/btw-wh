import { Status } from "@/components/status";
import { useArtsQuery } from "../../api/useArtsQuery";
import { useDashboardParams } from "../../hooks/useDashboardParams";
import { DashboardView } from "./view";

export function DashboardContainer() {
  const { page, search, limit, setPage, setSearch, setLimit } =
    useDashboardParams();
  const { data, isPending, isError,  isFetching } = useArtsQuery({
    page,
    limit,
    search,
  });

  if (isError) return <Status message="Помилка завантаження даних" isError />;

  return (
    <DashboardView
      data={data}
      isPending={isPending}
      isFetching={ isFetching}
      page={page}
      search={search}
      limit={limit}
      onPageChange={setPage}
      onSearchChange={setSearch}
      onLimitChange={setLimit}
    />
  );
}

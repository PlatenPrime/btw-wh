import {
  Loading,
  LoadingError,
  LoadingNoData,
} from "@/components/loading-states";
import { GridSkeleton } from "@/modules/rows/components/containers/rows-grid/skeleton";
import { useRowsQuery } from "../../../api/hooks/useRowsQuery";
import { RowsDashboardView } from "./view";

export function RowsDashboard() {
  const { data, isLoading, error, refetch } = useRowsQuery();

  if (isLoading) {
    return <Loading skeleton={<GridSkeleton />} />;
  }

  if (error) {
    return <LoadingError description="Не вдалося завантажити дані рядів" />;
  }

  if (!data) {
    return <LoadingNoData description="Ряди не знайдено" />;
  }

  return <RowsDashboardView data={data} refetch={refetch} />;
}

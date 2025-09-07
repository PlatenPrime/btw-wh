import {
  Loading,
  LoadingError,
  LoadingNoData,
} from "@/components/loading-states";
import { RowsGridSkeleton } from "@/modules/rows/components/containers/rows-grid/RowsGridSkeleton";
import { useRowsQuery } from "@/modules/rows/api/hooks/queries/useRowsQuery";
import { RowsDashboardView } from "./RowsDashboardView";

export function RowsDashboard() {
  const { data, isLoading, error } = useRowsQuery();

  if (isLoading) {
    return <Loading skeleton={<RowsGridSkeleton />} />;
  }

  if (error) {
    return <LoadingError description="Не вдалося завантажити дані рядів" />;
  }

  if (!data) {
    return <LoadingNoData description="Ряди не знайдено" />;
  }

  return <RowsDashboardView data={data} />;
}

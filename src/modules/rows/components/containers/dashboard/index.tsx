import {
  Loading,
  LoadingError,
  LoadingNoData,
} from "@/components/loading-states";
import { GridSkeleton } from "@/modules/rows/components/containers/rows-grid/skeleton";
import { useRowsQuery } from "../../../api/hooks/useRowsQuery";
import { View } from "./view";

export function Dashboard() {
  const { data, isLoading, error, refetch } = useRowsQuery();

  const handleRowUpdated = () => {
    console.log("Dashboard handleRowUpdated called, refetching data");
    refetch();
  };

  if (isLoading) {
    return <Loading skeleton={<GridSkeleton />} />;
  }

  if (error) {
    return <LoadingError description="Не вдалося завантажити дані рядів" />;
  }

  if (!data) {
    return <LoadingNoData description="Ряди не знайдено" />;
  }

  return <View data={data} onRowUpdated={handleRowUpdated} />;
}

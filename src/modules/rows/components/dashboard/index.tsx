import { GridSkeleton } from "@/modules/rows/components/grid/skeleton";
import { useRowsQuery } from "../../api/useRowsQuery";
import { View } from "./view";

export function Dashboard() {
  const { data, isLoading, error, refetch } = useRowsQuery();

  const handleRowUpdated = () => {
    console.log("Dashboard handleRowUpdated called, refetching data");
    refetch();
  };

  if (isLoading) {
    return (
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h1 className="text-foreground text-2xl font-bold">Ряди складу</h1>
          <div className="text-muted-foreground text-sm">Завантаження...</div>
        </div>
        <GridSkeleton />
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex h-64 items-center justify-center">
        <div className="text-center">
          <h2 className="text-destructive text-lg font-semibold">
            Помилка завантаження
          </h2>
          <p className="text-muted-foreground">
            Не вдалося завантажити дані рядів
          </p>
        </div>
      </div>
    );
  }

  if (!data) {
    return (
      <div className="flex h-64 items-center justify-center">
        <div className="text-center">
          <h2 className="text-foreground text-lg font-semibold">Немає даних</h2>
          <p className="text-muted-foreground">Ряди не знайдено</p>
        </div>
      </div>
    );
  }

  return <View data={data} onRowUpdated={handleRowUpdated} />;
}

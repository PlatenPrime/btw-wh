import { useRowByTitleQuery } from "../../api/useRowByTitleQuery";
import { RowDetailSkeleton } from "./skeleton";
import { View } from "./view";

interface RowDetailProps {
  rowTitle?: string;
}

export function RowDetail({ rowTitle }: RowDetailProps) {
  const { data: row, isLoading, error, refetch } = useRowByTitleQuery(rowTitle);

  const handleRowUpdated = () => {
    refetch();
  };

  if (isLoading) {
    return <RowDetailSkeleton />;
  }

  if (error) {
    return (
      <div className="flex h-64 items-center justify-center">
        <div className="text-center">
          <h2 className="text-destructive text-lg font-semibold">
            Помилка завантаження
          </h2>
          <p className="text-muted-foreground">
            Не вдалося завантажити дані ряду
          </p>
        </div>
      </div>
    );
  }

  if (!row) {
    return (
      <div className="flex h-64 items-center justify-center">
        <div className="text-center">
          <h2 className="text-foreground text-lg font-semibold">
            Ряд не знайдено
          </h2>
          <p className="text-muted-foreground">Запитаний ряд не існує</p>
        </div>
      </div>
    );
  }

  return <View row={row} onRowUpdated={handleRowUpdated} />;
}

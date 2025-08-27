import { LoadingError, LoadingNoData } from "@/components/loading-states";
import { useRowByTitleQuery } from "../../../api/hooks/useRowByTitleQuery";
import { RowDetailSkeleton } from "./RowDetailSkeleton";
import { RowDetailView } from "./RowDetailView";

interface RowDetailProps {
  rowTitle?: string;
}

export function RowDetail({ rowTitle }: RowDetailProps) {
  const { data: row, isLoading, error } = useRowByTitleQuery(rowTitle);

  if (isLoading) {
    return <RowDetailSkeleton />;
  }

  if (error) {
    return <LoadingError description="Не вдалося завантажити дані рядів" />;
  }

  if (!row) {
    return <LoadingNoData description="Ряд не знайдено" />;
  }

  return <RowDetailView row={row} />;
}

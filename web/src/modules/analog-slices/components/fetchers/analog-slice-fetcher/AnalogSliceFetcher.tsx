import { ErrorDisplay } from "@/components/shared/error-components";
import { LoadingNoData } from "@/components/shared/loading-states";
import { useAnalogSliceQuery } from "@/modules/analog-slices/api/hooks/queries/useAnalogSliceQuery";
import {
  AnalogSliceTableContainer,
  AnalogSliceTableSkeleton,
} from "@/modules/analog-slices/components/containers/analog-slice-table-container";
import { isAxiosError } from "axios";

interface AnalogSliceFetcherProps {
  konkName: string;
  date: string;
}

export function AnalogSliceFetcher({ konkName, date }: AnalogSliceFetcherProps) {
  const sliceQuery = useAnalogSliceQuery({ konkName, date });

  if (sliceQuery.isLoading) {
    return <AnalogSliceTableSkeleton />;
  }

  if (
    sliceQuery.error &&
    isAxiosError(sliceQuery.error) &&
    sliceQuery.error.response?.status === 404
  ) {
    return <LoadingNoData description="Зріз не знайдено" />;
  }

  if (sliceQuery.error) {
    return (
      <ErrorDisplay
        error={sliceQuery.error}
        title="Помилка завантаження зрізу"
        description="Не вдалося завантажити зріз аналогів"
      />
    );
  }

  const data = sliceQuery.data?.data?.data;
  const isEmpty = data && Object.keys(data).length === 0;

  if (!data || isEmpty) {
    return <LoadingNoData description="Зріз не знайдено" />;
  }

  return <AnalogSliceTableContainer data={data} />;
}

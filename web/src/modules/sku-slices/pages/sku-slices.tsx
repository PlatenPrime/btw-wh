import { SidebarInsetLayout } from "@/components/layout/SidebarInsetLayout";
import { DataRefetchOverlay } from "@/components/shared/data-refetch-overlay/DataRefetchOverlay";
import { PaginationControls } from "@/components/shared/pagination-controls";
import { ErrorDisplay } from "@/components/shared/error-components";
import { LoadingNoData } from "@/components/shared/loading-states";
import { SkuSlicesControls } from "@/modules/sku-slices/components/controls/sku-slices-controls/SkuSlicesControls";
import {
  SkuSliceTableContainer,
  SkuSliceTableSkeleton,
} from "@/modules/sku-slices/components/containers/sku-slice-table-container";
import { useSkuSlicePageQuery } from "@/modules/sku-slices/api/hooks/queries/useSkuSlicePageQuery";
import { useCallback, useState } from "react";
import { isAxiosError } from "axios";

const PAGE_LIMIT = 20;

export function SkuSlices() {
  const [konkName, setKonkName] = useState("");
  const [date, setDate] = useState("");
  const [page, setPage] = useState(1);

  const handleKonkNameChange = useCallback((value: string) => {
    setKonkName(value);
    setPage(1);
  }, []);

  const handleDateChange = useCallback((value: string) => {
    setDate(value);
    setPage(1);
  }, []);

  const sliceQuery = useSkuSlicePageQuery({
    konkName,
    date,
    page,
    limit: PAGE_LIMIT,
  });

  const showForm = Boolean(konkName && date);

  return (
    <SidebarInsetLayout headerText="Зрізи конкурентів">
      <div className="grid gap-4 p-2">
        <SkuSlicesControls
          konkName={konkName}
          onKonkNameChange={handleKonkNameChange}
          date={date}
          onDateChange={handleDateChange}
        />

        {!showForm && (
          <p className="text-muted-foreground text-sm">
            Оберіть конкурента та дату для перегляду зрізу.
          </p>
        )}

        {showForm && sliceQuery.isLoading && !sliceQuery.data && (
          <SkuSliceTableSkeleton />
        )}

        {showForm &&
          sliceQuery.isError &&
          !sliceQuery.data &&
          isAxiosError(sliceQuery.error) &&
          sliceQuery.error.response?.status === 404 && (
            <LoadingNoData description="Зріз не знайдено" />
          )}

        {showForm &&
          sliceQuery.isError &&
          !sliceQuery.data &&
          !(
            isAxiosError(sliceQuery.error) &&
            sliceQuery.error.response?.status === 404
          ) && (
            <ErrorDisplay
              error={sliceQuery.error}
              title="Помилка завантаження зрізу"
              description="Не вдалося завантажити зріз SKU"
            />
          )}

        {showForm && sliceQuery.data && (
          <DataRefetchOverlay
            isFetching={sliceQuery.isFetching}
            isLoading={sliceQuery.isLoading}
          >
            <div className="grid gap-2">
              <PaginationControls
                currentPage={sliceQuery.data.pagination.page}
                totalPages={sliceQuery.data.pagination.totalPages}
                onPageChange={setPage}
              />
              <SkuSliceTableContainer items={sliceQuery.data.data.items} />
            </div>
          </DataRefetchOverlay>
        )}
      </div>
    </SidebarInsetLayout>
  );
}

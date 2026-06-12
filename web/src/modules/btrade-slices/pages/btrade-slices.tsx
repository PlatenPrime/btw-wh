import { SidebarInsetLayout } from "@/components/layout/sidebar-inset-layout/SidebarInsetLayout";
import { DataRefetchOverlay } from "@/components/shared/feedback/data-refetch-overlay/DataRefetchOverlay";
import { PaginationControls } from "@/components/shared/controls";
import { ErrorDisplay } from "@/components/shared/errors";
import { LoadingNoData } from "@/components/shared/feedback/loading-states";
import { BtradeSlicesControls } from "@/modules/btrade-slices/components/controls/btrade-slices-controls/BtradeSlicesControls";
import {
  BtradeSliceTableContainer,
  BtradeSliceTableSkeleton,
} from "@/modules/btrade-slices/components/containers/btrade-slice-table-container";
import { useBtradeSlicePageQuery } from "@/modules/btrade-slices/api/hooks/queries/useBtradeSlicePageQuery";
import { useCallback, useState } from "react";
import { isAxiosError } from "axios";

const PAGE_LIMIT = 20;

export function BtradeSlices() {
  const [date, setDate] = useState("");
  const [page, setPage] = useState(1);
  const [showInvalidOnly, setShowInvalidOnly] = useState(false);

  const handleDateChange = useCallback((value: string) => {
    setDate(value);
    setPage(1);
  }, []);

  const handleShowInvalidOnlyChange = useCallback((value: boolean) => {
    setShowInvalidOnly(value);
    setPage(1);
  }, []);

  const sliceQuery = useBtradeSlicePageQuery({
    date,
    page,
    limit: PAGE_LIMIT,
    showInvalidOnly,
  });

  const showForm = Boolean(date);

  return (
    <SidebarInsetLayout headerText="Зрізи Btrade">
      <div className="grid gap-4 p-2">
        <BtradeSlicesControls
          date={date}
          onDateChange={handleDateChange}
          showInvalidOnly={showInvalidOnly}
          onShowInvalidOnlyChange={handleShowInvalidOnlyChange}
        />

        {!showForm && (
          <p className="text-muted-foreground text-sm">
            Оберіть дату для перегляду зрізу.
          </p>
        )}

        {showForm && sliceQuery.isLoading && !sliceQuery.data && (
          <BtradeSliceTableSkeleton />
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
              description="Не вдалося завантажити зріз Btrade"
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
              <BtradeSliceTableContainer items={sliceQuery.data.data.items} />
            </div>
          </DataRefetchOverlay>
        )}
      </div>
    </SidebarInsetLayout>
  );
}

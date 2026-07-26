import { SidebarInsetLayout } from "@/components/layout/sidebar-inset-layout/SidebarInsetLayout";
import { DataRefetchOverlay } from "@/components/shared/feedback/data-refetch-overlay/DataRefetchOverlay";
import { PaginationControls } from "@/components/shared/controls";
import { ErrorDisplay } from "@/components/shared/errors";
import { LoadingNoData } from "@/components/shared/feedback/loading-states";
import { SkuSlicesHeaderActions } from "@/modules/sku-analytics/components/actions/sku-slices-header-actions";
import { SkuSlicesControls } from "@/modules/sku-analytics/components/controls/sku-slices-controls/SkuSlicesControls";
import {
  SkuSliceTableContainer,
  SkuSliceTableSkeleton,
} from "@/modules/sku-analytics/components/containers/sku-slice-table-container";
import { useSkuSlicePageQuery } from "@/modules/sku-analytics/api/hooks/queries/useSkuSlicePageQuery";
import { useSkuSlicesParams } from "@/modules/sku-analytics/hooks/useSkuSlicesParams";
import { isAxiosError } from "axios";

const PAGE_LIMIT = 20;

export function SkuSlices() {
  const {
    konk,
    date,
    page,
    showInvalidOnly,
    setKonk,
    setDate,
    setPage,
    setShowInvalidOnly,
  } = useSkuSlicesParams();

  const sliceQuery = useSkuSlicePageQuery({
    konkName: konk,
    date,
    page,
    limit: PAGE_LIMIT,
    showInvalidOnly,
  });

  const showForm = Boolean(konk);

  return (
    <SidebarInsetLayout headerText="Зрізи конкурентів">
      <SkuSlicesHeaderActions />
      <div className="grid gap-4 p-2">
        <SkuSlicesControls
          konkName={konk}
          onKonkNameChange={setKonk}
          date={date}
          onDateChange={setDate}
          showInvalidOnly={showInvalidOnly}
          onShowInvalidOnlyChange={setShowInvalidOnly}
        />

        {!showForm && (
          <p className="text-muted-foreground text-sm">
            Оберіть конкурента для перегляду зрізу.
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

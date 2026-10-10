import { SidebarInsetLayout } from "@/components/layout/sidebar-inset-layout/SidebarInsetLayout";
import { DataRefetchOverlay } from "@/components/shared/feedback/data-refetch-overlay/DataRefetchOverlay";
import { PaginationControls } from "@/components/shared/controls";
import { ErrorDisplay } from "@/components/shared/errors";
import { SkuSlicesHeaderActions } from "@/modules/sku-analytics/components/actions/sku-slices-header-actions";
import { SkuSlicesControls } from "@/modules/sku-analytics/components/controls/sku-slices-controls/SkuSlicesControls";
import {
  SkuSliceDayStatusContainer,
  SkuSliceDayStatusSkeleton,
} from "@/modules/sku-analytics/components/containers/sku-slice-day-status-container";
import {
  SkuSliceTableContainer,
  SkuSliceTableSkeleton,
} from "@/modules/sku-analytics/components/containers/sku-slice-table-container";
import { useSkuSliceDayInvalidQuery } from "@/modules/sku-analytics/api/hooks/queries/useSkuSliceDayInvalidQuery";
import { useSkuSliceDayStatusQuery } from "@/modules/sku-analytics/api/hooks/queries/useSkuSliceDayStatusQuery";
import { useSkuSlicesParams } from "@/modules/sku-analytics/hooks/useSkuSlicesParams";
import { typography } from "@/lib/typography";

const PAGE_LIMIT = 20;

export function SkuSlices() {
  const { konk, date, page, setKonk, setDate, setPage } = useSkuSlicesParams();

  const statusQuery = useSkuSliceDayStatusQuery({
    konkName: konk,
    date,
  });

  const invalidQuery = useSkuSliceDayInvalidQuery({
    konkName: konk,
    date,
    page,
    limit: PAGE_LIMIT,
  });

  const showForm = Boolean(konk);
  const isStatusLoading = statusQuery.isLoading && !statusQuery.data;
  const isInvalidLoading = invalidQuery.isLoading && !invalidQuery.data;

  return (
    <SidebarInsetLayout headerText="Зрізи конкурентів">
      <SkuSlicesHeaderActions />
      <div className="grid gap-4 p-2">
        <SkuSlicesControls
          konkName={konk}
          onKonkNameChange={setKonk}
          date={date}
          onDateChange={setDate}
        />

        {!showForm && (
          <p className="text-muted-foreground text-sm">
            Оберіть конкурента для перегляду зрізу.
          </p>
        )}

        {showForm && isStatusLoading && <SkuSliceDayStatusSkeleton />}

        {showForm && statusQuery.isError && !statusQuery.data && (
          <ErrorDisplay
            error={statusQuery.error}
            title="Помилка завантаження статусу"
            description="Не вдалося завантажити статус денного прогону"
          />
        )}

        {showForm && statusQuery.data && (
          <DataRefetchOverlay
            isFetching={statusQuery.isFetching}
            isLoading={statusQuery.isLoading}
          >
            <SkuSliceDayStatusContainer data={statusQuery.data.data} />
          </DataRefetchOverlay>
        )}

        {showForm && (
          <div className="grid gap-2">
            <h2 className={typography.sectionTitle}>Невалідні точки</h2>

            {isInvalidLoading && <SkuSliceTableSkeleton />}

            {invalidQuery.isError && !invalidQuery.data && (
              <ErrorDisplay
                error={invalidQuery.error}
                title="Помилка завантаження invalid"
                description="Не вдалося завантажити невалідні точки зрізу"
              />
            )}

            {invalidQuery.data && (
              <DataRefetchOverlay
                isFetching={invalidQuery.isFetching}
                isLoading={invalidQuery.isLoading}
              >
                <div className="grid gap-2">
                  <PaginationControls
                    currentPage={invalidQuery.data.pagination.page}
                    totalPages={invalidQuery.data.pagination.totalPages}
                    onPageChange={setPage}
                  />
                  <SkuSliceTableContainer
                    items={invalidQuery.data.data.items}
                    date={date}
                  />
                </div>
              </DataRefetchOverlay>
            )}
          </div>
        )}
      </div>
    </SidebarInsetLayout>
  );
}

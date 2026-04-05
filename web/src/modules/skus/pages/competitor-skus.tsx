import { SidebarInsetLayout } from "@/components/layout/SidebarInsetLayout";
import { CompetitorSkusHeaderActions } from "@/modules/skus/components/actions/competitor-skus-header-actions/CompetitorSkusHeaderActions";
import { CompetitorSkusContainer } from "@/modules/skus/components/containers/competitor-skus-container/CompetitorSkusContainer";
import { CompetitorSkusControls } from "@/modules/skus/components/controls/competitor-skus-controls/CompetitorSkusControls";
import { DeleteInvalidSkusDialog } from "@/modules/skus/components/dialogs/delete-invalid-skus-dialog/DeleteInvalidSkusDialog";
import { SkusNewSinceExcelDialog } from "@/modules/skus/components/dialogs/skus-new-since-excel-dialog/SkusNewSinceExcelDialog";
import { CompetitorSkusFetcher } from "@/modules/skus/components/fetchers/competitor-skus-fetcher/CompetitorSkusFetcher";
import { SkusContainerSkeleton } from "@/modules/skus/components/containers/skus-by-konk-container/SkusContainerSkeleton";
import { useCompetitorSkusParams } from "@/modules/skus/hooks/useCompetitorSkusParams";
import { useKonksQuery } from "@/modules/konks/api/hooks/queries/useKonksQuery";
import { useProdsQuery } from "@/modules/prods/api/hooks/queries/useProdsQuery";
import { useCallback, useEffect, useMemo, useState } from "react";

export function CompetitorSkus() {
  const {
    page,
    limit,
    konkName,
    prodName,
    search,
    scope,
    createdFrom,
    setPage,
    setLimit,
    setSearch,
    setKonkName,
    setProdName,
    setScope,
    setCreatedFrom,
    listQuery,
  } = useCompetitorSkusParams();

  const konksQuery = useKonksQuery();
  const prodsQuery = useProdsQuery();
  const konks = konksQuery.data?.data;
  const prods = prodsQuery.data?.data;

  const [newSinceOpen, setNewSinceOpen] = useState(false);
  const [deleteInvalidOpen, setDeleteInvalidOpen] = useState(false);

  useEffect(() => {
    if (!konkName.trim()) {
      setNewSinceOpen(false);
      setDeleteInvalidOpen(false);
    }
  }, [konkName]);

  const konkLabel = useMemo(() => {
    const list = konksQuery.data?.data ?? [];
    const k = list.find((x) => x.name === konkName);
    return k?.title ?? k?.name ?? konkName;
  }, [konksQuery.data, konkName]);

  const openDeleteDialog = useCallback(() => {
    setDeleteInvalidOpen(true);
  }, []);

  return (
    <SidebarInsetLayout headerText="Товари конкурентів">
      <CompetitorSkusHeaderActions
        konkName={konkName}
        onOpenNewSinceExcel={() => setNewSinceOpen(true)}
        onOpenDeleteInvalid={openDeleteDialog}
      />
      <div className="grid gap-2 p-2">
        <CompetitorSkusControls
          limit={limit}
          setLimit={setLimit}
          konkName={konkName}
          setKonkName={setKonkName}
          prodName={prodName}
          setProdName={setProdName}
          search={search}
          setSearch={setSearch}
          scope={scope}
          setScope={setScope}
          createdFrom={createdFrom}
          setCreatedFrom={setCreatedFrom}
        />

        <CompetitorSkusFetcher
          params={{
            page,
            limit,
            konkName: konkName || undefined,
            prodName: prodName || undefined,
            search,
            isInvalid: listQuery.isInvalid,
            createdFrom: listQuery.createdFromForApi,
          }}
          ContainerComponent={({ data }) => (
            <CompetitorSkusContainer
              data={data}
              konks={konks ?? []}
              prods={prods ?? []}
              onPageChange={setPage}
            />
          )}
          SkeletonComponent={SkusContainerSkeleton}
        />
      </div>

      {konkName.trim() ? (
        <>
          <SkusNewSinceExcelDialog
            konkName={konkName.trim()}
            open={newSinceOpen}
            onOpenChange={setNewSinceOpen}
          />
          <DeleteInvalidSkusDialog
            konkName={konkName.trim()}
            konkLabel={konkLabel}
            open={deleteInvalidOpen}
            onOpenChange={setDeleteInvalidOpen}
          />
        </>
      ) : null}
    </SidebarInsetLayout>
  );
}

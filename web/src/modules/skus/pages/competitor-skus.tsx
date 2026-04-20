import { SidebarInsetLayout } from "@/components/layout/SidebarInsetLayout";
import { CompetitorSkusHeaderActions } from "@/modules/skus/components/actions/competitor-skus-header-actions/CompetitorSkusHeaderActions";
import { CompetitorSkusContainer } from "@/modules/skus/components/containers/competitor-skus-container/CompetitorSkusContainer";
import { CompetitorSkusContainerSkeleton } from "@/modules/skus/components/containers/competitor-skus-container/CompetitorSkusContainerSkeleton";
import { CompetitorSkusControls } from "@/modules/skus/components/controls/competitor-skus-controls/CompetitorSkusControls";
import { DeleteInvalidSkusDialog } from "@/modules/skus/components/dialogs/delete-invalid-skus-dialog/DeleteInvalidSkusDialog";
import { SkusInvalidExcelDialog } from "@/modules/skus/components/dialogs/skus-invalid-excel-dialog/SkusInvalidExcelDialog";
import { SkusNewSinceExcelDialog } from "@/modules/skus/components/dialogs/skus-new-since-excel-dialog/SkusNewSinceExcelDialog";
import { CompetitorSkusFetcher } from "@/modules/skus/components/fetchers/competitor-skus-fetcher/CompetitorSkusFetcher";
import { useCompetitorSkusParams } from "@/modules/skus/hooks/useCompetitorSkusParams";
import { useKonksQuery } from "@/modules/konks/api/hooks/queries/useKonksQuery";
import { useProdsQuery } from "@/modules/prods/api/hooks/queries/useProdsQuery";
import { useCallback, useState } from "react";

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
  const [invalidExcelOpen, setInvalidExcelOpen] = useState(false);
  const [deleteInvalidOpen, setDeleteInvalidOpen] = useState(false);

  const openDeleteDialog = useCallback(() => {
    setDeleteInvalidOpen(true);
  }, []);

  return (
    <SidebarInsetLayout headerText="Товари конкурентів">
      <CompetitorSkusHeaderActions
        onOpenNewSinceExcel={() => setNewSinceOpen(true)}
        onOpenInvalidExcel={() => setInvalidExcelOpen(true)}
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
          SkeletonComponent={CompetitorSkusContainerSkeleton}
        />
      </div>

      <SkusNewSinceExcelDialog
        konks={konks ?? []}
        filterKonkName={konkName}
        open={newSinceOpen}
        onOpenChange={setNewSinceOpen}
      />
      <SkusInvalidExcelDialog
        konks={konks ?? []}
        filterKonkName={konkName}
        open={invalidExcelOpen}
        onOpenChange={setInvalidExcelOpen}
      />
      <DeleteInvalidSkusDialog
        konks={konks ?? []}
        filterKonkName={konkName}
        open={deleteInvalidOpen}
        onOpenChange={setDeleteInvalidOpen}
      />
    </SidebarInsetLayout>
  );
}

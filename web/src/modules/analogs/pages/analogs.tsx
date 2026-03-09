import { SidebarInsetLayout } from "@/components/layout/SidebarInsetLayout";
import type { AnalogDto } from "@/modules/analogs/api/types";
import { AnalogsHeaderActions } from "@/modules/analogs/components/actions/analogs-header-actions";
import {
  AnalogsContainer,
  AnalogsContainerSkeleton,
} from "@/modules/analogs/components/containers/analogs-container";
import { AnalogsFetcher } from "@/modules/analogs/components/fetchers/analogs-fetcher";
import { CreateAnalogDialog } from "@/modules/analogs/components/dialogs/create-analog-dialog";
import { UpdateAnalogDialog } from "@/modules/analogs/components/dialogs/update-analog-dialog";
import { DeleteAnalogDialog } from "@/modules/analogs/components/dialogs/delete-analog-dialog";
import { KonkBtradeComparisonExcelDialog } from "@/modules/analogs/components/dialogs/konk-btrade-comparison-excel-dialog/KonkBtradeComparisonExcelDialog";
import { KonkBtradeSalesComparisonExcelDialog } from "@/modules/analogs/components/dialogs/konk-btrade-sales-comparison-excel-dialog/KonkBtradeSalesComparisonExcelDialog";
import { AnalogsControls } from "@/modules/analogs/components/controls/analogs-controls";
import { useAnalogsParams } from "@/modules/analogs/hooks/useAnalogsParams";
import { useKonksQuery } from "@/modules/konks/api/hooks/queries/useKonksQuery";
import { useProdsQuery } from "@/modules/prods/api/hooks/queries/useProdsQuery";
import { useState } from "react";

export function Analogs() {
  const { page, limit, konkName, prodName, search, setPage } = useAnalogsParams();
  const konksQuery = useKonksQuery();
  const prodsQuery = useProdsQuery();
  const konks = konksQuery.data?.data ?? [];
  const prods = prodsQuery.data?.data ?? [];
  const [createDialogOpen, setCreateDialogOpen] = useState(false);
  const [updateDialogOpen, setUpdateDialogOpen] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [groupExcelDialogOpen, setGroupExcelDialogOpen] = useState(false);
  const [groupSalesExcelDialogOpen, setGroupSalesExcelDialogOpen] = useState(false);
  const [selectedAnalog, setSelectedAnalog] = useState<AnalogDto | null>(null);

  const handleEdit = (analog: AnalogDto) => {
    setSelectedAnalog(analog);
    setUpdateDialogOpen(true);
  };

  const handleDelete = (analog: AnalogDto) => {
    setSelectedAnalog(analog);
    setDeleteDialogOpen(true);
  };

  return (
    <SidebarInsetLayout headerText="Аналоги">
      <div className="grid gap-2 p-2">
        <AnalogsHeaderActions
          onCreateDialogOpenChange={setCreateDialogOpen}
          onGroupExcelDialogOpenChange={setGroupExcelDialogOpen}
          onGroupSalesExcelDialogOpenChange={setGroupSalesExcelDialogOpen}
        />
        <AnalogsControls />


        <AnalogsFetcher
          params={{ page, limit, konkName: konkName || undefined, prodName: prodName || undefined, search: search || undefined }}
          ContainerComponent={({ data }) => (
            <AnalogsContainer
              data={data}
              konks={konks}
              prods={prods}
              onEdit={handleEdit}
              onDelete={handleDelete}
              onPageChange={setPage}
            />
          )}
          SkeletonComponent={AnalogsContainerSkeleton}
        />

        <CreateAnalogDialog
          open={createDialogOpen}
          onOpenChange={setCreateDialogOpen}
        />

        <KonkBtradeComparisonExcelDialog
          open={groupExcelDialogOpen}
          onOpenChange={setGroupExcelDialogOpen}
        />

        <KonkBtradeSalesComparisonExcelDialog
          open={groupSalesExcelDialogOpen}
          onOpenChange={setGroupSalesExcelDialogOpen}
        />

        {selectedAnalog && (
          <UpdateAnalogDialog
            analog={selectedAnalog}
            open={updateDialogOpen}
            onOpenChange={setUpdateDialogOpen}
          />
        )}

        {selectedAnalog && (
          <DeleteAnalogDialog
            analog={selectedAnalog}
            open={deleteDialogOpen}
            onOpenChange={setDeleteDialogOpen}
          />
        )}
      </div>
    </SidebarInsetLayout>
  );
}

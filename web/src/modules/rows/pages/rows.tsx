import { SidebarInsetLayout } from "@/components/layout/SidebarInsetLayout";
import { useRegisterHeaderActions } from "@/components/layout/header-actions";
import {
  RowsContainer,
  RowsContainerSkeleton,
} from "@/modules/rows/components/containers/rows-container";
import { RowsFetcher } from "@/modules/rows/components/fetchers";
import { ExportPosesStocksDialog } from "@/modules/poses/components/dialogs/export-poses-stocks-dialog";
import { FileSpreadsheet } from "lucide-react";
import { useState } from "react";

function RowsHeaderActions({ onExport }: { onExport: () => void }) {
  useRegisterHeaderActions([
    {
      id: "export-poses-stocks",
      label: "Експорт залишків",
      icon: FileSpreadsheet,
      iconColor: "emerald",
      variant: "default",
      onClick: onExport,
    },
  ]);

  return null;
}

export function Rows() {
  const [exportDialogOpen, setExportDialogOpen] = useState(false);

  return (
    <SidebarInsetLayout headerText="Ряди">
      <RowsHeaderActions onExport={() => setExportDialogOpen(true)} />
      <ExportPosesStocksDialog
        open={exportDialogOpen}
        onOpenChange={setExportDialogOpen}
      />
      <main className="p-4">
        <RowsFetcher
          ContainerComponent={RowsContainer}
          SkeletonComponent={RowsContainerSkeleton}
        />
      </main>
    </SidebarInsetLayout>
  );
}

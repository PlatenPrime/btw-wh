import { SidebarInsetLayout } from "@/components/layout/SidebarInsetLayout";
import type { VariantDto } from "@/modules/variants/api/types";
import { VariantsHeaderActions } from "@/modules/variants/components/actions/variants-header-actions";
import { VariantsContainer, VariantsContainerSkeleton } from "@/modules/variants/components/containers/variants-container";
import { VariantsFetcher } from "@/modules/variants/components/fetchers/variants-fetcher/VariantsFetcher";
import { CreateVariantDialog } from "@/modules/variants/components/dialogs/create-variant-dialog";
import { DeleteVariantDialog } from "@/modules/variants/components/dialogs/delete-variant-dialog";
import { UpdateVariantDialog } from "@/modules/variants/components/dialogs/update-variant-dialog";
import { VariantsControls } from "@/modules/variants/components/controls/variants-controls/VariantsControls";
import { useVariantsParams } from "@/modules/variants/hooks/useVariantsParams";
import { useKonksQuery } from "@/modules/konks/api/hooks/queries/useKonksQuery";
import { useProdsQuery } from "@/modules/prods/api/hooks/queries/useProdsQuery";
import { useState } from "react";

export function Variants() {
  const { page, limit, konkName, prodName, search, setPage } =
    useVariantsParams();

  const konksQuery = useKonksQuery();
  const prodsQuery = useProdsQuery();

  const konks = konksQuery.data?.data ?? [];
  const prods = prodsQuery.data?.data ?? [];

  const [createDialogOpen, setCreateDialogOpen] = useState(false);
  const [updateDialogOpen, setUpdateDialogOpen] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [selectedVariant, setSelectedVariant] = useState<VariantDto | null>(
    null,
  );

  const handleEdit = (variant: VariantDto) => {
    setSelectedVariant(variant);
    setUpdateDialogOpen(true);
  };

  const handleDelete = (variant: VariantDto) => {
    setSelectedVariant(variant);
    setDeleteDialogOpen(true);
  };

  return (
    <SidebarInsetLayout headerText="Варіанти">
      <div className="grid gap-2 p-2">
        <VariantsHeaderActions
          onCreateDialogOpenChange={setCreateDialogOpen}
        />

        <VariantsControls />

        <VariantsFetcher
          params={{
            page,
            limit,
            konkName: konkName || undefined,
            prodName: prodName || undefined,
            search: search || undefined,
          }}
          ContainerComponent={({ data }) => (
            <VariantsContainer
              data={data}
              konks={konks}
              prods={prods}
              onEdit={handleEdit}
              onDelete={handleDelete}
              onPageChange={setPage}
            />
          )}
          SkeletonComponent={VariantsContainerSkeleton}
        />

        <CreateVariantDialog
          open={createDialogOpen}
          onOpenChange={setCreateDialogOpen}
        />

        {selectedVariant && (
          <UpdateVariantDialog
            variant={selectedVariant}
            open={updateDialogOpen}
            onOpenChange={setUpdateDialogOpen}
          />
        )}

        {selectedVariant && (
          <DeleteVariantDialog
            variant={selectedVariant}
            open={deleteDialogOpen}
            onOpenChange={setDeleteDialogOpen}
          />
        )}
      </div>
    </SidebarInsetLayout>
  );
}


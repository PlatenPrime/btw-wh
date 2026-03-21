import { SidebarInsetLayout } from "@/components/layout/SidebarInsetLayout";
import { SkugrsHeaderActions } from "@/modules/skugrs/components/actions/skugrs-header-actions/SkugrsHeaderActions";
import {
  SkugrsContainer,
  SkugrsContainerSkeleton,
} from "@/modules/skugrs/components/containers/skugrs-container";
import { CreateSkugrDialog } from "@/modules/skugrs/components/dialogs/create-skugr-dialog/CreateSkugrDialog";
import { SkugrsControls } from "@/modules/skugrs/components/controls/skugrs-controls/SkugrsControls";
import { SkugrsFetcher } from "@/modules/skugrs/components/fetchers/skugrs-fetcher";
import { useSkugrsParams } from "@/modules/skugrs/hooks/useSkugrsParams";
import { useKonksQuery } from "@/modules/konks/api/hooks/queries/useKonksQuery";
import { useProdsQuery } from "@/modules/prods/api/hooks/queries/useProdsQuery";
import { useState } from "react";
import { useNavigate } from "react-router";

export function Skugrs() {
  const navigate = useNavigate();
  const { page, limit, konkName, prodName, search, setPage } = useSkugrsParams();
  const konksQuery = useKonksQuery();
  const prodsQuery = useProdsQuery();
  const konks = konksQuery.data?.data ?? [];
  const prods = prodsQuery.data?.data ?? [];
  const [createDialogOpen, setCreateDialogOpen] = useState(false);

  return (
    <SidebarInsetLayout headerText="Товарні групи">
      <div className="grid gap-2 p-2">
        <SkugrsHeaderActions onCreateDialogOpenChange={setCreateDialogOpen} />
        <SkugrsControls />

        <SkugrsFetcher
          params={{
            page,
            limit,
            konkName: konkName || undefined,
            prodName: prodName || undefined,
            search: search || undefined,
          }}
          ContainerComponent={({ data }) => (
            <SkugrsContainer
              data={data}
              konks={konks}
              prods={prods}
              onPageChange={setPage}
            />
          )}
          SkeletonComponent={SkugrsContainerSkeleton}
        />

        <CreateSkugrDialog
          open={createDialogOpen}
          onOpenChange={setCreateDialogOpen}
          onCreated={(id) => navigate(`/sku/skugrs/${id}`)}
        />
      </div>
    </SidebarInsetLayout>
  );
}

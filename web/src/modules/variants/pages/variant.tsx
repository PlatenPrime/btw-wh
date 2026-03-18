import { SidebarInsetLayout } from "@/components/layout/SidebarInsetLayout";
import { VariantFetcher } from "@/modules/variants/components/fetchers/variant-fetcher/VariantFetcher";
import type { VariantDto } from "@/modules/variants/api/types";
import { VariantContainer, VariantContainerSkeleton } from "@/modules/variants/components/containers/variant-container";
import { useKonksQuery } from "@/modules/konks/api/hooks/queries/useKonksQuery";
import { useProdsQuery } from "@/modules/prods/api/hooks/queries/useProdsQuery";
import { useParams } from "react-router";

export function Variant() {
  const { id } = useParams<{ id: string }>();

  const konksQuery = useKonksQuery();
  const prodsQuery = useProdsQuery();
  const konks = konksQuery.data?.data ?? [];
  const prods = prodsQuery.data?.data ?? [];

  if (!id) {
    return (
      <SidebarInsetLayout headerText="Варіант">
        <main className="p-4">
          <p className="text-muted-foreground text-center">
            Ідентифікатор варіанта не вказано
          </p>
        </main>
      </SidebarInsetLayout>
    );
  }

  return (
    <SidebarInsetLayout headerText="Варіант">
      <main className="p-4">
        <VariantFetcher
          id={id}
          ContainerComponent={({ variant }: { variant: VariantDto }) => (
            <VariantContainer variant={variant} konks={konks} prods={prods} />
          )}
          SkeletonComponent={VariantContainerSkeleton}
        />
      </main>
    </SidebarInsetLayout>
  );
}


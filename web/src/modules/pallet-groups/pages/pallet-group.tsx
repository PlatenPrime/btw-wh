import { SidebarInsetLayout } from "@/components/layout/SidebarInsetLayout";
import { usePalletGroupQuery } from "@/modules/pallet-groups/api/hooks/queries/usePalletGroupQuery";
import { PalletGroupHeaderActions } from "@/modules/pallet-groups/components/actions/pallet-group-header-actions";
import { PalletGroupContainer } from "@/modules/pallet-groups/components/containers/pallet-group-container/PalletGroupContainer";
import { PalletGroupContainerSkeleton } from "@/modules/pallet-groups/components/containers/pallet-group-container/PalletGroupContainerSkeleton";
import { useParams } from "react-router";

export function PalletGroupPage() {
  const { id } = useParams<{ id: string }>();
  const groupQuery = usePalletGroupQuery({ id: id ?? "", enabled: !!id });
  const groupData = groupQuery.data;

  if (!id) {
    return (
      <SidebarInsetLayout headerText="Групу палет не знайдено">
        <main className="p-4">
          <div className="text-muted-foreground text-center">
            ID групи палет не вказано
          </div>
        </main>
      </SidebarInsetLayout>
    );
  }

  const headerText = groupData?.data
    ? `Група палет: ${groupData.data.title}`
    : "Група палет";

  return (
    <SidebarInsetLayout headerText={headerText}>
      {groupData?.data && <PalletGroupHeaderActions group={groupData.data} />}
      <main className="p-2">
        {groupQuery.isLoading && <PalletGroupContainerSkeleton />}
        {groupQuery.data && (
          <PalletGroupContainer group={groupQuery.data.data} />
        )}
      </main>
    </SidebarInsetLayout>
  );
}

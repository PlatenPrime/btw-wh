import { SidebarInsetLayout } from "@/components/layout/SidebarInsetLayout";
import { KasksContainer } from "@/modules/kasks/components/containers/kasks-container/KasksContainer";
import { KasksContainerSkeleton } from "@/modules/kasks/components/containers/kasks-container/KasksContainerSkeleton";
import { CreateKaskForm } from "@/modules/kasks/components/forms/create-kask-form/CreateKaskForm";
import { KasksFetcher } from "@/modules/kasks/components/fetchers/kasks-fetcher/KasksFetcher";

export function KasksPage() {
  return (
    <SidebarInsetLayout headerText="Запити до каси">
      <div className="grid gap-4 p-2">
        <CreateKaskForm />
        <KasksFetcher
          ContainerComponent={KasksContainer}
          SkeletonComponent={KasksContainerSkeleton}
        />
      </div>
    </SidebarInsetLayout>
  );
}

import { SidebarInsetLayout } from "@/components/layout/sidebar-inset-layout/SidebarInsetLayout";
import { Page, PageSection } from "@/components/shared/layout";
import { KasksContainer } from "@/modules/kasks/components/containers/kasks-container/KasksContainer";
import { KasksContainerSkeleton } from "@/modules/kasks/components/containers/kasks-container/KasksContainerSkeleton";
import { CreateKaskForm } from "@/modules/kasks/components/forms/create-kask-form/CreateKaskForm";
import { KasksFetcher } from "@/modules/kasks/components/fetchers/kasks-fetcher/KasksFetcher";

export function KasksPage() {
  return (
    <SidebarInsetLayout headerText="Запити до каси">
      <Page>
        <PageSection>
          <CreateKaskForm />
        </PageSection>
        <PageSection>
          <KasksFetcher
            ContainerComponent={KasksContainer}
            SkeletonComponent={KasksContainerSkeleton}
          />
        </PageSection>
      </Page>
    </SidebarInsetLayout>
  );
}

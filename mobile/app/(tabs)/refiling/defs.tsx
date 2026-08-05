import { PageLayout } from "@/components/layout/page-layout";
import { DefsContent } from "@/modules/defs/components/fetchers/defs-content/DefsContent";

export default function DefsScreen() {
  return (
    <PageLayout title="Дефіцити">
      <DefsContent />
    </PageLayout>
  );
}

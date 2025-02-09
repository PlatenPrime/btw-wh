import { Page } from "@/components/layout/PageLayout/Page";
import { ArtsDashboard } from "@/modules/arts/components/ArtsDashboard/ArtsDashboard";

export const ArtsPage = () => {
  return (
    <Page title="Артикули">
      <ArtsDashboard />
    </Page>
  );
};

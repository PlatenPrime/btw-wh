import { Page } from "@/components/layout/PageLayout/Page";
import { ArtWidget } from "@/modules/arts/widgets/art";
import { useParams } from "react-router";

export function ArtByIdPage() {
  const { artId } = useParams();
  console.log(artId);

  return (
    <Page title="Артикули">
      <ArtWidget />
    </Page>
  );
}

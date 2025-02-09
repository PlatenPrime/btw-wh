import { Page } from "@/components/layout/PageLayout/Page";
import { Link } from "react-router";
import {ArtsDashboard} from "@/modules/arts/components/ArtsDashboard/ArtsDashboard";

export const ArtsPage = () => {
  return (
    <Page title="Артикули">
      <ArtsDashboard />
      <Link to="675bf9cf103cad50398b06fe">1101-0001</Link>
    </Page>
  );
};

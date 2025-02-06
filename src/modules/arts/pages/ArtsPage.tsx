import { Page } from "@/components/layout/PageLayout/Page";
import { Link } from "react-router";
import { useQueryArts } from "@/modules/arts/api/useQueryArts";

export const ArtsPage = () => {

  const { data, isLoading } = useQueryArts({ page: 1, limit: 10, search: "1102" });

console.log(data);


  return (
    <Page title="Артикули">
      {isLoading && <div>Loading...</div>}
      <Link to="675bf9cf103cad50398b06fe">1101-0001</Link>
    </Page>
  );
};

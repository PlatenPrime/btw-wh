import { useQueryArts } from "@/modules/arts/api/useQueryArts";
import { ArtsList } from "@/modules/arts/components/ArtsDashboard/ArtsList/ArtsList";

export function ArtsDashboard() {
  const { data, isLoading } = useQueryArts({
    page: 1,
    limit: 10,
    search: "1102",
  });

  console.log(data);

  return (
    <div>
      <p>{isLoading && "loading..."}</p>
      <p>Search</p>
      <p>
        <ArtsList data={data?.data} />
      </p>
      <p>Pagination</p>
    </div>
  );
}

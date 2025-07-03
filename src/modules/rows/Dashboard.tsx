import { useRowsQuery } from "./api/useRowsQuery";

export function Dashboard() {
  const { data, isLoading, error } = useRowsQuery();
  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error loading rows</div>;
  }

  return (
    <div>
      Dashboard
      {data?.map((row) => (
        <div key={row._id}>
          <h2>{row.title}</h2>
        </div>
      ))}
    </div>
  );
}

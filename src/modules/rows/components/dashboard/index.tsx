import { useRowsQuery } from "../../api/useRowsQuery";
import { View } from "./view";

export function Dashboard() {
  const { data, isLoading, error } = useRowsQuery();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error loading rows</div>;
  }

  if (!data) {
    return <div>No rows found</div>;
  }

  return <View data={data} />;
}

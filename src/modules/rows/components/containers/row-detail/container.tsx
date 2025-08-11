import { useParams } from "react-router";
import { RowDetail } from "./RowDetail";

export function RowDetailContainer() {
  const { row } = useParams<{ row: string }>();

  return <RowDetail rowTitle={row} />;
}

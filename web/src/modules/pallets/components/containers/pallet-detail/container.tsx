import { useParams } from "react-router";
import { PalletDetail } from "./PalletDetail";

export function PalletDetailContainer() {
  const { title } = useParams<{ title: string }>();

  return <PalletDetail palletTitle={title} />;
}

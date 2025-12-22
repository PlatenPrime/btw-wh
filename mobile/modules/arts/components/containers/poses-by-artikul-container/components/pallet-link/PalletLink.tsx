import { useRouter } from "expo-router";
import type { PosResponse } from "@/modules/poses/api/types";
import { PalletLinkView } from "./PalletLinkView";

interface PalletLinkProps {
  pos: PosResponse;
}

export function PalletLink({ pos }: PalletLinkProps) {
  const router = useRouter();

  const handlePress = () => {
    if (pos.data?.pallet) {
      router.push(`/(tabs)/warehouse/pallets/${pos.data.pallet}` as any);
    }
  };

  return <PalletLinkView pos={pos} onPress={handlePress} />;
}


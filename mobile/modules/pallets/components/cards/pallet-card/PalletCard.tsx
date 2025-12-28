import type { PalletShortDto } from "@/modules/pallets/api/types";
import { PalletCardMenu } from "@/modules/pallets/components/menus/pallet-card-menu/PalletCardMenu";
import { useRouter } from "expo-router";
import { PalletCardView } from "./PalletCardView";

interface PalletCardProps {
  pallet: PalletShortDto;
  rowId: string;
}

export function PalletCard({ pallet, rowId }: PalletCardProps) {
  const router = useRouter();

  const handlePress = () => {
    router.push(`/(tabs)/warehouse/pallets/${pallet._id}` as any);
  };

  const menu = <PalletCardMenu pallet={pallet} rowId={rowId} />;

  return (
    <PalletCardView
      title={pallet.title}
      sector={pallet.sector}
      isEmpty={pallet.isEmpty}
      isDef={pallet.isDef}
      onPress={handlePress}
      menu={menu}
    />
  );
}

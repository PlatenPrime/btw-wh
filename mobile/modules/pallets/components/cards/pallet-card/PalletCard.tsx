import { useIconColor } from "@/hooks/use-icon-color";
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
  const iconColor = useIconColor();

  const handlePress = () => {
    router.push(`/(tabs)/warehouse/pallets/${pallet._id}` as any);
  };

  const menu = <PalletCardMenu pallet={pallet} rowId={rowId} />;

  // Вычисляем isEmpty на основе poses, если isEmpty не пришло с бэкенда
  // Это необходимо, так как API для мобильной версии возвращает полные объекты с poses,
  // но без вычисленного isEmpty
  const isEmpty =
    pallet.isEmpty !== undefined
      ? pallet.isEmpty
      : Array.isArray(pallet.poses)
      ? pallet.poses.length === 0
      : false;

  return (
    <PalletCardView
      title={pallet.title}
      sector={pallet.sector}
      isEmpty={isEmpty}
      isDef={pallet.isDef}
      onPress={handlePress}
      menu={menu}
      iconColor={iconColor}
    />
  );
}

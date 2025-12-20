import { useColorScheme } from "@/hooks/use-color-scheme";
import { useRouter } from "expo-router";
import type { PalletShortDto } from "@/modules/pallets/api/types";
import { PalletCardView } from "./PalletCardView";

interface PalletCardProps {
  pallet: PalletShortDto;
  rowId: string;
}

export function PalletCard({ pallet, rowId }: PalletCardProps) {
  const router = useRouter();
  const colorScheme = useColorScheme() ?? "light";
  const bgColor = colorScheme === "light" ? "#fff" : "#1f2937";
  const borderColor = colorScheme === "light" ? "#d1d5db" : "#4b5563";

  const handlePress = () => {
    router.push(`/(tabs)/warehouse/pallets/${pallet._id}` as any);
  };

  return (
    <PalletCardView
      title={pallet.title}
      sector={pallet.sector}
      isEmpty={pallet.isEmpty}
      isDef={pallet.isDef}
      onPress={handlePress}
      bgColor={bgColor}
      borderColor={borderColor}
    />
  );
}


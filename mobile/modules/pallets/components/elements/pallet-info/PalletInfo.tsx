import type { IPallet } from "@/modules/pallets/api/types";
import { PalletInfoView } from "./PalletInfoView";
import { useColorScheme } from "@/hooks/use-color-scheme";
import { Colors } from "@/constants/theme";

interface PalletInfoProps {
  pallet: IPallet;
}

export function PalletInfo({ pallet }: PalletInfoProps) {
  const colorScheme = useColorScheme() ?? "light";
  const iconColor =
    colorScheme === "light" ? Colors.light.text : Colors.dark.text;

  const totalPositions = pallet.poses.length;

  const totalBoxes = pallet.poses.reduce(
    (sum, pos) => sum + (pos.boxes || 0),
    0,
  );

  return (
    <PalletInfoView
      totalPositions={totalPositions}
      totalBoxes={totalBoxes}
      iconColor={iconColor}
    />
  );
}


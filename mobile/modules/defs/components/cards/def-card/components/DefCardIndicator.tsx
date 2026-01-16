import type { DeficitItem } from "@/modules/defs/api/types/dto";
import { View } from "react-native";

interface DefCardIndicatorProps {
  defItem: DeficitItem;
}

export function DefCardIndicator({ defItem }: DefCardIndicatorProps) {
  const isCritical = defItem.status === "critical";
  const indicatorColor = isCritical
    ? "#ef4444" // red-500
    : "#eab308"; // yellow-500

  return (
    <View
      style={{
        width: 8,
        height: 8,
        borderRadius: 4,
        backgroundColor: indicatorColor,
      }}
    />
  );
}

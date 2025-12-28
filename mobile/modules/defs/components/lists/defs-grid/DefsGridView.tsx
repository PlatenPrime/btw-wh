import { View } from "react-native";
import type { Def, DeficitItem } from "@/modules/defs/api/types/dto";
import { DefCard } from "@/modules/defs/components/cards/def-card/DefCard";
import type { DeficitFilter } from "@/modules/defs/components/elements/defs-stats/DefsStatsView";
import { DefsGridEmpty } from "./DefsGridEmpty";

interface DefsGridViewProps {
  defsData: Def;
  filter: DeficitFilter;
}

// Fallback функция для определения статуса дефицита
const getDeficitStatus = (item: DeficitItem): "limited" | "critical" => {
  if (item.status) {
    return item.status;
  }
  if (item.sharikQuant <= item.quant) {
    return "critical";
  } else if (item.sharikQuant <= item.defLimit) {
    return "limited";
  }
  return "limited";
};

export function DefsGridView({ defsData, filter }: DefsGridViewProps) {
  const filteredDeficits = Object.entries(defsData.result).filter(
    ([_, defItem]) => {
      if (filter === "all") return true;
      const status = getDeficitStatus(defItem);
      return status === filter;
    },
  );

  if (filteredDeficits.length === 0) {
    return <DefsGridEmpty />;
  }

  return (
    <View className="gap-2">
      {filteredDeficits.map(([artikul, defItem]) => (
        <DefCard key={artikul} artikul={artikul} defItem={defItem} />
      ))}
    </View>
  );
}

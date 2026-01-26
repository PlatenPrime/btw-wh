import { Wrapper } from "@/components/shared/wrappers/Wrapper";
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
    ([, defItem]) => {
      if (filter === "all") return true;
      const status = getDeficitStatus(defItem);
      return status === filter;
    },
  );

  if (filteredDeficits.length === 0) {
    return <DefsGridEmpty />;
  }

  return (
    <Wrapper className="grid gap-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {filteredDeficits.map(([artikul, defItem]) => (
        <DefCard key={artikul} artikul={artikul} defItem={defItem} />
      ))}
    </Wrapper>
  );
}

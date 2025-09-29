import { Container } from "@/components/shared/container";
import type { Defcalc } from "@/modules/defs/api/types/dto";
import { DefCard } from "@/modules/defs/components/cards/def-card/DefCard";
import { DefsGridEmpty } from "./DefsGridEmpty";

interface DefsGridViewProps {
  defsData: Defcalc;
}

export function DefsGridView({ defsData }: DefsGridViewProps) {
  if (defsData.total === 0) {
    return <DefsGridEmpty />;
  }

  return (
    <Container className="grid gap-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {Object.entries(defsData.result).map(([artikul, defItem]) => (
        <DefCard key={artikul} artikul={artikul} defItem={defItem} />
      ))}
    </Container>
  );
}

import { Container } from "@/components/shared/container";
import type { Defcalc } from "@/modules/defs/api/types/dto";
import { DefCard } from "@/modules/defs/components/cards/def-card/DefCard";

interface DefsGridViewProps {
  defsData: Defcalc;
}

export function DefsGridView({ defsData }: DefsGridViewProps) {
  const deficitItems = Object.entries(defsData.result)

  if (deficitItems.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-12 text-center">
        <div className="text-muted-foreground">
          <h3 className="text-lg font-medium">Немає дефіцитів</h3>
          <p className="text-sm">Всі товари в нормі</p>
        </div>
      </div>
    );
  }

  return (
    <Container className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {deficitItems.map(([artikul, defItem]) => (
        <DefCard key={artikul} artikul={artikul} defItem={defItem} />
      ))}
    </Container>
  );
}

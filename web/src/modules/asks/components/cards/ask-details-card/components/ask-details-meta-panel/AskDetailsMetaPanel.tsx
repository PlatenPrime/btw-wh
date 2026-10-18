import { MetricChip } from "@/components/shared/elements";
import { typography } from "@/lib/typography";
import { sklads, type ISklads } from "@/constants/sklad";
import type { AskDto } from "@/modules/asks/api/types/dto";
import { CircleIcon, MapPin, MessageSquareMore, Warehouse } from "lucide-react";

interface AskDetailsMetaPanelProps {
  sklad?: AskDto["sklad"];
  zone?: string;
  quant?: number;
  com?: string;
}

function SectionLabel({ children }: { children: string }) {
  return <span className={typography.sectionLabel}>{children}</span>;
}

export function AskDetailsMetaPanel({
  sklad,
  zone,
  quant,
  com,
}: AskDetailsMetaPanelProps) {
  const skladLabel = sklad ? sklads[sklad as keyof ISklads] || sklad : null;
  const hasSklad = Boolean(skladLabel);
  const hasZone = Boolean(zone);
  const hasWarehouse = hasSklad || hasZone;
  const hasQuant = Boolean(quant);
  const hasCom = Boolean(com);
  const hasRequest = hasQuant || hasCom;

  if (!hasWarehouse && !hasRequest) {
    return (
      <p className={typography.caption}>Немає додаткових деталей запиту</p>
    );
  }

  return (
    <div className="grid gap-4">
      {hasWarehouse ? (
        <div className="grid gap-3">
          <SectionLabel>Склад</SectionLabel>
          <div className="grid gap-2">
            {hasSklad ? (
              <MetricChip
                icon={Warehouse}
                tone="muted"
                label="Склад"
                value={skladLabel}
                className="w-full"
              />
            ) : null}
            {hasZone ? (
              <MetricChip
                icon={MapPin}
                tone="warning"
                label="Зона"
                value={zone}
                className="w-full"
              />
            ) : null}
          </div>
        </div>
      ) : null}

      {hasRequest ? (
        <div className="grid gap-3">
          <SectionLabel>Запит</SectionLabel>
          <div className="grid gap-2">
            {hasQuant ? (
              <MetricChip
                icon={CircleIcon}
                tone="info"
                label="Кількість"
                value={quant}
                className="w-full"
              />
            ) : null}
            {hasCom ? (
              <MetricChip
                icon={MessageSquareMore}
                tone="edit"
                label="Коментар"
                value={com}
                className="w-full"
              />
            ) : null}
          </div>
        </div>
      ) : null}
    </div>
  );
}

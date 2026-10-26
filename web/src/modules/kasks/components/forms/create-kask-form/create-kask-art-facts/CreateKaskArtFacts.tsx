import type { IconWellTone } from "@/components/shared/elements/icon-well/IconWell";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";
import { ArtMetricFieldRow } from "@/modules/arts/components/elements/art-metric-field-row";
import { CreateKaskArtFactsSkeleton } from "@/modules/kasks/components/forms/create-kask-form/create-kask-art-facts/CreateKaskArtFactsSkeleton";
import type { KaskFactState } from "@/modules/kasks/components/forms/create-kask-form/create-kask-art-facts/kask-fact-state";
import {
  Banknote,
  MapPin,
  Send,
  Warehouse,
  type LucideIcon,
} from "lucide-react";
import type { ReactNode } from "react";

interface CreateKaskArtFactsProps {
  zone: KaskFactState;
  quantity: KaskFactState;
  price: KaskFactState;
  isSubmitting: boolean;
  canSubmit: boolean;
}

function FactValue({ state }: { state: KaskFactState }) {
  if (state.kind === "loading") {
    return <Skeleton className="h-4 w-16" />;
  }

  if (state.kind === "value") {
    return state.text;
  }

  return <span className="text-muted-foreground">—</span>;
}

function FactRow({
  icon,
  tone,
  label,
  state,
}: {
  icon: LucideIcon;
  tone: IconWellTone;
  label: string;
  state: KaskFactState;
}) {
  return (
    <ArtMetricFieldRow
      icon={icon}
      tone={tone}
      label={label}
      value={<FactValue state={state} />}
      className="w-full"
    />
  );
}

function FactsBody({
  zone,
  quantity,
  price,
}: {
  zone: KaskFactState;
  quantity: KaskFactState;
  price: KaskFactState;
}): ReactNode {
  const isColumnLoading =
    zone.kind === "loading" &&
    quantity.kind === "loading" &&
    price.kind === "loading";

  if (isColumnLoading) {
    return <CreateKaskArtFactsSkeleton />;
  }

  return (
    <div className="grid gap-2">
      <FactRow icon={MapPin} tone="info" label="Зона" state={zone} />
      <FactRow icon={Warehouse} tone="primary" label="Залишок" state={quantity} />
      <FactRow icon={Banknote} tone="success" label="Ціна" state={price} />
    </div>
  );
}

export function CreateKaskArtFacts({
  zone,
  quantity,
  price,
  isSubmitting,
  canSubmit,
}: CreateKaskArtFactsProps) {
  return (
    <div className="flex h-full flex-col gap-3">
      <FactsBody zone={zone} quantity={quantity} price={price} />
      <Button
        type="submit"
        disabled={isSubmitting || !canSubmit}
        size="lg"
        className={cn(
          "mt-auto w-full gap-2 text-primary-foreground",
          "bg-[linear-gradient(135deg,color-mix(in_oklch,var(--primary)_92%,var(--chart-6)),color-mix(in_oklch,var(--chart-6)_55%,var(--primary)))]",
          "hover:brightness-[1.06] hover:shadow-md",
          "disabled:hover:brightness-100",
        )}
      >
        <Send className="size-4" aria-hidden />
        {isSubmitting ? "Відправка…" : "Створити запит"}
      </Button>
    </div>
  );
}

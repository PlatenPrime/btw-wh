import { useBtradeArtDataQuery } from "@/modules/arts/api/hooks/queries/useBtradeArtDataQuery";
import { CreateKaskArtFacts } from "@/modules/kasks/components/forms/create-kask-form/create-kask-art-facts/CreateKaskArtFacts";
import type { KaskFactState } from "@/modules/kasks/components/forms/create-kask-form/create-kask-art-facts/kask-fact-state";

interface CreateKaskArtFactsContainerProps {
  artikul: string;
  isArtLoading: boolean;
  zoneValue: string;
  isSubmitting: boolean;
  canSubmit: boolean;
}

const quantityFormat = new Intl.NumberFormat("uk-UA");

function resolveMetric(isLoading: boolean, text: string | null): KaskFactState {
  if (isLoading) return { kind: "loading" };
  if (text == null) return { kind: "empty" };
  return { kind: "value", text };
}

function resolveZone(
  isFullArtikul: boolean,
  isArtLoading: boolean,
  zoneValue: string,
): KaskFactState {
  if (!isFullArtikul) return { kind: "empty" };
  if (isArtLoading) return { kind: "loading" };
  const zone = zoneValue.trim();
  if (!zone) return { kind: "empty" };
  return { kind: "value", text: zone };
}

export function CreateKaskArtFactsContainer({
  artikul,
  isArtLoading,
  zoneValue,
  isSubmitting,
  canSubmit,
}: CreateKaskArtFactsContainerProps) {
  const isFullArtikul = artikul.length === 9;
  const btradeQuery = useBtradeArtDataQuery(
    isFullArtikul ? artikul : undefined,
  );

  const zone = resolveZone(isFullArtikul, isArtLoading, zoneValue);

  const info = isFullArtikul ? btradeQuery.data : undefined;
  const metrics = info?.exists ? info.data : null;
  const isMetricsLoading = isFullArtikul && btradeQuery.isLoading;

  const quantity = resolveMetric(
    isMetricsLoading,
    metrics ? quantityFormat.format(metrics.quantity) : null,
  );
  const price = resolveMetric(
    isMetricsLoading,
    metrics ? `${metrics.price} грн` : null,
  );

  return (
    <CreateKaskArtFacts
      zone={zone}
      quantity={quantity}
      price={price}
      isSubmitting={isSubmitting}
      canSubmit={canSubmit}
    />
  );
}

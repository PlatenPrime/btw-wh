import { ArtMetricFieldRow } from "@/modules/arts/components/elements/art-metric-field-row";
import type { BtradeArtInfoDto } from "@/modules/arts/api/types/dto";
import type { BtradeArtDataContainerProps } from "@/modules/arts/components/fetchers/btrade-art-data-fetcher/BtradeArtDataFetcher";
import { Banknote, Warehouse } from "lucide-react";

interface BtradeArtDataPanelSummaryProps {
  data: BtradeArtInfoDto;
}

function formatQuantity(quantity: number): string {
  return new Intl.NumberFormat("uk-UA").format(quantity);
}

function BtradeArtDataPanelSummary({ data }: BtradeArtDataPanelSummaryProps) {
  return (
    <>
      <ArtMetricFieldRow
        icon={Warehouse}
        iconClassName="text-primary"
        label="Залишок"
        value={formatQuantity(data.quantity)}
      />
      <ArtMetricFieldRow
        icon={Banknote}
        iconClassName="text-success"
        label="Ціна"
        value={`${data.price} грн`}
      />
    </>
  );
}

export function BtradeArtDataPanelContainerView({
  exists,
  data,
}: BtradeArtDataContainerProps) {
  if (!exists) {
    return (
      <p className="text-muted-foreground text-xs">
        Товар відсутній на sharik.ua
      </p>
    );
  }

  if (!data) {
    return (
      <p className="text-muted-foreground text-xs">
        Дані тимчасово недоступні
      </p>
    );
  }

  return <BtradeArtDataPanelSummary data={data} />;
}

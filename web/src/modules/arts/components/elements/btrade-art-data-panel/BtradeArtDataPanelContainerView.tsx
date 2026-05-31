import { SummaryField } from "@/components/shared/summary-field";
import type { BtradeArtInfoDto } from "@/modules/arts/api/types/dto";
import type { BtradeArtDataContainerProps } from "@/modules/arts/components/fetchers/btrade-art-data-fetcher/BtradeArtDataFetcher";

interface BtradeArtDataPanelSummaryProps {
  data: BtradeArtInfoDto;
}

function BtradeArtDataPanelSummary({ data }: BtradeArtDataPanelSummaryProps) {
  return (
    <>
      <SummaryField label="Залишок" value={data.quantity} />
      <SummaryField label="Ціна" value={`${data.price} грн`} />
    </>
  );
}

export function BtradeArtDataPanelContainerView({
  exists,
  data,
}: BtradeArtDataContainerProps) {
  if (!exists) {
    return (
      <p className="text-muted-foreground col-span-2 text-xs">
        Товар відсутній на sharik.ua
      </p>
    );
  }

  if (!data) {
    return (
      <p className="text-muted-foreground col-span-2 text-xs">
        Дані тимчасово недоступні
      </p>
    );
  }

  return <BtradeArtDataPanelSummary data={data} />;
}

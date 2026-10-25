import { memo } from "react";
import { Virtuoso } from "react-virtuoso";
import { LoadingNoData } from "@/components/shared/feedback/loading-states";
import { typography } from "@/lib/typography";
import type { GetAsksByArtikulResponse } from "@/modules/asks/api/types/dto";
import { AsksByArtikulCard } from "@/modules/asks/components/cards/asks-by-artikul-card";

interface AsksByArtikulContainerViewProps {
  data: GetAsksByArtikulResponse;
}

export const AsksByArtikulContainerView = memo(function AsksByArtikulContainerView({
  data,
}: AsksByArtikulContainerViewProps) {
  const asks = data.data;

  if (asks.length === 0) {
    return (
      <LoadingNoData description="Запитів не знайдено" />
    );
  }

  const shouldVirtualize = asks.length >= 50;

  return (
    <main className="grid gap-3">
      <h2 className={typography.sectionTitle}>Запити</h2>

      {shouldVirtualize ? (
        <Virtuoso
          data={asks}
          itemContent={(_index, ask) => (
            <div className="pb-3">
              <AsksByArtikulCard ask={ask} />
            </div>
          )}
          style={{ height: "600px" }}
        />
      ) : (
        <div className="grid gap-3">
          {asks.map((ask) => (
            <AsksByArtikulCard key={ask._id} ask={ask} />
          ))}
        </div>
      )}
    </main>
  );
});

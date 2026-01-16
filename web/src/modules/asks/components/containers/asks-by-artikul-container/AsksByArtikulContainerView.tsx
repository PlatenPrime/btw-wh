import { memo } from "react";
import { Virtuoso } from "react-virtuoso";
import type { GetAsksByArtikulResponse } from "@/modules/asks/api/types/dto";
import { AsksByArtikulCard } from "@/modules/asks/components/cards/asks-by-artikul-card";

interface AsksByArtikulContainerViewProps {
  data: GetAsksByArtikulResponse;
}

export const AsksByArtikulContainerView = memo(function AsksByArtikulContainerView({
  data,
}: AsksByArtikulContainerViewProps) {
  const shouldVirtualize = data.data.length >= 50;

  return (
    <main className="grid gap-2">
      {/* Статистика */}

      <h2 className="text-card-foreground text-center text-lg font-bold">
        Запити
      </h2>

      {/* Список карточек */}
      {shouldVirtualize ? (
        <Virtuoso
          data={data.data}
          itemContent={(_index, ask) => (
            <div className="mb-2">
              <AsksByArtikulCard ask={ask} />
            </div>
          )}
          style={{ height: "600px" }}
        />
      ) : (
        <div className="grid gap-2">
          {data.data.map((ask) => (
            <AsksByArtikulCard key={ask._id} ask={ask} />
          ))}
        </div>
      )}
    </main>
  );
});

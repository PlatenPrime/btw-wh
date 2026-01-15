import type { GetAsksByArtikulResponse } from "@/modules/asks/api/types/dto";
import { AsksByArtikulCard } from "@/modules/asks/components/cards/asks-by-artikul-card";

interface AsksByArtikulContainerViewProps {
  data: GetAsksByArtikulResponse;
}

export function AsksByArtikulContainerView({
  data,
}: AsksByArtikulContainerViewProps) {
  return (
    <main className="grid gap-2">
      {/* Статистика */}

      <h2 className="text-card-foreground text-center text-lg font-bold">
        Запити
      </h2>

      {/* Список карточек */}
      <div className="grid gap-2">
        {data.data.map((ask) => (
          <AsksByArtikulCard key={ask._id} ask={ask} />
        ))}
      </div>
    </main>
  );
}

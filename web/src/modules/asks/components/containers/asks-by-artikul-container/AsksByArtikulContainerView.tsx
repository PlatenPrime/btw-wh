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
      <div className="text-foreground flex items-center gap-4 text-sm">
        <span>
          Всього: <strong>{data.count}</strong>
        </span>
        <span>
          Нові: <strong>{data.newCount}</strong>
        </span>
        <span>
          В процесі: <strong>{data.processingCount}</strong>
        </span>
        <span>
          Завершено: <strong>{data.completedCount}</strong>
        </span>
        <span>
          Відмовлено: <strong>{data.rejectedCount}</strong>
        </span>
      </div>

      {/* Список карточек */}
      <div className="grid gap-2">
        {data.data.map((ask) => (
          <AsksByArtikulCard key={ask._id} ask={ask} />
        ))}
      </div>
    </main>
  );
}

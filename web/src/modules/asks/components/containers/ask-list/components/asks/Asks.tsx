import type { GetAsksByDateResponse } from "@/modules/asks/api/types/dto";
import { AsksListCard } from "@/modules/asks/components/asks-list-card";
import { formatDisplayDate } from "@/utils/date";

interface AsksProps {
  selectedDate: Date;
  data: GetAsksByDateResponse;
}

export function Asks({ selectedDate, data }: AsksProps) {
  return (
    <>
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold">
          Запити на {formatDisplayDate(selectedDate)}
        </h2>
        <span className="text-muted-foreground text-sm">
          Всього: {data.count}
        </span>
      </div>

      <div className="space-y-4">
        {data.data.map((ask) => (
          <AsksListCard key={ask._id} ask={ask} />
        ))}
      </div>
    </>
  );
}

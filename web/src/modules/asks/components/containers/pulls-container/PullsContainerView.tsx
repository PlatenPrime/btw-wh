import { Wrapper } from "@/components/shared/wrappers/Wrapper";
import { cn } from "@/lib/utils";
import type { GetAsksPullsResponse } from "@/modules/asks/api/types/dto";
import { LoaderPinwheel } from "lucide-react";
import { PullsPositionCard } from "@/modules/asks/components/cards/pulls-position-card/PullsPositionCard";

interface PullsContainerViewProps {
  data: GetAsksPullsResponse["data"];
  isFetching: boolean;
}

export function PullsContainerView({
  data,
  isFetching,
}: PullsContainerViewProps) {
  // Преобразуем все позиции из всех секторов в плоский список
  const allPositions = data.positionsBySector.flatMap(
    (sectorGroup) => sectorGroup.positions,
  );

  return (
    <Wrapper className="relative grid gap-4">
      <div className="grid gap-2">
        <h2 className="flex items-center gap-2 text-lg font-semibold">
          Позиції для зняття
          {isFetching && (
            <LoaderPinwheel className="text-muted-foreground h-4 w-4 animate-spin" />
          )}
        </h2>
      </div>

      {allPositions.length === 0 ? (
        <div className="text-muted-foreground text-center py-8">
          Немає позицій для зняття
        </div>
      ) : (
        <div
          className={cn(
            "grid gap-4 transition-opacity duration-200",
            isFetching && "opacity-60",
          )}
        >
          {allPositions.map((position) => (
            <PullsPositionCard
              key={`${position._id}-${position.askId}`}
              position={position}
            />
          ))}
        </div>
      )}
    </Wrapper>
  );
}


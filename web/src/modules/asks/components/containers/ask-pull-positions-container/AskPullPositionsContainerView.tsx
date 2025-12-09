import { Wrapper } from "@/components/shared/wrappers/Wrapper";
import { cn } from "@/lib/utils";
import type {
  GetAskPullResponse
} from "@/modules/asks/api/types/dto";
import { getAskPullStatusMessage } from "@/modules/asks/utils/get-ask-pull-status-message/getAskPullStatusMessage";
import { Circle, LoaderPinwheel } from "lucide-react";
import { AskPullPositionCard } from "./components/ask-pull-position-card/AskPullPositionCard";
import { AskPullStatusMessage } from "./components/ask-pull-status-message/AskPullStatusMessage";

interface AskPullPositionsContainerViewProps {
  data: GetAskPullResponse;
  askId: string;
  isFetching: boolean;
}

export function AskPullPositionsContainerView({
  data,
  askId,
  isFetching,
}: AskPullPositionsContainerViewProps) {
  const statusMessage = getAskPullStatusMessage(data);

  return (
    <Wrapper className="relative grid gap-4">
      <div className="grid gap-2">
        <h2 className="flex items-center gap-2 text-lg font-semibold">
          Позиції для зняття
          {isFetching && (
            <LoaderPinwheel className="text-muted-foreground h-4 w-4 animate-spin" />
          )}
        </h2>
        {data.remainingQuantity !== null && data.remainingQuantity > 0 && (
          <div className="text-muted-foreground flex items-center gap-1 text-sm">
            <Circle className="h-4 w-4" />
            <span>Залишилось зняти: {data.remainingQuantity}</span>
          </div>
        )}
      </div>

      {statusMessage ? <AskPullStatusMessage statusMessage={statusMessage} /> : (
        <div
          className={cn(
            "grid lg:w-1/2 gap-4 transition-opacity duration-200",
            isFetching && "opacity-60",
          )}
        >
          {data.positions.map((position) => (
            <AskPullPositionCard
              key={position._id}
              position={position}
              askId={askId}
            />
          ))}
        </div>
      )}
    </Wrapper>
  );
}

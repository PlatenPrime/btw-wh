import { Card, CardContent } from "@/components/ui";
import { cn } from "@/lib/utils";
import type { GetAskPullResponse } from "@/modules/asks/api/types/dto";
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
    <Card className="bg-card/10 dark:bg-card/50 grid gap-4 p-2">
      <CardContent className="p-0">
        <div className="grid gap-2">
          <h2 className="text-card-foreground text-center text-lg font-bold">
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
      </CardContent>

      {statusMessage ? (
        <AskPullStatusMessage statusMessage={statusMessage} />
      ) : (
        <CardContent
          className={cn(
            "grid gap-4 transition-opacity duration-200 lg:w-1/2",
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
        </CardContent>
      )}
    </Card>
  );
}

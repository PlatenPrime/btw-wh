import { DetailPanelCard } from "@/components/shared/cards";
import { typography } from "@/lib/typography";
import { cn } from "@/lib/utils";
import type { GetAskPullResponse } from "@/modules/asks/api/types/dto";
import { getAskPullStatusMessage } from "@/modules/asks/utils/get-ask-pull-status-message/getAskPullStatusMessage";
import { Circle, LoaderPinwheel } from "lucide-react";
import { memo } from "react";
import { Virtuoso } from "react-virtuoso";
import { AskPullPositionCard } from "./components/ask-pull-position-card/AskPullPositionCard";
import { AskPullStatusMessage } from "./components/ask-pull-status-message/AskPullStatusMessage";

interface AskPullPositionsContainerViewProps {
  data: GetAskPullResponse;
  askId: string;
  isFetching: boolean;
}

export const AskPullPositionsContainerView = memo(
  function AskPullPositionsContainerView({
    data,
    askId,
    isFetching,
  }: AskPullPositionsContainerViewProps) {
    const statusMessage = getAskPullStatusMessage(data);
    const shouldVirtualize = data.positions.length >= 50;

    return (
      <DetailPanelCard className="grid gap-4 p-4 sm:p-5">
        <div className="grid gap-2">
          <h2
            className={cn(
              "flex items-center justify-center gap-2",
              typography.sectionTitle,
            )}
          >
            Позиції для зняття
            {isFetching ? (
              <LoaderPinwheel className="text-muted-foreground size-4 animate-spin" />
            ) : null}
          </h2>
          {data.remainingQuantity !== null && data.remainingQuantity > 0 ? (
            <div className="text-muted-foreground flex items-center gap-1 text-sm">
              <Circle className="size-4" />
              <span>Залишилось зняти: {data.remainingQuantity}</span>
            </div>
          ) : null}
        </div>

        {statusMessage ? (
          <AskPullStatusMessage statusMessage={statusMessage} />
        ) : (
          <div
            className={cn(
              "transition-opacity duration-200 lg:max-w-xl",
              isFetching && "opacity-60",
            )}
          >
            {shouldVirtualize ? (
              <Virtuoso
                data={data.positions}
                itemContent={(_index, position) => (
                  <div className="mb-4">
                    <AskPullPositionCard position={position} askId={askId} />
                  </div>
                )}
                style={{ height: "400px" }}
              />
            ) : (
              <div className="grid gap-4">
                {data.positions.map((position) => (
                  <AskPullPositionCard
                    key={position._id}
                    position={position}
                    askId={askId}
                  />
                ))}
              </div>
            )}
          </div>
        )}
      </DetailPanelCard>
    );
  },
);

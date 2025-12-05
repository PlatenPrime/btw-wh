import { Wrapper } from "@/components/shared/wrappers/Wrapper";
import { cn } from "@/lib/utils";
import type {
  AskStatus,
  GetAskPullResponse,
} from "@/modules/asks/api/types/dto";
import { CheckCircle2, Circle, LoaderPinwheel, PackageX } from "lucide-react";
import { AskPullPositionCard } from "./components/ask-pull-position-card/AskPullPositionCard";

interface AskPullPositionsContainerViewProps {
  data: GetAskPullResponse;
  askId: string;
  isFetching: boolean;
  askStatus: AskStatus;
}

export function AskPullPositionsContainerView({
  data,
  askId,
  isFetching,
  askStatus,
}: AskPullPositionsContainerViewProps) {
  const { positions, remainingQuantity } = data;

  // Определяем сообщение для разных сценариев
  const getStatusMessage = () => {
    // Если запрос уже завершен и позиций нет
    if (askStatus === "completed" && positions.length === 0) {
      return {
        icon: CheckCircle2,
        message: "Товар вже знято",
        description: "Запит виконано, всі позиції знято",
        variant: "success" as const,
      };
    }

    // Если товар снят, но запрос еще не завершен
    if (
      remainingQuantity !== null &&
      remainingQuantity <= 0 &&
      askStatus !== "completed"
    ) {
      return {
        icon: CheckCircle2,
        message: "Товар знято",
        description: "Залишилось виконати запит",
        variant: "info" as const,
      };
    }

    // Если нет позиций для снятия
    if (positions.length === 0) {
      if (
        remainingQuantity !== null &&
        remainingQuantity > 0 &&
        askStatus !== "completed"
      ) {
        return {
          icon: PackageX,
          message: "Немає позицій для зняття",
          description: `Залишилось зняти: ${remainingQuantity}, але позицій з цим артикулом на складі не знайдено`,
          variant: "warning" as const,
        };
      }
      return {
        icon: PackageX,
        message: "Немає позицій для зняття",
        description: "Позицій з цим артикулом на складі не знайдено",
        variant: "info" as const,
      };
    }

    return null;
  };

  const statusMessage = getStatusMessage();

  return (
    <Wrapper className="relative grid gap-4">
      <div className="flex items-center justify-between">
        <h2 className="flex items-center gap-2 text-lg font-semibold">
          Позиції для зняття
          {isFetching && (
            <LoaderPinwheel className="text-muted-foreground h-4 w-4 animate-spin" />
          )}
        </h2>
        {remainingQuantity !== null && remainingQuantity > 0 && (
          <div className="text-muted-foreground flex items-center gap-1 text-sm">
            <Circle className="h-4 w-4" />
            <span>Залишилось зняти: {remainingQuantity}</span>
          </div>
        )}
      </div>

      {statusMessage ? (
        <div
          className={cn(
            "flex items-center gap-3 rounded-lg border p-4",
            statusMessage.variant === "success" &&
              "border-green-200 bg-green-50 dark:border-green-800 dark:bg-green-950/20",
            statusMessage.variant === "warning" &&
              "border-yellow-200 bg-yellow-50 dark:border-yellow-800 dark:bg-yellow-950/20",
            statusMessage.variant === "info" &&
              "border-blue-200 bg-blue-50 dark:border-blue-800 dark:bg-blue-950/20",
          )}
        >
          <statusMessage.icon
            className={cn(
              "h-5 w-5 shrink-0",
              statusMessage.variant === "success" && "text-green-600",
              statusMessage.variant === "warning" && "text-yellow-600",
              statusMessage.variant === "info" && "text-blue-600",
            )}
          />
          <div className="flex-1">
            <p className="font-semibold">{statusMessage.message}</p>
            <p className="text-muted-foreground text-sm">
              {statusMessage.description}
            </p>
          </div>
        </div>
      ) : (
        <div
          className={cn(
            "grid max-w-xl gap-2 transition-opacity duration-200",
            isFetching && "opacity-60",
          )}
        >
          {positions.map((position) => (
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

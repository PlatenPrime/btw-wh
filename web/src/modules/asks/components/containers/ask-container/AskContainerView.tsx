import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { ArtDialogImage } from "@/modules/arts/components/dialogs/art-dialog-image/ArtDialogImage";
import { BtradeArtDataFetcher } from "@/modules/arts/components/fetchers/btrade-art-data-fetcher/BtradeArtDataFetcher";
import type { AskDto } from "@/modules/asks/api/types/dto";
import { format } from "date-fns";
import { uk } from "date-fns/locale";

interface AskContainerViewProps {
  askData: AskDto;
}

const statusConfig = {
  new: { variant: "default" as const, text: "Новий" },
  in_progress: { variant: "secondary" as const, text: "В роботі" },
  completed: { variant: "outline" as const, text: "Завершено" },
  cancelled: { variant: "destructive" as const, text: "Скасовано" },
};

export function AskContainerView({ askData }: AskContainerViewProps) {
  const statusInfo = statusConfig[askData.status];

  return (
    <Card className="w-full">
      <CardHeader>
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-4">
            <ArtDialogImage artikul={askData.artikul} />
            <div className="space-y-2">
              <CardTitle className="text-xl">
                {askData.nameukr || askData.artikul}
              </CardTitle>
              <div className="flex items-center gap-2">
                <Badge variant={statusInfo?.variant}>{statusInfo?.text}</Badge>
                {askData.quant && (
                  <Badge variant="outline">Кількість: {askData.quant}</Badge>
                )}
              </div>
            </div>
          </div>
        </div>
      </CardHeader>

      <CardContent className="space-y-6">
        {/* Данные артикула */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold">Інформація про артикул</h3>
          {askData.artikul && (
            <BtradeArtDataFetcher artikul={askData.artikul} zone="" />
          )}
        </div>

        <Separator />

        {/* Информация о запросе */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold">Деталі запиту</h3>

          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <h4 className="text-muted-foreground text-sm font-medium">
                Хто запитує
              </h4>
              <div className="flex items-center gap-2">
                {askData.askerData?.photo && (
                  <img
                    src={askData.askerData?.photo}
                    alt={askData.askerData?.fullname}
                    className="h-8 w-8 rounded-full object-cover"
                  />
                )}
                <div>
                  <p className="font-medium">{askData.askerData?.fullname}</p>
                  {askData.askerData?.telegram && (
                    <p className="text-muted-foreground text-sm">
                      @{askData.askerData?.telegram}
                    </p>
                  )}
                </div>
              </div>
            </div>

            {askData.solverData && (
              <div className="space-y-2">
                <h4 className="text-muted-foreground text-sm font-medium">
                  Хто вирішує
                </h4>
                <div className="flex items-center gap-2">
                  {askData.solverData?.photo && (
                    <img
                      src={askData.solverData?.photo}
                      alt={askData.solverData?.fullname}
                      className="h-8 w-8 rounded-full object-cover"
                    />
                  )}
                  <div>
                    <p className="font-medium">
                      {askData.solverData?.fullname}
                    </p>
                    {askData.solverData.telegram && (
                      <p className="text-muted-foreground text-sm">
                        @{askData.solverData?.telegram}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            )}
          </div>

          {askData.com && (
            <div className="space-y-2">
              <h4 className="text-muted-foreground text-sm font-medium">
                Коментар
              </h4>
              <p className="bg-muted rounded-md p-3 text-sm">{askData.com}</p>
            </div>
          )}

          {askData.actions && askData.actions.length > 0 && (
            <div className="space-y-2">
              <h4 className="text-muted-foreground text-sm font-medium">Дії</h4>
              <div className="flex flex-wrap gap-2">
                {askData.actions.map((action, index) => (
                  <Badge key={index} variant="outline">
                    {action}
                  </Badge>
                ))}
              </div>
            </div>
          )}

          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <h4 className="text-muted-foreground text-sm font-medium">
                Створено
              </h4>
              <p className="text-sm">
                {(() => {
                  try {
                    const date = new Date(askData.createdAt);
                    return isNaN(date.getTime())
                      ? askData.createdAt
                      : format(date, "dd MMMM yyyy, HH:mm", { locale: uk });
                  } catch {
                    return askData.createdAt;
                  }
                })()}
              </p>
            </div>
            <div className="space-y-2">
              <h4 className="text-muted-foreground text-sm font-medium">
                Оновлено
              </h4>
              <p className="text-sm">
                {(() => {
                  try {
                    const date = new Date(askData.updatedAt);
                    return isNaN(date.getTime())
                      ? askData.updatedAt
                      : format(date, "dd MMMM yyyy, HH:mm", { locale: uk });
                  } catch {
                    return askData.updatedAt;
                  }
                })()}
              </p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

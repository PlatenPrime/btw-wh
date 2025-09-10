import { Separator } from "@/components/ui";
import { Badge } from "@/components/ui/badge";
import { Card, CardTitle, CardHeader, CardContent } from "@/components/ui/card";
import { ArtDialogImage } from "@/modules/arts/components/dialogs/art-dialog-image/ArtDialogImage";
import type { AskDto } from "@/modules/asks/api/types/dto";
import { format } from "date-fns";
import { uk } from "date-fns/locale";


const statusConfig = {
    new: { variant: "default" as const, text: "Новий" },
    in_progress: { variant: "secondary" as const, text: "В роботі" },
    completed: { variant: "outline" as const, text: "Завершено" },
    cancelled: { variant: "destructive" as const, text: "Скасовано" },
  };

  interface AskDetailsProps {
    askData: AskDto;
  }

export function AskDetails({ askData }: AskDetailsProps) {
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
          </div>

          {askData.com && (
            <div className="space-y-2">
              <h4 className="text-muted-foreground text-sm font-medium">
                Коментар
              </h4>
              <p className="bg-muted rounded-md p-3 text-sm">{askData.com}</p>
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
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

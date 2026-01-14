import { CalendarDate } from "@/components/shared/date/CalendarDate";
import { UserAvatarName } from "@/components/shared/user/UserAvatarName";
import { Card } from "@/components/ui/card";
import { Link } from "react-router";
import type { AskDto } from "@/modules/asks/api/types/dto";
import { AskStatusBage } from "@/modules/asks/components/elements/ask-status-bage/AskStatusBage";
import { AskCom } from "@/modules/asks/components/elements/ask-com/AskCom";
import { AskQuant } from "@/modules/asks/components/elements/ask-quant/AskQuant";
import { AskSklad } from "@/modules/asks/components/elements/ask-sklad/AskSklad";

interface AsksByArtikulCardViewProps {
  ask: AskDto;
}

export function AsksByArtikulCardView({ ask }: AsksByArtikulCardViewProps) {
  return (
    <Link to={`/refiling/asks/${ask._id}`} className="block">
      <Card className="grid gap-2 p-2 transition-colors hover:bg-accent">
        <div className="flex items-start justify-between gap-2">
          <div className="grid flex-1 gap-2">
            {/* Ключевые элементы: дата и имя asker */}
            <div className="grid gap-2">
              <CalendarDate date={ask.createdAt} />
              {ask.askerData && (
                <UserAvatarName
                  photoUrl={ask.askerData.photo}
                  fullname={ask.askerData.fullname}
                  className="text-sm"
                  size="xs"
                />
              )}
            </div>

            {/* Дополнительная информация */}
            <div className="grid gap-1">
              <AskQuant quant={ask.quant} />
              <AskCom com={ask.com} />
              <AskSklad sklad={ask.sklad} />
            </div>
          </div>

          {/* Статус заявки */}
          <div className="flex-shrink-0">
            <AskStatusBage statusText={ask.status} />
          </div>
        </div>
      </Card>
    </Link>
  );
}

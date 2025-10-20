import ArtikulImageLink from "@/components/shared/artikul-image-link/ArtikulImageLink";
import { CalendarDate } from "@/components/shared/date/CalendarDate";
import { UserAvatarName } from "@/components/shared/user/UserAvatarName";
import { Card } from "@/components/ui/card";
import type { AskDto, AskStatus } from "@/modules/asks/api/types/dto";
import { AskStatusBage } from "@/modules/asks/components/elements/ask-status-bage/AskStatusBage";
import { AskCom } from "../../elements/ask-com/AskCom";
import { AskQuant } from "../../elements/ask-quant/AskQuant";

interface AsksListCardViewProps {
  ask: AskDto;
  statusText: AskStatus;
}

export function AsksListCardView({
  ask,

  statusText,
}: AsksListCardViewProps) {
  return (
    <Card className="grid gap-2 p-2">
      <ArtikulImageLink
          artikul={ask.artikul}
          nameukr={ask.nameukr}
          target="_self"
          link={ask._id}
        />
      <div className="grid gap-2 pl-12">
        
        <AskQuant quant={ask.quant || 0} />
        <AskCom com={ask.com || ""} />
        <UserAvatarName
          photoUrl={ask.askerData?.photo}
          fullname={ask.askerData?.fullname}
          className="text-sm"
          size="xs"
        />
        <CalendarDate date={ask.createdAt} />
        <AskStatusBage statusText={statusText} />
      </div>
      
    </Card>
  );
}

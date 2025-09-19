import { CalendarDate } from "@/components/shared/date/CalendarDate";
import { UserAvatarName } from "@/components/shared/user/UserAvatarName";
import { Card } from "@/components/ui/card";
import type { AskDto } from "@/modules/asks/api/types/dto";
import { AskImageStatus } from "@/modules/asks/components/elements/ask-image-status/AskImageStatus";
import { Link } from "react-router";
import { ArtNameukr } from "../../../../arts/components/elements/art-nameukr/ArtNameukr";
import { AskCom } from "../../elements/ask-com/AskCom";
import { AskQuant } from "../../elements/ask-quant/AskQuant";

interface AsksListCardViewProps {
  ask: AskDto;
  statusText: string;
}

export function AsksListCardView({
  ask,

  statusText,
}: AsksListCardViewProps) {
  return (
    <Card className="flex flex-row items-start gap-4 p-2">
      <AskImageStatus statusText={statusText} artikul={ask.artikul} />

      <div className="grid gap-2">
        <Link
          to={`${ask._id}`}
          className="text-foreground text-sm hover:underline"
        >
          <ArtNameukr nameukr={ask.nameukr || ask.artikul} />
        </Link>
        <AskQuant quant={ask.quant || 0} />
        <AskCom com={ask.com || ""} />
        <UserAvatarName
          photoUrl={ask.askerData?.photo}
          fullname={ask.askerData?.fullname}
          className="text-sm"
          size="xs"
        />
        <CalendarDate date={ask.createdAt} />
      </div>
    </Card>
  );
}

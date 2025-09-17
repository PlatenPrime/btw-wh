import { CalendarDate } from "@/components/shared/date/CalendarDate";
import { UserAvatarName } from "@/components/shared/user/UserAvatarName";
import { Card, CardContent } from "@/components/ui/card";
import type { AskDto } from "@/modules/asks/api/types/dto";
import { AskCom } from "@/modules/asks/components/elements/ask-com/AskCom";
import { AskImageStatus } from "@/modules/asks/components/elements/ask-image-status/AskImageStatus";
import { AskNameukr } from "@/modules/asks/components/elements/ask-nameukr/AskNameukr";
import { AskQuant } from "@/modules/asks/components/elements/ask-quant/AskQuant";

interface AskDetailsCardProps {
  askData: AskDto;
}

export function AskDetailsCard({ askData }: AskDetailsCardProps) {
  return (
    <Card className="p-0 w-full">
      <CardContent className="flex flex-row items-start gap-2 p-2">
        <AskImageStatus statusText={askData.status} artikul={askData.artikul} />

        <div className="grid gap-2">
          <AskNameukr nameukr={askData.nameukr || askData.artikul} />
          <AskQuant quant={askData.quant} />
          <AskCom com={askData.com} />
          <UserAvatarName
            photoUrl={askData.askerData?.photo}
            fullname={askData.askerData?.fullname}
            className="text-sm"
            size="xs"
          />
          <CalendarDate date={askData.createdAt} />
        </div>
      </CardContent>
    </Card>
  );
}

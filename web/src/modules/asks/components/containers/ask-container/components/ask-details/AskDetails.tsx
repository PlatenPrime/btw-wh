import { CalendarDate } from "@/components/date/CalendarDate";
import { Card, CardHeader } from "@/components/ui/card";
import { UserAvatarName } from "@/components/user/UserAvatarName";
import { statusConfig } from "@/modules/arts/constants/status";
import type { AskDto } from "@/modules/asks/api/types/dto";
import { AskCom } from "@/modules/asks/components/elements/ask-com/AskCom";
import { AskImageStatus } from "@/modules/asks/components/elements/ask-image-status/AskImageStatus";
import { AskNameukr } from "@/modules/asks/components/elements/ask-nameukr/AskNameukr";
import { AskQuant } from "@/modules/asks/components/elements/ask-quant/AskQuant";

interface AskDetailsProps {
  askData: AskDto;
}

export function AskDetails({ askData }: AskDetailsProps) {
  const statusInfo = statusConfig[askData.status];

  return (
    <Card className="w-full p-0">
      <CardHeader className="flex flex-row items-start gap-2 p-2">
        <AskImageStatus
          statusVariant={statusInfo?.variant}
          statusText={statusInfo?.text}
          artikul={askData.artikul}
        />

        <div className="flex w-full flex-col gap-2">
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
      </CardHeader>
    </Card>
  );
}

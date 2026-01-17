import { ArtikulImageLink } from "@/components/shared/artikul-image-link/ArtikulImageLink";
import { CalendarDate } from "@/components/shared/date/CalendarDate";
import { UserAvatarName } from "@/components/shared/user/UserAvatarName";
import { Card, CardContent } from "@/components/ui/card";
import { BtradeArtDataContainer } from "@/modules/arts/components/containers/btrade-art-data-container/BtradeArtDataContainer";
import { BtradeArtDataSkeleton } from "@/modules/arts/components/containers/btrade-art-data-container/BtradeArtDataSkeleton";
import { BtradeArtDataFetcher } from "@/modules/arts/components/fetchers/btrade-art-data-fetcher/BtradeArtDataFetcher";
import type { AskDto } from "@/modules/asks/api/types/dto";
import { AskCom } from "@/modules/asks/components/elements/ask-com/AskCom";
import { AskQuant } from "@/modules/asks/components/elements/ask-quant/AskQuant";
import { AskSklad } from "@/modules/asks/components/elements/ask-sklad/AskSklad";
import { AskStatusBage } from "@/modules/asks/components/elements/ask-status-bage/AskStatusBage";
import { AskZone } from "@/modules/asks/components/elements/ask-zone/AskZone";

interface AskDetailsCardProps {
  askData: AskDto;
}

export function AskDetailsCard({ askData }: AskDetailsCardProps) {
  return (
    <Card className="w-full p-0">
      <CardContent className="flex flex-row items-start gap-2 p-2">
        <div className="grid gap-2 text-sm">
          <ArtikulImageLink
            artikul={askData.artikul}
            nameukr={askData.nameukr}
            bage={<AskStatusBage statusText={askData.status} />}
            target="_self"
            link="#"
          />
          <AskQuant quant={askData.quant} />
          <AskCom com={askData.com} />
          <AskSklad sklad={askData.sklad} />
          <AskZone zone={askData.zone} />
          <UserAvatarName
            photoUrl={askData.askerData?.photo}
            fullname={askData.askerData?.fullname}
            className=""
            size="xs"
          />
          <CalendarDate date={askData.createdAt} />
          <BtradeArtDataFetcher
            artikul={askData.artikul}
            ContainerComponent={BtradeArtDataContainer}
            SkeletonComponent={BtradeArtDataSkeleton}
          />
        </div>
      </CardContent>
    </Card>
  );
}

import { Card, CardTitle } from "@/components/ui/card";
import { IArt } from "@/modules/arts/types/IArt";
import { MapPin } from "lucide-react";
import ArtImage from "../ArtImage/ArtImage";
import { ZoomArtImageButton } from "../ZoomArtImageButton/ZoomArtImageButton";

interface ArtCardProps {
  art: IArt;
}

export function ArtCard({ art }: ArtCardProps) {
  return (
    <Card className="flex gap-8 p-4">
      <div className=" grid w-[150px] gap-2 ">
        <ArtImage artikul={art.artikul} />
        <ZoomArtImageButton artikul={art.artikul} />
      </div>

      <div className="flex flex-col gap-2">
        <CardTitle className="text-xl ">{art?.nameukr}</CardTitle>

        <p className="flex gap-2">
          <MapPin /> {art?.zone}
        </p>
      </div>
    </Card>
  );
}

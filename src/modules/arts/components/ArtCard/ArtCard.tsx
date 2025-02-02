import { Card, CardContent, CardTitle } from "@/components/ui/card";
import { Art } from "@/modules/arts/types/Art";
import { MapPin } from "lucide-react";
import ArtImage from "../ArtImage/ArtImage";
import { ZoomArtImageButton } from "../ZoomArtImageButton/ZoomArtImageButton";

interface ArtCardProps {
  art: Art;
}

export function ArtCard({ art }: ArtCardProps) {
  return (
    <Card className="flex gap-8 p-4">
      <div className=" grid w-[100px] place-items-center">
        <ArtImage artikul={art.artikul} />
      </div>

      <CardContent>
        <div className="flex flex-col justify-between gap-2">
          <CardTitle className="text-xl ">{art?.nameukr}</CardTitle>
          <p className="flex gap-2">
            <MapPin /> {art?.zone}
          </p>
          <ZoomArtImageButton artikul={art.artikul} />
        </div>
      </CardContent>
    </Card>
  );
}

import { Image } from "@/components/image";
import { getSmallImageUrl } from "../../services/arts";

interface ArtImageProps {
  artikul: string | undefined;
}

export function ArtImage({ artikul }: ArtImageProps) {
  return (
    <div>
      <Image
        src={getSmallImageUrl(artikul)}
        alt={artikul}
        className="w-16 object-fit rounded-md"
      />
    </div>
  );
}

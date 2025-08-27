import { Image } from "@/components/image/image";
import { getSmallImageUrl } from "@/lib/art-image-url";

interface ArtImageProps {
  artikul: string;
}

export function ArtImage({ artikul }: ArtImageProps) {
  const imageUrl = getSmallImageUrl(artikul);
  return (
    <Image
      src={imageUrl}
      alt={artikul}
      className="shadow-muted-foreground aspect-square w-full max-w-[6rem] rounded-lg object-cover shadow-md"
    />
  );
}

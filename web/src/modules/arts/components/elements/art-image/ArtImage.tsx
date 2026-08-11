import { SharikImage } from "@/components/shared/media/sharik-image";

interface ArtImageProps {
  artikul: string;
}

export function ArtImage({ artikul }: ArtImageProps) {
  return (
    <SharikImage
      artikul={artikul}
      size="prev"
      className="shadow-muted-foreground aspect-square w-full max-w-[6rem] rounded-lg object-cover shadow-md"
    />
  );
}

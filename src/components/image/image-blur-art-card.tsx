import { cn } from "@/lib/utils";
import { Image } from "./image";
import { ImageBlurContainer } from "./image-blur-container";

interface ImageBlurArtCardProps {
  artikul: string;
  imageUrl: string;
  alt: string;
  className?: string;

}

export function ImageBlurArtCard({
  artikul,
  imageUrl,
  alt,
  className,

}: ImageBlurArtCardProps) {
  return (
    <ImageBlurContainer
    artikul={artikul}
    >
       
      <Image
        src={imageUrl}
        alt={alt}
        className={cn(
          "aspect-square w-full max-w-[6rem] object-cover rounded-md mt-2",
          className
        )}
      />
    </ImageBlurContainer>
  );
}

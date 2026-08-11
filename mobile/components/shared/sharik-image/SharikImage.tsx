import {
  getBigImageUrl,
  getSmallImageUrl,
  type SharikImageSize,
} from "@/modules/arts/constants/art-image-url";
import { Image, type ImageProps } from "expo-image";

const DEFAULT_BLURHASH = "LGF5]+Yk^6#M@-5c,1J5@[or[Q6.";

export type SharikImageProps = Omit<ImageProps, "source"> & {
  artikul: string;
  size?: SharikImageSize;
};

/**
 * Картинка артикула с нашего media API + memory-disk cache expo-image.
 */
export function SharikImage({
  artikul,
  size = "prev",
  cachePolicy = "memory-disk",
  placeholder = { blurhash: DEFAULT_BLURHASH },
  transition = 200,
  contentFit = "cover",
  ...props
}: SharikImageProps) {
  const uri = size === "big" ? getBigImageUrl(artikul) : getSmallImageUrl(artikul);

  if (!uri) {
    return null;
  }

  return (
    <Image
      source={{ uri }}
      cachePolicy={cachePolicy}
      placeholder={placeholder}
      transition={transition}
      contentFit={contentFit}
      {...props}
    />
  );
}

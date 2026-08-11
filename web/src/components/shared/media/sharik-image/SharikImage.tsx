import type { ComponentProps } from "react";
import { Image } from "@/components/shared/media/image/Image";
import {
  getBigImageUrl,
  getSmallImageUrl,
  type SharikImageSize,
} from "@/constants/art-image-url";

export type SharikImageProps = Omit<
  ComponentProps<typeof Image>,
  "src" | "alt"
> & {
  artikul: string;
  size?: SharikImageSize;
  alt?: string;
};

/**
 * Превью/full картинка артикула с нашего media API (не прямой sharik.ua).
 */
export function SharikImage({
  artikul,
  size = "prev",
  alt,
  ...props
}: SharikImageProps) {
  const src = size === "big" ? getBigImageUrl(artikul) : getSmallImageUrl(artikul);

  if (!src) {
    return null;
  }

  return <Image src={src} alt={alt ?? artikul} {...props} />;
}

import React, { useEffect, useState } from "react";

interface ImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  fallbackSrc?: string;
}

const DEFAULT_FALLBACK =
  "https://placehold.co/400x400?text=Артикул&font=roboto"; // Заглушка, можно заменить

export const Image: React.FC<ImageProps> = ({
  src,
  alt,
  fallbackSrc = DEFAULT_FALLBACK,
  ...props
}) => {
  const [imgSrc, setImgSrc] = useState(src);

  // Синхронизируем imgSrc с src при изменении src
  useEffect(() => {
    setImgSrc(src);
  }, [src]);

  const onError = () => {
    if (imgSrc !== fallbackSrc) {
      setImgSrc(fallbackSrc);
    }
  };

  return (
    <img src={imgSrc} alt={alt} onError={onError} {...props} loading={"lazy"} />
  );
};

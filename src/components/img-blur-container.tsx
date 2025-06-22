import { Image } from "@/components/image";
import { getSmallImageUrl } from "@/lib/art-image-url";
import { cn } from "@/lib/utils";
import { useTheme } from "@/providers/theme-provider";

interface ImageBlurContainerProps extends React.ComponentProps<"div"> {
  artikul: string;
  overlay?: boolean;
  isMoreOverlay?: boolean;
  imgData?: {
    alt: string;
    className?: string;
  };
}

export function ImageBlurContainer({
  className,
  artikul,
  children,
  overlay = true,
  isMoreOverlay = false,
  imgData,
  ...props
}: ImageBlurContainerProps) {
  const { theme } = useTheme();
  const imageUrl = getSmallImageUrl(artikul);

  return (
    <div
      className={cn("relative isolate overflow-hidden ", className)}
      {...props}
    >
      <Image
        src={imageUrl}
        alt={artikul}
        className="absolute inset-0 h-full w-full object-cover blur-xl scale-125"
      />

      {overlay && (
        <div
          className={cn(
            "absolute inset-0 backdrop-blur",
            theme === "dark" ? "bg-black/75" : "bg-white/50"
          )}
        />
      )}

      {isMoreOverlay && (
        <div
          className={cn(
            "absolute inset-0 ",
            theme === "dark" ? "bg-black/25" : "bg-white/50"
          )}
        />
      )}

      <div className="relative z-10 flex flex-col items-center justify-between h-full">
        {imgData && (
          <Image
            src={imageUrl}
            alt={imgData.alt}
            className={cn(
              "aspect-square w-full max-w-[6rem] object-cover rounded-md mt-2",
              imgData.className
            )}
          />
        )}
        {children}
      </div>
    </div>
  );
}

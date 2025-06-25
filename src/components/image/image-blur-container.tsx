import { Image } from "@/components/image/image";
import { getSmallImageUrl } from "@/lib/art-image-url";
import { cn } from "@/lib/utils";
import { useTheme } from "@/providers/theme-provider";

interface ImageBlurContainerProps extends React.ComponentProps<"div"> {
  artikul: string;
  overlay?: boolean;
  isMoreOverlay?: boolean;
}

export function ImageBlurContainer({
  className,
  artikul,
  children,
  overlay = true,
  isMoreOverlay = false,
  ...props
}: ImageBlurContainerProps) {
  const { theme } = useTheme();
  const imageUrl = getSmallImageUrl(artikul);

  return (
    <div
      className={cn("relative isolate overflow-hidden", className)}
      {...props}
    >
      <Image
        src={imageUrl}
        alt={artikul}
        className="absolute inset-0 h-full w-full object-cover blur-xl scale-200"
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
            "absolute inset-0",
            theme === "dark" ? "bg-black/25" : "bg-white/50"
          )}
        />
      )}

      <div className="relative z-10 h-full w-full">
        {children}
      </div>
    </div>
  );
}

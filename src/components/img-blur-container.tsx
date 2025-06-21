import { Image } from "@/components/image";
import { getSmallImageUrl } from "@/lib/art-image-url";
import { cn } from "@/lib/utils";
import { useTheme } from "@/providers/theme-provider";

interface ImageBlurContainerProps extends React.ComponentProps<"div"> {
  artikul: string;
  overlay?: boolean; 
}

export function ImageBlurContainer({
  className,
  artikul,
  children,
  overlay = true,
  ...props
}: ImageBlurContainerProps) {
  const { theme } = useTheme();

  return (
    <div
      className={cn("relative isolate overflow-hidden rounded-xl", className)}
      {...props}
    >
      {/* Размытая фоновая картинка */}
      <Image
        src={getSmallImageUrl(artikul)}
        alt={artikul}
        className="absolute inset-0 h-full w-full object-cover blur-xl scale-125"
      />

      {/* Затемнение (по желанию) */}
      {overlay && (
        <div
          className={cn(
            "absolute inset-0 bg-black/50 backdrop-blur",
            theme === "dark" ? "bg-black/50" : "bg-white/50"
          )}
        />
      )}

      {/* Контент поверх фона */}
      <div className="relative z-10">{children}</div>
    </div>
  );
}

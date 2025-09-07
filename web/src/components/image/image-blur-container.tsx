import { Image } from "@/components/image/image";
import { getSmallImageUrl } from "@/lib/art-image-url";
import { cn } from "@/lib/utils";
import { useTheme } from "@/providers/theme-provider";

interface ImageBlurContainerProps extends React.ComponentProps<"div"> {
  artikul: string;
}

export function ImageBlurContainer({
  className,
  artikul,
  children,
  ...props
}: ImageBlurContainerProps) {
  const { theme } = useTheme();
  const imageUrl = getSmallImageUrl(artikul);

  if (theme === "dark") {
    return (
      <div
        className={cn("relative isolate overflow-hidden", className)}
        {...props}
      >
        {children}
      </div>
    );
  }

  return (
    <div
      className={cn("group relative isolate overflow-hidden", className)}
      {...props}
    >
      {/* Блюр фон — показывается только на hover */}
      <Image
        src={imageUrl}
        alt={artikul}
        className={cn(
          "absolute inset-0 h-full w-full scale-200 object-cover opacity-0 blur-xl transition-opacity duration-300 group-hover:opacity-100",
        )}
      />

      {/* Полупрозрачный слой поверх блюра */}
      <div
        className={cn(
          "absolute inset-0 bg-white/50 opacity-0 backdrop-blur transition-opacity duration-300 group-hover:opacity-100",
        )}
      />

      {/* Контент всегда виден */}
      <div className="relative z-10 h-full w-full">{children}</div>
    </div>
  );
}

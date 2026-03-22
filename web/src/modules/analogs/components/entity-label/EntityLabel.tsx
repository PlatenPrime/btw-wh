import { Image } from "@/components/shared/image/image";
import { cn } from "@/lib/utils";

export interface EntityLabelProps {
  imageUrl?: string | null;
  title?: string | null;
  fallbackLabel: string;
  imageSize?: "sm" | "md";
  className?: string;
}

const imageSizeMap = {
  sm: { size: 32, gap: "gap-1.5" },
  md: { size: 64, gap: "gap-1" },
} as const;

export function EntityLabel({
  imageUrl,
  title,
  fallbackLabel,
  imageSize = "md",
  className,
}: EntityLabelProps) {
  const displayText = title ?? fallbackLabel;
  const { size, gap } = imageSizeMap[imageSize];

  if (imageUrl) {
    return (
      <span className={cn("flex min-w-0 items-center truncate", gap, className)}>
        <Image
          src={imageUrl}
          alt=""
          className="shrink-0 rounded object-cover"
          height={size}
          width={size}
        />
        <span className="truncate">{displayText}</span>
      </span>
    );
  }

  return <span className="truncate">{displayText}</span>;
}

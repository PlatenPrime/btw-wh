import { Image } from "@/components/shared/image/image";

export interface EntityLabelProps {
  imageUrl?: string | null;
  title?: string | null;
  fallbackLabel: string;
  imageSize?: "sm" | "md";
}

const imageSizeMap = {
  sm: { size: 20, gap: "gap-1.5" },
  md: { size: 32, gap: "gap-1" },
} as const;

export function EntityLabel({
  imageUrl,
  title,
  fallbackLabel,
  imageSize = "md",
}: EntityLabelProps) {
  const displayText = title ?? fallbackLabel;
  const { size, gap } = imageSizeMap[imageSize];

  if (imageUrl) {
    return (
      <span className={`flex min-w-0 items-center ${gap} truncate`}>
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

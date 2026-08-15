import { DetailPanelCard } from "@/components/shared/cards";
import {
  URL_DIALOG_IMAGE_FALLBACK,
  UrlDialogImage,
} from "@/components/shared/dialogs";
import {
  MetricChip,
  type IconWellTone,
} from "@/components/shared/elements";
import { Image } from "@/components/shared/media/image/Image";
import { Badge } from "@/components/ui/badge";
import { CardHeader, CardTitle } from "@/components/ui/card";
import { iconSize, typography } from "@/lib/typography";
import { cn } from "@/lib/utils";
import type { GraboSkuDto } from "@/modules/grabo-skus/api/types";
import type { LucideIcon } from "lucide-react";
import { ExternalLink } from "lucide-react";

const GRABO_DETAIL_PLACEHOLDER =
  "https://placehold.co/160x160?text=Grabo&font=roboto";

export interface GraboSkuAttribute {
  key: string;
  label: string;
  value: string;
  icon: LucideIcon;
  tone: IconWellTone;
}

interface GraboSkuDetailCardViewProps {
  sku: GraboSkuDto;
  imageUrls: string[];
  tags: string[];
  attributes: GraboSkuAttribute[];
  lastSeenAtLabel: string | null;
}

export function GraboSkuDetailCardView({
  sku,
  imageUrls,
  tags,
  attributes,
  lastSeenAtLabel,
}: GraboSkuDetailCardViewProps) {
  const primaryImage = imageUrls[0];

  return (
    <DetailPanelCard className="overflow-hidden p-0">
      <CardHeader className="flex flex-col gap-4 p-6 sm:flex-row sm:items-start">
        {primaryImage ? (
          <UrlDialogImage
            imageUrl={primaryImage}
            alt={sku.title}
            fallbackSrc={URL_DIALOG_IMAGE_FALLBACK}
            previewClassName="bg-muted mx-auto size-40 shrink-0 overflow-hidden rounded-lg sm:mx-0"
          />
        ) : (
          <div className="bg-muted mx-auto size-40 shrink-0 overflow-hidden rounded-lg sm:mx-0">
            <Image
              src={GRABO_DETAIL_PLACEHOLDER}
              alt=""
              className="size-full object-cover"
            />
          </div>
        )}
        <div className="grid min-w-0 flex-1 gap-2">
          <CardTitle className={typography.detailTitle}>{sku.title}</CardTitle>
          <span className={typography.detailSubtitle}>{sku.productId}</span>
          <div className="flex flex-wrap gap-1">
            {sku.isNewProduct === true ? (
              <Badge variant="success">Новинка</Badge>
            ) : null}
            {sku.isOnSite === false ? (
              <Badge variant="destructive">Не на сайті</Badge>
            ) : sku.isOnSite === true ? (
              <Badge variant="info">На сайті</Badge>
            ) : null}
          </div>
          {sku.url.trim() ? (
            <a
              href={sku.url}
              target="_blank"
              rel="noopener noreferrer"
              className={cn(
                "text-primary inline-flex items-center gap-1 hover:underline",
                typography.body,
              )}
            >
              <ExternalLink className={iconSize.ui} />
              Відкрити на сайті Grabo
            </a>
          ) : null}
          {lastSeenAtLabel ? (
            <span className={typography.caption}>
              Оновлено: {lastSeenAtLabel}
            </span>
          ) : null}
        </div>
      </CardHeader>

      {imageUrls.length > 1 ? (
        <div className="flex flex-wrap justify-center gap-3 px-6 pb-4 sm:justify-start">
          {imageUrls.slice(1).map((src) => (
            <UrlDialogImage
              key={src}
              imageUrl={src}
              alt={sku.title}
              fallbackSrc={URL_DIALOG_IMAGE_FALLBACK}
              previewClassName="bg-muted size-40 shrink-0 overflow-hidden rounded-lg"
            />
          ))}
        </div>
      ) : null}

      {attributes.length > 0 ? (
        <div className="flex flex-wrap gap-2 px-6 pb-4">
          {attributes.map((attr) => (
            <MetricChip
              key={attr.key}
              icon={attr.icon}
              tone={attr.tone}
              label={attr.label}
              value={attr.value}
            />
          ))}
        </div>
      ) : null}

      {tags.length > 0 ? (
        <div className="flex flex-wrap gap-1 px-6 pb-6">
          {tags.map((tag) => (
            <Badge key={tag} variant="secondary">
              {tag}
            </Badge>
          ))}
        </div>
      ) : null}
    </DetailPanelCard>
  );
}

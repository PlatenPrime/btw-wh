import type { GraboSkuDto } from "@/modules/grabo-skus/api/types";
import {
  GraboSkuDetailCardView,
  type GraboSkuAttribute,
} from "@/modules/grabo-skus/components/cards/grabo-sku-detail-card/GraboSkuDetailCardView";
import { format, isValid, parseISO } from "date-fns";
import { uk } from "date-fns/locale";
import {
  Droplets,
  Languages,
  Layers,
  Palette,
  Ruler,
  Wind,
} from "lucide-react";
import { useMemo } from "react";

const ATTRIBUTE_FIELDS = [
  { key: "color", label: "Колір", icon: Palette, tone: "destructive" },
  { key: "size", label: "Розмір", icon: Ruler, tone: "info" },
  { key: "material", label: "Матеріал", icon: Layers, tone: "primary" },
  { key: "gas", label: "Газ", icon: Wind, tone: "edit" },
  { key: "language", label: "Мова", icon: Languages, tone: "warning" },
  { key: "gasCapacity", label: "Обʼєм газу", icon: Droplets, tone: "success" },
] as const;

function formatLastSeenAt(value: string): string | null {
  if (!value.trim()) return null;
  const parsed = parseISO(value);
  if (!isValid(parsed)) return null;
  return format(parsed, "d MMM yyyy, HH:mm", { locale: uk });
}

interface GraboSkuDetailCardProps {
  sku: GraboSkuDto;
}

export function GraboSkuDetailCard({ sku }: GraboSkuDetailCardProps) {
  const imageUrls = useMemo(
    () => (sku.images ?? []).map((src) => src.trim()).filter(Boolean),
    [sku.images],
  );

  const tags = useMemo(
    () => (sku.tags ?? []).map((tag) => tag.trim()).filter(Boolean),
    [sku.tags],
  );

  const attributes = useMemo(
    (): GraboSkuAttribute[] =>
      ATTRIBUTE_FIELDS.flatMap(({ key, label, icon, tone }) => {
        const value = (sku[key] ?? "").trim();
        return value ? [{ key, label, value, icon, tone }] : [];
      }),
    [sku],
  );

  const lastSeenAtLabel = useMemo(
    () => formatLastSeenAt(sku.lastSeenAt),
    [sku.lastSeenAt],
  );

  return (
    <GraboSkuDetailCardView
      sku={sku}
      imageUrls={imageUrls}
      tags={tags}
      attributes={attributes}
      lastSeenAtLabel={lastSeenAtLabel}
    />
  );
}

import { cn } from "@/lib/utils";

export type DelArtikulCardVariant =
  | "normal"
  | "zeroQuantity"
  | "zeroStock"
  | "noNameUkr";

export interface DelArtikulCardViewChainStep {
  status: string;
  error?: string;
}

const cardBaseClasses =
  "flex flex-col gap-2 p-2 sm:flex-row sm:items-center";

const variantClasses: Record<DelArtikulCardVariant, string> = {
  normal: "",
  zeroQuantity: "border-destructive/40 bg-destructive/10",
  zeroStock: "border-chart-6/40 bg-chart-6/10",
  noNameUkr: "border-warning/40 bg-warning/10",
};

export function getDelArtikulCardClassName(variant: DelArtikulCardVariant) {
  return cn(cardBaseClasses, variantClasses[variant]);
}

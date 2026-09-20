import { SurfaceSection } from "@/components/shared/layout";
import { typography } from "@/lib/typography";
import { cn } from "@/lib/utils";
import type { PackFlipFindingDto } from "@/modules/sku-analytics/api/types";
import { SkuPackFlipsTable } from "@/modules/sku-analytics/components/tables/sku-pack-flips-table";
import type { SkuPackFlipsTableVariant } from "@/modules/sku-analytics/components/tables/sku-pack-flips-table";

export interface SkuPackFlipsSection {
  variant: SkuPackFlipsTableVariant;
  items: PackFlipFindingDto[];
}

export interface SkuPackFlipsContainerViewProps {
  sections: SkuPackFlipsSection[];
}

const SECTION_TITLE: Record<SkuPackFlipsTableVariant, string> = {
  patched: "Кратні стрибки",
  priceOnly: "Стрибнула лише ціна",
  ambiguous: "Дивні стрибки",
};

export function SkuPackFlipsContainerView({
  sections,
}: SkuPackFlipsContainerViewProps) {
  if (sections.length === 0) {
    return (
      <p className={cn(typography.body, "text-muted-foreground")}>
        За ці дні все рівно — скачків немає.
      </p>
    );
  }

  return (
    <div className="grid gap-4">
      {sections.map((section) => (
        <SurfaceSection key={section.variant} className="grid gap-3 p-0">
          <h2
            className={cn(
              typography.sectionTitle,
              "flex items-baseline gap-2 px-3 pt-3",
            )}
          >
            {SECTION_TITLE[section.variant]}
            <span className={typography.caption}>{section.items.length}</span>
          </h2>
          <SkuPackFlipsTable variant={section.variant} items={section.items} />
        </SurfaceSection>
      ))}
    </div>
  );
}

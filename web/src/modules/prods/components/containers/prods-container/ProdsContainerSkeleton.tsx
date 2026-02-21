import { ProdsGridSkeleton } from "@/modules/prods/components/lists/prods-grid";

export function ProdsContainerSkeleton() {
  return (
    <div className="grid gap-2">
      <ProdsGridSkeleton />
    </div>
  );
}

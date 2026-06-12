import { BtradeSliceTableContainerView } from "@/modules/btrade-slices/components/containers/btrade-slice-table-container/BtradeSliceTableContainerView";
import type { BtradeSliceRowDto } from "@/modules/btrade-slices/api/types";

interface BtradeSliceTableContainerProps {
  items: BtradeSliceRowDto[];
}

export function BtradeSliceTableContainer({
  items,
}: BtradeSliceTableContainerProps) {
  return <BtradeSliceTableContainerView items={items} />;
}

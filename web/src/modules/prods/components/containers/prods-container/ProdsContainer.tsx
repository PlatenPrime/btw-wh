import type { ProdsListResponse } from "@/modules/prods/api/types";
import { ProdsContainerView } from "@/modules/prods/components/containers/prods-container/ProdsContainerView";

interface ProdsContainerProps {
  data: ProdsListResponse;
}

export function ProdsContainer({ data }: ProdsContainerProps) {
  return <ProdsContainerView data={data} />;
}

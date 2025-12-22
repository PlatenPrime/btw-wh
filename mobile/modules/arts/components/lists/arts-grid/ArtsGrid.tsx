import type { ArtDto } from "@/modules/arts/api/types/dto";
import { ArtsGridView } from "./ArtsGridView";

interface GridProps {
  arts: ArtDto[] | undefined;
  onEndReached?: () => void;
  onEndReachedThreshold?: number;
  refreshing?: boolean;
  onRefresh?: () => void;
}

export function ArtsGrid({
  arts,
  onEndReached,
  onEndReachedThreshold,
  refreshing,
  onRefresh,
}: GridProps) {
  return (
    <ArtsGridView
      arts={arts}
      onEndReached={onEndReached}
      onEndReachedThreshold={onEndReachedThreshold}
      refreshing={refreshing}
      onRefresh={onRefresh}
    />
  );
}

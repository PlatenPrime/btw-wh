import type { ArtDto } from "@/modules/arts/api/types/dto";
import { ArtsGridView } from "./ArtsGridView";

interface GridProps {
  arts: ArtDto[] | undefined;
  onEndReached?: () => void;
  onEndReachedThreshold?: number;
}

export function ArtsGrid({ arts, onEndReached, onEndReachedThreshold }: GridProps) {
  return (
    <ArtsGridView
      arts={arts}
      onEndReached={onEndReached}
      onEndReachedThreshold={onEndReachedThreshold}
    />
  );
}

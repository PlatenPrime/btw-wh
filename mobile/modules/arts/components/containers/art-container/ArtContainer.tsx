import { useState } from "react";
import type { ArtDto } from "@/modules/arts/api/types/dto";
import { ArtContainerView } from "./ArtContainerView";
import { ArtHeaderActions } from "@/modules/arts/components/actions/art-header-actions";

interface ArtContainerProps {
  artData: ArtDto;
  refreshing?: boolean;
  onRefresh?: () => void;
}

export function ArtContainer({
  artData,
  refreshing,
  onRefresh,
}: ArtContainerProps) {
  return (
    <>
      <ArtHeaderActions artData={artData} />
      <ArtContainerView artData={artData} refreshing={refreshing} onRefresh={onRefresh} />
    </>
  );
}

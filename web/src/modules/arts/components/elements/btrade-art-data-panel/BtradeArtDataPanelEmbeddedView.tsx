import type { ReactNode } from "react";

interface BtradeArtDataPanelEmbeddedViewProps {
  children: ReactNode;
}

export function BtradeArtDataPanelEmbeddedView({
  children,
}: BtradeArtDataPanelEmbeddedViewProps) {
  return <div className="flex flex-wrap gap-2">{children}</div>;
}

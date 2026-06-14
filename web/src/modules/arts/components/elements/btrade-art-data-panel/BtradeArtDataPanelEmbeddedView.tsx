import type { ReactNode } from "react";

interface BtradeArtDataPanelEmbeddedViewProps {
  children: ReactNode;
}

export function BtradeArtDataPanelEmbeddedView({
  children,
}: BtradeArtDataPanelEmbeddedViewProps) {
  return <div className="grid gap-3">{children}</div>;
}

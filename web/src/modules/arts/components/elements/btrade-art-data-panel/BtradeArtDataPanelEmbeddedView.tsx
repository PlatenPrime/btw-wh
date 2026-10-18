import type { ReactNode } from "react";

interface BtradeArtDataPanelEmbeddedViewProps {
  children: ReactNode;
}

export function BtradeArtDataPanelEmbeddedView({
  children,
}: BtradeArtDataPanelEmbeddedViewProps) {
  return <div className="grid gap-2">{children}</div>;
}

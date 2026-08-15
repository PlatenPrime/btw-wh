import type { ReactNode } from "react";

interface BtradeArtDataPanelViewProps {
  children: ReactNode;
}

export function BtradeArtDataPanelView({ children }: BtradeArtDataPanelViewProps) {
  return (
    <div className="bg-muted/30 grid gap-2.5 rounded-lg p-3">
      <span className="text-muted-foreground text-sm font-semibold tracking-wider uppercase">
        Sharik.ua
      </span>
      <div className="flex flex-wrap gap-2">{children}</div>
    </div>
  );
}

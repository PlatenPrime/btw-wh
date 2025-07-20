import type { IPallet } from "../../types";

interface PalletCardProps {
  pallet: IPallet;
  onClick?: () => void;
}

export function PalletCard({ pallet, onClick }: PalletCardProps) {
  return (
    <div
      className="bg-card cursor-pointer rounded-lg border p-4 shadow-sm transition hover:shadow-md"
      onClick={onClick}
      tabIndex={0}
      role="button"
      aria-label={`Паллета ${pallet.title}`}
    >
      <div className="mb-2 flex items-center justify-between">
        <h3 className="truncate text-lg font-semibold">{pallet.title}</h3>
        {pallet.sector && (
          <span className="text-muted-foreground bg-muted rounded px-2 py-0.5 text-xs">
            {pallet.sector}
          </span>
        )}
      </div>
      <div className="text-muted-foreground mb-1 text-sm">
        Позиций: <span className="font-medium">{pallet.poses.length}</span>
      </div>
      <div className="text-muted-foreground text-xs">
        Создано:{" "}
        {pallet.createdAt
          ? new Date(pallet.createdAt).toLocaleDateString()
          : "—"}
      </div>
    </div>
  );
}

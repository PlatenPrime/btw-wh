import { ArtDialogImage } from "@/modules/arts/components/dialogs/art-dialog-image/ArtDialogImage";
import type { AskDto } from "@/modules/asks/api/types/dto";
import { AskStatusBage } from "@/modules/asks/components/elements/ask-status-bage/AskStatusBage";
import { Link } from "react-router-dom";

interface AskDetailsProductHeaderProps {
  artikul: string;
  nameukr?: string;
  status: AskDto["status"];
}

export function AskDetailsProductHeader({
  artikul,
  nameukr,
  status,
}: AskDetailsProductHeaderProps) {
  const productName = nameukr ? nameukr.slice(10) : artikul;

  return (
    <div className="flex items-start justify-between gap-3 p-4">
      <div className="flex min-w-0 flex-1 items-start gap-3">
        <div className="border-border/60 bg-muted ring-border/40 flex size-14 shrink-0 items-center justify-center overflow-hidden rounded-lg border ring-1 [&_img]:size-12">
          <ArtDialogImage artikul={artikul} />
        </div>
        <div className="grid min-w-0 flex-1 gap-1">
          <Link
            to={`/arts/${artikul}`}
            className="text-sm font-semibold tracking-tight hover:underline"
          >
            {artikul}
          </Link>
          <p className="text-muted-foreground line-clamp-2 text-sm leading-snug">
            {productName}
          </p>
        </div>
      </div>
      <AskStatusBage statusText={status} />
    </div>
  );
}

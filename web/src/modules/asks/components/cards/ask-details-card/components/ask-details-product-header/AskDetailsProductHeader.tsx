import { CardTitle } from "@/components/ui/card";
import { typography } from "@/lib/typography";
import type { AskDto } from "@/modules/asks/api/types/dto";
import { ArtDialogImage } from "@/modules/arts/components/dialogs/art-dialog-image/ArtDialogImage";
import { AskStatusBage } from "@/modules/asks/components/elements/ask-status-bage/AskStatusBage";
import { Link } from "react-router";

interface AskDetailsProductHeaderProps {
  artikul: string;
  nameukr?: string;
  status: AskDto["status"];
}

function getAskDisplayName(artikul: string, nameukr?: string): string | null {
  const trimmed = nameukr?.trim();
  if (!trimmed) return null;

  if (trimmed.startsWith(artikul)) {
    const rest = trimmed.slice(artikul.length).trim();
    return rest.length > 0 ? rest : null;
  }

  return trimmed;
}

export function AskDetailsProductHeader({
  artikul,
  nameukr,
  status,
}: AskDetailsProductHeaderProps) {
  const displayName = getAskDisplayName(artikul, nameukr);

  return (
    <div className="flex min-w-0 items-start justify-between gap-3">
      <div className="flex min-w-0 flex-1 items-start gap-4">
        <ArtDialogImage
          artikul={artikul}
          imageClassName="size-16 shrink-0 rounded-lg border border-border sm:size-20"
        />
        <div className="grid min-w-0 flex-1 gap-2">
          <Link to={`/arts/${artikul}`} className="hover:underline">
            <CardTitle className={typography.detailTitle}>{artikul}</CardTitle>
          </Link>
          {displayName ? (
            <p className={typography.detailSubtitle}>{displayName}</p>
          ) : null}
        </div>
      </div>
      <div className="shrink-0">
        <AskStatusBage statusText={status} />
      </div>
    </div>
  );
}

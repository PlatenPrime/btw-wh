import { cn } from "@/lib/utils";
import type { ArtDto } from "@/modules/arts/api/types/dto";
import { ArtDialogImage } from "@/modules/arts/components/dialogs/art-dialog-image/ArtDialogImage";
import { Link } from "react-router-dom";

interface ArtikulImageLinkProps {
  artikul: ArtDto["artikul"];
  nameukr: ArtDto["nameukr"];
  link?: string;
  className?: string;
}

export default function ArtikulImageLink({
  artikul,
  nameukr,
  link,
  className,
}: ArtikulImageLinkProps) {
  return (
    <div className={cn("flex min-h-0 flex-1 items-start gap-3", className)}>
      <ArtDialogImage artikul={artikul} />
      <Link
        to={link || `/arts/${artikul}`}
        target="_blank"
        className="grid w-full hover:underline"
      >
        <span className="text-sm font-semibold">{artikul}</span>
        <span className={cn("text-xs font-normal")}>
          {nameukr.slice(10) || artikul}
        </span>
      </Link>
    </div>
  );
}

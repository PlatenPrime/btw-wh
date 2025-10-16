import { cn } from "@/lib/utils";
import type { ArtDto } from "@/modules/arts/api/types/dto";
import { ArtDialogImage } from "@/modules/arts/components/dialogs/art-dialog-image/ArtDialogImage";
import { Link } from "react-router-dom";

interface ArtikulImageLinkProps {
  artikul: ArtDto["artikul"];
  nameukr?: ArtDto["nameukr"];
  link?: string;
  className?: string;
  target?: "_blank" | "_self" | "_parent" | "_top";
}

export default function ArtikulImageLink({
  artikul,
  nameukr,
  link,
  className,
  target,
}: ArtikulImageLinkProps) {
  return (
    <div className={cn("flex min-h-0 flex-1 items-start gap-3", className)}>
      <ArtDialogImage artikul={artikul} />
      <Link
        to={link || `/arts/${artikul}`}
        target={target ||"_blank"}
        className="flex flex-col justify-between h-full w-full hover:underline"
      >
        <span className="text-sm font-semibold">{artikul}</span>
        <span className={cn("text-xs font-normal text-muted-foreground")}>
          {nameukr ? nameukr.slice(10) : artikul}
        </span>
      </Link>
    </div>
  );
}

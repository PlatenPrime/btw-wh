import { cn } from "@/lib/utils";
import type { ArtDto } from "@/modules/arts/api/types/dto";
import { ArtDialogImage } from "@/modules/arts/components/dialogs/art-dialog-image/ArtDialogImage";
import { Link } from "react-router-dom";

interface ArtikulImageLinkProps {
  artikul: ArtDto["artikul"];
  nameukr?: ArtDto["nameukr"];
  link?: string;
  bage?: React.ReactNode;
  className?: string;
  target?: "_blank" | "_self" | "_parent" | "_top";
}

export  function ArtikulImageLink({
  artikul,
  nameukr,
  bage,
  link,
  className,
  target,
}: ArtikulImageLinkProps) {
  return (
    <div className={cn("flex min-h-0 flex-1 items-start gap-3", className)}>
      <ArtDialogImage artikul={artikul} />
      <Link
        to={link || `/arts/${artikul}`}
        target={target || "_blank"}
        className="flex h-full w-full flex-col justify-between hover:underline"
      >
        <div className="flex items-center gap-2" >
          <span className="text-sm font-semibold">{artikul}</span>
          {bage && bage}
        </div>

        <span className={cn("text-muted-foreground text-sm font-normal")}>
          {nameukr ? nameukr.slice(10) : artikul}
        </span>
      </Link>
    </div>
  );
}

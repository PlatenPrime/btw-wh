import type { ZoneDto } from "@/modules/zones/api/types";
import { Link } from "react-router";

interface ZoneLinkProps {
  zone: ZoneDto;
  className?: string;
  children?: React.ReactNode;
}

export function ZoneLink({ zone, className, children }: ZoneLinkProps) {
  return (
    <Link
      to={`/wh/zones/${zone._id}`}
      className={className}
    >
      {children || zone.title}
    </Link>
  );
}



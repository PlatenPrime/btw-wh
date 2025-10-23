import { Badge } from "@/components/ui/badge";
import type { ZoneDto } from "@/modules/zones/api/types";

interface ZoneBarcodeProps {
  zone: ZoneDto;
  variant?: "default" | "secondary" | "outline";
  className?: string;
}

export function ZoneBarcode({ zone, variant = "secondary", className }: ZoneBarcodeProps) {
  return (
    <Badge variant={variant} className={className}>
      {zone.bar}
    </Badge>
  );
}


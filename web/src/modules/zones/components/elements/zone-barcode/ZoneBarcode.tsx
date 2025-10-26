import type { ZoneDto } from "@/modules/zones/api/types";

interface ZoneBarcodeProps {
  zone: ZoneDto;

  className?: string;
}

export function ZoneBarcode({ zone, className }: ZoneBarcodeProps) {
  return <span className={className}>{zone.bar}</span>;
}


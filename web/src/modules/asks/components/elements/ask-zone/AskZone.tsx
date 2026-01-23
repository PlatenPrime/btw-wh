import { MapPin } from "lucide-react";

interface AskZoneProps {
  zone?: string;
}

export function AskZone({ zone }: AskZoneProps) {
  if (!zone) {
    return null;
  }

  return (
    <p className="text-foreground flex items-center gap-2 text-sm text-nowrap">
      <MapPin className="h-4 w-4 text-orange-500" />
      <span>{zone}</span>
    </p>
  );
}

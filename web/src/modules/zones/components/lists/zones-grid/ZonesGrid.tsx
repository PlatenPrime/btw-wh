import { Container } from "@/components/shared/containers/Container";
import type { ZoneDto } from "@/modules/zones/api/types";
import { ZonesGridCard } from "@/modules/zones/components/cards/zones-grid-card";

interface ZonesGridProps {
  zones: ZoneDto[];
  onEdit?: (zone: ZoneDto) => void;
  onDelete?: (zone: ZoneDto) => void;
}

export function ZonesGrid({ zones, onEdit, onDelete }: ZonesGridProps) {
  return (
    <Container className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-2 p-2">
      {zones.map((zone) => (
        <ZonesGridCard
          key={zone._id}
          zone={zone}
          onEdit={onEdit}
          onDelete={onDelete}
        />
      ))}
    </Container>
  );
}



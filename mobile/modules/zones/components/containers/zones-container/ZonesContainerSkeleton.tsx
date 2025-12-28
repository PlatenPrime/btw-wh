import { Box } from "@/components/ui";
import { ZoneCardSkeleton } from "@/modules/zones/components/cards/zone-card/ZoneCardSkeleton";

export function ZonesContainerSkeleton() {
  return (
    <Box className="flex-1 p-2">
      {Array.from({ length: 10 }, (_, index) => index).map((index) => (
        <Box key={index} className="mb-2">
          <ZoneCardSkeleton />
        </Box>
      ))}
    </Box>
  );
}


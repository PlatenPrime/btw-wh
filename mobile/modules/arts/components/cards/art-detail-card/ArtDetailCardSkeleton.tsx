import { Box } from "@/components/ui";
import { BtradeArtDataSkeleton } from "@/modules/arts/components/containers/btrade-art-data-container/BtradeArtDataSkeleton";

export function ArtDetailCardSkeleton() {
  return (
    <Box className="p-3 rounded-lg border border-outline-200 bg-background-0">
      <Box className="gap-3">
        {/* Скелетон для изображения и названия */}
        <Box className="flex-row items-start gap-3">
          <Box className="rounded-lg bg-secondary-300" style={{ height: 60, width: 60 }} />
          <Box className="flex-1 gap-2">
            <Box className="rounded bg-secondary-300" style={{ height: 16, width: 128 }} />
            <Box className="rounded bg-secondary-300" style={{ height: 12, width: 192 }} />
          </Box>
        </Box>

        {/* Скелетон для зоны, лимита и данных Btrade */}
        <Box className="gap-2">
          <Box className="flex-row items-center gap-2">
            <Box className="rounded bg-secondary-300" style={{ height: 16, width: 16 }} />
            <Box className="rounded bg-secondary-300" style={{ height: 12, width: 48 }} />
          </Box>
          <Box className="flex-row items-center gap-2">
            <Box className="rounded bg-secondary-300" style={{ height: 16, width: 16 }} />
            <Box className="rounded bg-secondary-300" style={{ height: 12, width: 48 }} />
          </Box>
          <BtradeArtDataSkeleton />
        </Box>
      </Box>
    </Box>
  );
}


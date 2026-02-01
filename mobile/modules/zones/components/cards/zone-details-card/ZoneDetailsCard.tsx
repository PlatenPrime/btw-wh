import { GlassCard } from "@/components/shared/glass-card";
import { ThemedBox, ThemedText } from "@/components/themed";
import type { ZoneDto } from "@/modules/zones/api/types/dto";

interface ZoneDetailsCardProps {
  zone: ZoneDto;
}

export function ZoneDetailsCard({ zone }: ZoneDetailsCardProps) {
  return (
    <GlassCard className="p-4">
      <ThemedBox className="gap-2">
        <ThemedBox className="gap-1">
          <ThemedText type="default" className="text-sm text-typography-900">
            Штрих-код: {zone.bar}
          </ThemedText>
          <ThemedText type="default" className="text-sm text-typography-900">
            Сектор: {zone.sector}
          </ThemedText>
        </ThemedBox>
      </ThemedBox>
    </GlassCard>
  );
}


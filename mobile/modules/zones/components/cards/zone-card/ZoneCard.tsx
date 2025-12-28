import type { ZoneDto } from "@/modules/zones/api/types/dto";
import { ZoneCardMenu } from "@/modules/zones/components/menus/zone-card-menu/ZoneCardMenu";
import { useRouter } from "expo-router";
import { ZoneCardView } from "./ZoneCardView";

interface ZoneCardProps {
  zone: ZoneDto;
}

export function ZoneCard({ zone }: ZoneCardProps) {
  const router = useRouter();

  const handlePress = () => {
    router.push(`/(tabs)/warehouse/zones/${zone._id}` as any);
  };

  return (
    <ZoneCardView
      title={zone.title}
      bar={zone.bar}
      sector={zone.sector}
      onPress={handlePress}
      menu={<ZoneCardMenu zone={zone} />}
    />
  );
}

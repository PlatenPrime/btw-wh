import type { ArtDto } from "@/modules/arts/api/types/dto";
import { ArtsGridCardView } from "./ArtsGridCardView";
import { useRouter } from "expo-router";

interface GridCardProps {
  art: ArtDto;
}

export function ArtsGridCard({ art }: GridCardProps) {
  const router = useRouter();
  const nameukr =
    art.nameukr.length > 50 ? art.nameukr.slice(10, 47) + "..." : art.nameukr.slice(10);

  const handlePress = () => {
    router.push(`/(tabs)/arts/${art.artikul}` as any);
  };

  return (
    <ArtsGridCardView
      artikul={art.artikul}
      nameukr={nameukr}
      onPress={handlePress}
    />
  );
}

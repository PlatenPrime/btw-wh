import type { RowDto } from "@/modules/rows/api/types/dto";
import { useRouter } from "expo-router";
import { RowCardView } from "./RowCardView";

interface RowCardProps {
  row: RowDto;
}

export function RowCard({ row }: RowCardProps) {
  const router = useRouter();

  const handlePress = () => {
    router.push(`/(tabs)/warehouse/rows/${row._id}` as any);
  };

  return (
    <RowCardView
      title={row.title}
      palletsCount={row.pallets.length}
      onPress={handlePress}
    />
  );
}

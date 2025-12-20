import { useColorScheme } from "@/hooks/use-color-scheme";
import { useRouter } from "expo-router";
import type { RowDto } from "@/modules/rows/api/types/dto";
import { RowCardView } from "./RowCardView";

interface RowCardProps {
  row: RowDto;
}

export function RowCard({ row }: RowCardProps) {
  const router = useRouter();
  const colorScheme = useColorScheme() ?? "light";
  const bgColor = colorScheme === "light" ? "#fff" : "#1f2937";
  const borderColor = colorScheme === "light" ? "#d1d5db" : "#4b5563";

  const handlePress = () => {
    router.push(`/(tabs)/warehouse/rows/${row._id}` as any);
  };

  return (
    <RowCardView
      title={row.title}
      palletsCount={row.pallets.length}
      onPress={handlePress}
      bgColor={bgColor}
      borderColor={borderColor}
    />
  );
}


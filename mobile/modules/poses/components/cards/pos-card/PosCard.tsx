import { useColorScheme } from "@/hooks/use-color-scheme";
import type { IPos } from "@/modules/poses/api/types";
import { PosCardView } from "./PosCardView";

interface PosCardProps {
  pos: IPos;
}

const sklads: Record<string, string> = {
  pogrebi: "Погреби",
  merezhi: "Мережі",
};

export function PosCard({ pos }: PosCardProps) {
  const colorScheme = useColorScheme() ?? "light";
  const bgColor = colorScheme === "light" ? "#fff" : "#1f2937";
  const borderColor = colorScheme === "light" ? "#d1d5db" : "#4b5563";
  const skladName = sklads[pos.sklad] || pos.sklad;

  return (
    <PosCardView
      pos={pos}
      bgColor={bgColor}
      borderColor={borderColor}
      skladName={skladName}
    />
  );
}


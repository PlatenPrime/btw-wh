interface AskEventsPullInfoProps {
  totalQuant: number;

  totalBoxes?: number;
}

export function AskEventsPullInfo({
  totalQuant,
  totalBoxes,
}: AskEventsPullInfoProps) {
  return (
    <div className="flex items-center gap-2">
      <h3 className="text-sm font-semibold">
        Знято: {totalQuant} шт. / {totalBoxes} кор.
      </h3>
    </div>
  );
}

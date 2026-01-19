interface AskEventsPullInfoProps {
  totalQuant: number;

  totalBoxes?: number;
}

export function AskEventsPullInfo({
  totalQuant,
  totalBoxes,
}: AskEventsPullInfoProps) {
  return (
    <div className="flex items-center justify-center gap-2">
      <h3 className="text-base font-semibold text-center">
        Знято: {totalQuant} шт. / {totalBoxes} кор.
      </h3>
    </div>
  );
}

import { Wrapper } from "@/components/shared/wrappers/Wrapper";
import { Button } from "@/components/ui/button";
import { Calculator, CheckCircle2 } from "lucide-react";

interface DefControlsViewProps {
  handleCalculate: () => void;
  isPending: boolean;
  isRecentlyStarted: boolean; // true когда расчет выполняется (isRunning === true)
}

export function DefControlsView({
  handleCalculate,
  isPending,
  isRecentlyStarted,
}: DefControlsViewProps) {
  return (
    <Wrapper className="flex items-center justify-center gap-2">
      <Button
        onClick={handleCalculate}
        disabled={isPending || isRecentlyStarted}
        className="w-full sm:w-auto"
        variant={isRecentlyStarted ? "default" : "outline"}
      >
        {isRecentlyStarted ? (
          <>
            <CheckCircle2 className="h-4 w-4 text-green-600" />
            Запущено
          </>
        ) : (
          <>
            <Calculator className="h-4 w-4" />
            Розрахувати дефіцити
          </>
        )}
      </Button>
    </Wrapper>
  );
}

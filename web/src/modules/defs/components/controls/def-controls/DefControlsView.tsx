import { Container } from "@/components/shared/container";
import { Button } from "@/components/ui/button";
import { Calculator, CheckCircle2 } from "lucide-react";

interface DefControlsViewProps {
  handleCalculate: () => void;
  isPending: boolean;
  isRecentlyStarted: boolean;
}

export function DefControlsView({
  handleCalculate,
  isPending,
  isRecentlyStarted,
}: DefControlsViewProps) {
  return (
    <Container className="flex justify-center">
      <div className="flex flex-col gap-4">
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
        {isPending && (
          <p className="text-muted-foreground text-sm">Запускаємо розрахунок</p>
        )}
        {isRecentlyStarted && !isPending && (
          <p className="text-muted-foreground text-sm">
            Розрахунок виконується
          </p>
        )}
      </div>
    </Container>
  );
}

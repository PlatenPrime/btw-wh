import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useCalculateDefsMutation } from "@/modules/defs/api/hooks/mutations/useCalculateDefsMutation";
import { Calculator, CheckCircle2 } from "lucide-react";
import { useEffect, useState } from "react";

export function DefControlsView() {
  const calculateMutation = useCalculateDefsMutation();
  const [lastSuccessTime, setLastSuccessTime] = useState<number>(0);

  const handleCalculate = () => {
    calculateMutation.mutate();
  };

  useEffect(() => {
    if (calculateMutation.isSuccess) {
      setLastSuccessTime(Date.now());
    }
  }, [calculateMutation.isSuccess]);

  const isRecentlyStarted =
    calculateMutation.isSuccess && Date.now() - lastSuccessTime < 10000; // 10 секунд

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Calculator className="h-5 w-5" />
          Управление дефицитами
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col gap-4">
          <p className="text-muted-foreground text-sm">
            Запустите расчет дефицитов для обновления данных о товарах,
            требующих пополнения на складе. Процесс выполняется в фоне.
          </p>
          <Button
            onClick={handleCalculate}
            disabled={calculateMutation.isPending}
            className="w-full sm:w-auto"
            variant={isRecentlyStarted ? "secondary" : "default"}
          >
            {isRecentlyStarted ? (
              <>
                <CheckCircle2 className="mr-2 h-4 w-4 text-green-600" />
                Запущено
              </>
            ) : (
              <>
                <Calculator className="mr-2 h-4 w-4" />
                Рассчитать дефициты
              </>
            )}
          </Button>
          {calculateMutation.isPending && (
            <p className="text-muted-foreground text-sm">Запускаем расчет...</p>
          )}
        </div>
      </CardContent>
    </Card>
  );
}

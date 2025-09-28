import { useCalculateDefsMutation } from "@/modules/defs/api/hooks/mutations/useCalculateDefsMutation";
import { DefControlsView } from "@/modules/defs/components/controls/def-controls/DefControlsView";
import { useEffect, useState } from "react";

export function DefControls() {
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
    <DefControlsView
      handleCalculate={handleCalculate}
      isPending={calculateMutation.isPending}
      isRecentlyStarted={isRecentlyStarted}
    />
  );
}

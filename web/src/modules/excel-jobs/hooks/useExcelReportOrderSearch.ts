import {
  parseExcelReportOrderSearch,
  sameSearchParams,
  writeExcelReportOrderSearch,
  type ExcelReportOrderSearchState,
} from "@/modules/excel-jobs/utils/excel-report-order-search";
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router";

export function useExcelReportOrderSearch() {
  const [params, setParams] = useSearchParams();
  const [state, setState] = useState<ExcelReportOrderSearchState>(() =>
    parseExcelReportOrderSearch(params),
  );

  useEffect(() => {
    const next = writeExcelReportOrderSearch(params, state);
    if (!sameSearchParams(next, params)) {
      setParams(next, { replace: true });
    }
  }, [params, setParams, state]);

  return { state, setState };
}

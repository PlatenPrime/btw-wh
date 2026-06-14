import {
  getChartDateRangeForLastDays,
  normalizeChartDateRangeOrder,
} from "@/lib/chart-date-range";
import { RoleType } from "@/constants/roles";
import type { ArtDto } from "@/modules/arts/api/types/dto";
import { ArtHeaderActions } from "@/modules/arts/components/actions/art-header-actions";
import { ArtContainerView } from "@/modules/arts/components/containers/art-container/ArtContainerView";
import { useAuth } from "@/modules/auth/api/hooks/useAuth";
import { useCallback, useState } from "react";

interface ArtContainerProps {
  artData: ArtDto;
}

export function ArtContainer({ artData }: ArtContainerProps) {
  const { hasRole } = useAuth();
  const showAdminExtras = hasRole(RoleType.ADMIN);

  const [{ dateFrom, dateTo }, setDateRange] = useState(() =>
    getChartDateRangeForLastDays(14),
  );

  const onDateRangeChange = useCallback((from: string, to: string) => {
    setDateRange(normalizeChartDateRangeOrder(from, to));
  }, []);

  return (
    <>
      <ArtHeaderActions artData={artData} />
      <ArtContainerView
        artData={artData}
        showCharts={showAdminExtras}
        showAnalogs={showAdminExtras}
        dateFrom={dateFrom}
        dateTo={dateTo}
        onDateRangeChange={onDateRangeChange}
      />
    </>
  );
}

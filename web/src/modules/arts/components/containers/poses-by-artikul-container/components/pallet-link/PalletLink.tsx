import { Card, CardContent } from "@/components/ui/card";
import type { PosResponse } from "@/modules/poses/api/types";
import { SkladListPos } from "@/modules/poses/components/shared/sklad-list-pos/SkladListPos";
import { Link } from "react-router";

export function PalletLink({ pos }: { pos: PosResponse }) {
  return (
    <Card key={pos.data!._id} className="p-0">
      <CardContent className="p-0">
        <Link to={`/wh/pallets/${pos.data?.palletData?.title || "unknown"}`}>
          <SkladListPos pos={pos} />
        </Link>
      </CardContent>
    </Card>
  );
}

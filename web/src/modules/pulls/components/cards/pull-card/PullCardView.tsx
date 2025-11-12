import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { Pull, PullPosition } from "@/modules/pulls/api/types";
import { PullPositionsList } from "@/modules/pulls/components/lists/pull-positions-list/PullPositionsList";
import { Columns4Icon } from "lucide-react";

interface PullCardViewProps {
  pull: Pull;
  onPositionClick: (position: PullPosition) => void;
}

export function PullCardView({ pull, onPositionClick }: PullCardViewProps) {
  return (
    <Card className="gap-2 border p-2 shadow-sm ">
      <CardHeader className="gap-2 p-0">
        <CardTitle className="flex items-center justify-center gap-2 text-lg">
          <Columns4Icon className="text-primary h-4 w-4" />
          {pull.palletTitle}
        </CardTitle>
      </CardHeader>
      <CardContent className="grid gap-2 p-0">
        <PullPositionsList
          positions={pull.positions}
          onPositionClick={onPositionClick}
        />
      </CardContent>
    </Card>
  );
}

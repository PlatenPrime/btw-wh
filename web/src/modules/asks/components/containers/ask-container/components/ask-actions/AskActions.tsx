import { Card, CardContent } from "@/components/ui";
import { Check } from "lucide-react";

interface AskActionsProps {
  actions: string[];
}

export function AskActions({ actions }: AskActionsProps) {
  if (actions.length === 0) return null;

  return (
    <Card className="p-1">
      <CardContent className="flex flex-col gap-2">
        {actions.map((action, index) => (
          <p key={index} className="flex items-start gap-2">
            <Check className="h-4 w-4 shrink-0" />
            <span key={index} className="text-xs">
              {" "}
              {action}
            </span>
            <hr />
          </p>
        ))}
      </CardContent>
    </Card>
  );
}

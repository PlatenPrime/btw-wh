import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui";
import { Check } from "lucide-react";

interface AskActionsProps {
  actions: string[];
}

export function AskActions({ actions }: AskActionsProps) {
  return (
    <Card className="grid gap-2 p-1">
      <CardHeader>
        <CardTitle>Дії</CardTitle>
      </CardHeader>
      <CardContent>
        {actions.map((action, index) => (
          <p key={index} className="flex items-center gap-2">
            <Check className="h-4 w-4" />
            <span key={index} className="text-sm">
              {" "}
              {action}
            </span>
          </p>
        ))}
      </CardContent>
    </Card>
  );
}

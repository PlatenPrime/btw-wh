import { Container } from '@/components/shared/container';
import { Card, CardContent } from "@/components/ui";
import { Check } from "lucide-react";

interface AskActionsProps {
  actions: string[];
}

export function AskActions({ actions }: AskActionsProps) {
  if (actions.length === 0) return null;

  return (
    <Container>
      <Card className="grid gap-2 p-1">
        <CardContent>
          {actions.map((action, index) => (
            <p key={index} className="flex items-center gap-2">
              <Check className="h-4 w-4 shrink-0" />
              <span key={index} className="text-sm">
                {" "}
                {action}
              </span>
            </p>
          ))}
        </CardContent>
      </Card>
    </Container>
  );
}

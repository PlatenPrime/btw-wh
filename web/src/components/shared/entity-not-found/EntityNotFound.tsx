import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ArrowLeft, RefreshCw, Search } from "lucide-react";

export interface EntityNotFoundProps {
  title?: string;
  description?: string;
  onGoBack?: () => void;
  onRetry?: () => void;
  className?: string;
}

export function EntityNotFound({
  title = "Дані не знайдено",
  description = "Запитана сутність не існує або була видалена",
  onGoBack,
  onRetry,
  className,
}: EntityNotFoundProps) {
  return (
    <Card className={className}>
      <CardHeader>
        <div className="flex items-center gap-3">
          <div className="bg-muted flex h-10 w-10 items-center justify-center rounded-full">
            <Search className="text-muted-foreground h-5 w-5" />
          </div>
          <div>
            <CardTitle className="text-lg">{title}</CardTitle>
            <CardDescription>{description}</CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="flex flex-wrap gap-2">
          {onGoBack && (
            <Button onClick={onGoBack} variant="outline" size="sm">
              <ArrowLeft className="mr-2 h-3 w-3" />
              Назад
            </Button>
          )}
          {onRetry && (
            <Button onClick={onRetry} variant="default" size="sm">
              <RefreshCw className="mr-2 h-3 w-3" />
              Спробувати знову
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
}

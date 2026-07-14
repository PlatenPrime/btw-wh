import { DialogActions } from "@/components/shared/dialogs";
import { EntityLabel } from "@/components/shared/entities/entity-label";
import { Label } from "@/components/ui/label";
import {
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { typography } from "@/lib/typography";
import type { KonkDto } from "@/modules/konks/api/types";

interface RunCompensatingSliceDialogViewProps {
  konkName: string;
  onKonkNameChange: (value: string) => void;
  konks: KonkDto[];
  isKonksLoading: boolean;
  isRunning: boolean;
  onRun: () => void;
  onCancel: () => void;
}

export function RunCompensatingSliceDialogView({
  konkName,
  onKonkNameChange,
  konks,
  isKonksLoading,
  isRunning,
  onRun,
  onCancel,
}: RunCompensatingSliceDialogViewProps) {
  return (
    <DialogContent className="sm:max-w-[480px]">
      <DialogHeader>
        <DialogTitle>Компенсуючий зріз</DialogTitle>
        <DialogDescription>
          Повторний опит позицій з помилкою опитування в сьогоднішніх analog- і
          sku-зрізах. Новий документ зрізу не створюється.
        </DialogDescription>
      </DialogHeader>

      <div className="grid gap-4">
        <p className={typography.pageDescription}>
          Після запуску вікно закриється одразу — опитування йде у фоні і може
          зайняти кілька хвилин. Результат прийде сповіщенням. Повторний запуск
          для того самого конкурента блокується, доки попередній не завершиться.
        </p>

        <div className="flex flex-col gap-2">
          <Label htmlFor="compensating-slice-konk">Конкурент</Label>
          <Select
            value={konkName || undefined}
            onValueChange={onKonkNameChange}
            disabled={isRunning || isKonksLoading}
          >
            <SelectTrigger
              id="compensating-slice-konk"
              aria-label="Конкурент"
              className="w-full"
            >
              <SelectValue placeholder="Оберіть конкурента" />
            </SelectTrigger>
            <SelectContent>
              {konks.map((k) => (
                <SelectItem key={k._id} value={k.name}>
                  <EntityLabel
                    imageUrl={k.imageUrl}
                    title={k.title}
                    fallbackLabel={k.name}
                    imageSize="xs"
                  />
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <DialogActions
          onCancel={onCancel}
          onSubmit={onRun}
          isSubmitting={isRunning}
          isDisabled={!konkName}
          submitText="Запустити"
          submitLoadingText="Запуск..."
          variant="default"
          className="justify-end"
        />
      </div>
    </DialogContent>
  );
}

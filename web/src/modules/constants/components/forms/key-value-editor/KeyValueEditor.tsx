import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Plus, Trash2 } from "lucide-react";
import type {
  Control,
  FieldArray,
  FieldPath,
  FieldValues,
} from "react-hook-form";
import { useFieldArray } from "react-hook-form";

export interface KeyValueEntry {
  key: string;
  value: string;
}

interface KeyValueEditorProps<T extends FieldValues> {
  control: Control<T>;
  name: FieldPath<T>;
  disabled?: boolean;
  addButtonLabel?: string;
  keyLabel?: string;
  valueLabel?: string;
}

export function KeyValueEditor<T extends FieldValues>({
  control,
  name,
  disabled = false,
  addButtonLabel = "Додати пару",
  keyLabel = "Ключ",
  valueLabel = "Значення",
}: KeyValueEditorProps<T>) {
  const { fields, prepend, remove } = useFieldArray({
    control,
    name: name as never,
  });

  return (
    <div className="grid gap-2">
      <div className="flex items-center justify-between gap-2">
        <Label className="text-muted-foreground text-xs">
          Дані (ключ–значення)
        </Label>
        <Button
          type="button"
          variant="outline"
          size="sm"
          onClick={() =>
            prepend({ key: "", value: "" } as FieldArray<T, never>)
          }
          disabled={disabled}
          className="shrink-0"
        >
          <Plus className="h-4 w-4" />
          {addButtonLabel}
        </Button>
      </div>
      <div className="grid max-h-[320px] min-h-0 gap-2 overflow-y-auto">
        {fields.length === 0 && (
          <p className="text-muted-foreground text-sm">Пар ще немає</p>
        )}
        {fields.map((field, index) => (
          <div
            key={field.id}
            className="grid grid-cols-[1fr_1fr_auto] items-end gap-2"
          >
            <div className="grid gap-1">
              <Label htmlFor={`${name}-${index}-key`} className="sr-only">
                {keyLabel} {index + 1}
              </Label>
              <Input
                id={`${name}-${index}-key`}
                placeholder={keyLabel}
                disabled={disabled}
                {...control.register(`${name}.${index}.key` as never)}
              />
            </div>
            <div className="grid gap-1">
              <Label htmlFor={`${name}-${index}-value`} className="sr-only">
                {valueLabel} {index + 1}
              </Label>
              <Input
                id={`${name}-${index}-value`}
                placeholder={valueLabel}
                disabled={disabled}
                {...control.register(`${name}.${index}.value` as never)}
              />
            </div>
            <Button
              type="button"
              variant="ghost"
              size="icon"
              onClick={() => remove(index)}
              disabled={disabled}
              aria-label="Видалити пару"
            >
              <Trash2 className="text-destructive h-4 w-4" />
            </Button>
          </div>
        ))}
      </div>
    </div>
  );
}

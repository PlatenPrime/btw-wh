import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";

interface IncludeImagesControlViewProps {
  checked: boolean;
  onCheckedChange: (checked: boolean) => void;
  disabled?: boolean;
  id?: string;
  label?: string;
}

export function IncludeImagesControlView({
  checked,
  onCheckedChange,
  disabled = false,
  id = "excel-include-images",
  label = "Додати фото",
}: IncludeImagesControlViewProps) {
  return (
    <div className="flex items-center gap-2">
      <Switch
        id={id}
        checked={checked}
        onCheckedChange={onCheckedChange}
        disabled={disabled}
      />
      <Label htmlFor={id} className="cursor-pointer font-normal">
        {label}
      </Label>
    </div>
  );
}

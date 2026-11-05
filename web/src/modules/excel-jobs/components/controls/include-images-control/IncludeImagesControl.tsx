import { IncludeImagesControlView } from "./IncludeImagesControlView";

export interface IncludeImagesControlProps {
  checked: boolean;
  onCheckedChange: (checked: boolean) => void;
  disabled?: boolean;
  id?: string;
  label?: string;
}

export function IncludeImagesControl({
  checked,
  onCheckedChange,
  disabled = false,
  id,
  label,
}: IncludeImagesControlProps) {
  return (
    <IncludeImagesControlView
      checked={checked}
      onCheckedChange={onCheckedChange}
      disabled={disabled}
      id={id}
      label={label}
    />
  );
}

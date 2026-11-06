import {
  ThemedInput,
  ThemedInputField,
} from "@/components/themed";
import { useState } from "react";

interface NumericDraftFieldProps {
  value: string;
  onChange: (value: string) => void;
  onBlur?: () => void;
  filter: (text: string) => string;
  normalize: (text: string) => string;
  placeholder?: string;
  placeholderTextColor?: string;
  editable?: boolean;
  keyboardType?: "numeric" | "number-pad" | "default";
  autoFocus?: boolean;
  maxLength?: number;
  error?: boolean;
  className?: string;
}

/**
 * Controlled numeric/artikul field: mid-edit держит draft как набрано,
 * normalize только на blur — caret не уезжает в конец.
 */
export function NumericDraftField({
  value,
  onChange,
  onBlur,
  filter,
  normalize,
  placeholder,
  placeholderTextColor,
  editable = true,
  keyboardType = "numeric",
  autoFocus,
  maxLength,
  error,
  className,
}: NumericDraftFieldProps) {
  const [draft, setDraft] = useState<string | null>(null);

  const displayValue = draft !== null ? draft : value;

  return (
    <ThemedInput
      className={
        className ??
        `rounded-lg border bg-background-0 ${
          error ? "border-error-500" : "border-outline-50"
        }`
      }
    >
      <ThemedInputField
        placeholder={placeholder}
        placeholderTextColor={placeholderTextColor}
        value={displayValue}
        onFocus={() => {
          const focused = filter(value);
          setDraft(focused);
          if (focused !== value) {
            onChange(focused);
          }
        }}
        onChangeText={(text) => {
          const next = filter(text);
          setDraft(next);
          onChange(next);
        }}
        onBlur={() => {
          const raw = draft ?? value;
          const normalized = normalize(raw);
          setDraft(null);
          onChange(normalized);
          onBlur?.();
        }}
        keyboardType={keyboardType}
        editable={editable}
        autoFocus={autoFocus}
        maxLength={maxLength}
        className="text-typography-900"
      />
    </ThemedInput>
  );
}

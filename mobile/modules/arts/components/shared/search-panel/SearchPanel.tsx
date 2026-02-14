import {
  ThemedInput,
  ThemedInputField,
  ThemedInputIcon,
  ThemedInputSlot,
} from "@/components/themed";
import { useIconColor } from "@/hooks/use-icon-color";

interface SearchPanelProps {
  search: string;
  onSearchChange: (text: string) => void;
  placeholder?: string;
}

export function SearchPanel({
  search,
  onSearchChange,
  placeholder = "Пошук артикулів...",
}: SearchPanelProps) {
  const iconColor = useIconColor();

  return (
    <ThemedInput
      variant="outline"
      size="md"
      className="rounded-2xl border border-outline-100/80 shadow-hard-2 px-3 bg-background-0/85"
    >
      <ThemedInputSlot>
        <ThemedInputIcon
          family="MaterialIcons"
          name="search"
          size={20}
          color={iconColor}
        />
      </ThemedInputSlot>
      <ThemedInputField
        value={search}
        onChangeText={onSearchChange}
        placeholder={placeholder}
      />
    </ThemedInput>
  );
}

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
    <ThemedInput variant="outline" size="md" className="px-3">
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

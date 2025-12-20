import { Colors } from "@/constants/theme";
import { useColorScheme } from "@/hooks/use-color-scheme";
import type { GetPosesByPalletIdParams } from "@/modules/poses/api/services/queries/getPosesByPalletId";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { useState } from "react";
import { PalletSortControlsView } from "./PalletSortControlsView";

interface PalletSortControlsProps {
  sortParams: GetPosesByPalletIdParams;
  onSortParamsChange: (params: GetPosesByPalletIdParams) => void;
}

type SortByOption = {
  value: "artikul" | "updatedAt";
  label: string;
  icon: keyof typeof MaterialIcons.glyphMap;
};

type SortOrderOption = {
  value: "asc" | "desc";
  label: string;
  icon: keyof typeof MaterialIcons.glyphMap;
};

const sortByOptions: SortByOption[] = [
  { value: "artikul", label: "Артикул", icon: "sort" },
  { value: "updatedAt", label: "Дата", icon: "event" },
];

const sortOrderOptions: SortOrderOption[] = [
  { value: "asc", label: "За зростанням", icon: "arrow-upward" },
  { value: "desc", label: "За спаданням", icon: "arrow-downward" },
];

export function PalletSortControls({
  sortParams,
  onSortParamsChange,
}: PalletSortControlsProps) {
  const [modalVisible, setModalVisible] = useState(false);
  const colorScheme = useColorScheme() ?? "light";
  const textColor =
    colorScheme === "light" ? Colors.light.text : Colors.dark.text;
  const bgColor =
    colorScheme === "light" ? Colors.light.background : Colors.dark.background;
  const borderColor = colorScheme === "light" ? "#e5e7eb" : "#374151";
  const modalBgColor = colorScheme === "light" ? "#ffffff" : "#1f2937";
  const itemBgColor = colorScheme === "light" ? "#f9fafb" : "#374151";
  const selectedBgColor = colorScheme === "light" ? "#e5e7eb" : "#4b5563";

  const currentSortBy = sortByOptions.find(
    (opt) => opt.value === (sortParams.sortBy || "updatedAt")
  );
  const currentSortOrder = sortOrderOptions.find(
    (opt) => opt.value === (sortParams.sortOrder || "desc")
  );

  const handleSortByChange = (value: "artikul" | "updatedAt") => {
    onSortParamsChange({
      ...sortParams,
      sortBy: value,
    });
  };

  const handleSortOrderChange = (value: "asc" | "desc") => {
    onSortParamsChange({
      ...sortParams,
      sortOrder: value,
    });
  };

  return (
    <PalletSortControlsView
      sortParams={sortParams}
      modalVisible={modalVisible}
      onModalVisibleChange={setModalVisible}
      onSortByChange={handleSortByChange}
      onSortOrderChange={handleSortOrderChange}
      currentSortBy={currentSortBy}
      currentSortOrder={currentSortOrder}
      sortByOptions={sortByOptions}
      sortOrderOptions={sortOrderOptions}
      textColor={textColor}
      bgColor={bgColor}
      borderColor={borderColor}
      modalBgColor={modalBgColor}
      itemBgColor={itemBgColor}
      selectedBgColor={selectedBgColor}
    />
  );
}

import type { GetPosesByPalletIdParams } from "@/modules/poses/api/services/queries/getPosesByPalletId";
import { useState } from "react";
import { PalletSortControlsView } from "./PalletSortControlsView";

interface PalletSortControlsProps {
  sortParams: GetPosesByPalletIdParams;
  onSortParamsChange: (params: GetPosesByPalletIdParams) => void;
}

type SortByOption = {
  value: "artikul" | "updatedAt";
  label: string;
  icon: string;
};

type SortOrderOption = {
  value: "asc" | "desc";
  label: string;
  icon: string;
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
    />
  );
}

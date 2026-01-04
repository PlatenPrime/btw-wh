import { ThemedBox } from "@/components/themed";
import type { RowDto } from "@/modules/rows/api/types/dto";
import { RowsList } from "@/modules/rows/components/lists/rows-list/RowsList";
import { ThemedText } from "@/components/themed/themed-text";
import { CreateRowDialog } from "@/modules/rows/components/dialogs/create-row-dialog/CreateRowDialog";

interface RowsContainerViewProps {
  data: RowDto[] | undefined;
  isLoading: boolean;
  createDialogOpen: boolean;
  setCreateDialogOpen: (open: boolean) => void;
  onCreateSuccess: () => void;
  refreshing?: boolean;
  onRefresh?: () => void;
}

export function RowsContainerView({
  data,
  isLoading,
  createDialogOpen,
  setCreateDialogOpen,
  onCreateSuccess,
  refreshing,
  onRefresh,
}: RowsContainerViewProps) {
  if (isLoading) {
    return (
      <ThemedBox className="flex-1 justify-center items-center py-8">
        <ThemedText type="default" className="text-center">
          Завантаження...
        </ThemedText>
      </ThemedBox>
    );
  }

  return (
    <>
      <ThemedBox className="flex-1 ">
        <RowsList rows={data} refreshing={refreshing} onRefresh={onRefresh} />
      </ThemedBox >
      <CreateRowDialog
        open={createDialogOpen}
        onOpenChange={setCreateDialogOpen}
        onSuccess={onCreateSuccess}
      />
    </>
  );
}


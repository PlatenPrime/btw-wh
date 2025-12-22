import { Box } from "@/components/ui";
import type { RowDto } from "@/modules/rows/api/types/dto";
import { RowsList } from "@/modules/rows/components/lists/rows-list/RowsList";
import { ThemedText } from "@/components/themed-text";
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
      <Box className="flex-1 justify-center items-center py-8">
        <ThemedText type="default" className="text-center">
          Завантаження...
        </ThemedText>
      </Box>
    );
  }

  return (
    <>
      <Box className="flex-1">
        <RowsList rows={data} refreshing={refreshing} onRefresh={onRefresh} />
      </Box>
      <CreateRowDialog
        open={createDialogOpen}
        onOpenChange={setCreateDialogOpen}
        onSuccess={onCreateSuccess}
      />
    </>
  );
}


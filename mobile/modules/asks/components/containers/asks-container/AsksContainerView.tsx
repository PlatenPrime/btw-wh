import { ThemedText } from "@/components/themed-text";
import { HStack } from "@/components/ui";
import { Icon } from "@/components/ui/icon";
import type { GetAsksByDateResponse } from "@/modules/asks/api/types/dto";
import { CreateAskDialog } from "@/modules/asks/components/dialogs/create-ask-dialog/CreateAskDialog";
import { AsksList } from "@/modules/asks/components/lists/asks-list/AsksList";
import { formatDate } from "@/modules/asks/utils/format-date";
import { ScrollView, TouchableOpacity, View, RefreshControl } from "react-native";

interface AsksContainerViewProps {
  selectedDate: Date;
  data: GetAsksByDateResponse;
  isFetching: boolean;
  onPreviousDay: () => void;
  onNextDay: () => void;
  onDateSelect: (date: Date | undefined) => void;
  createAskDialogOpen: boolean;
  setCreateAskDialogOpen: (open: boolean) => void;
  onCreateAskSuccess: () => void;
  refreshing?: boolean;
  onRefresh?: () => void;
}

export function AsksContainerView({
  selectedDate,
  data,
  isFetching,
  onPreviousDay,
  onNextDay,
  createAskDialogOpen,
  setCreateAskDialogOpen,
  onCreateAskSuccess,
  refreshing = false,
  onRefresh,
}: AsksContainerViewProps) {
  const formattedDate = formatDate(selectedDate);

  return (
    <>
      <ScrollView
        className="flex-1"
        contentContainerClassName="gap-4 p-4"
        refreshControl={
          onRefresh ? (
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          ) : undefined
        }
      >
        <View className="gap-2">
          <HStack className="items-center justify-between">
            <TouchableOpacity onPress={onPreviousDay}>
              <Icon family="MaterialIcons" name="chevron-left" size={24} />
            </TouchableOpacity>
            <ThemedText type="title" className="text-lg">
              {formattedDate}
            </ThemedText>
            <TouchableOpacity onPress={onNextDay}>
              <Icon family="MaterialIcons" name="chevron-right" size={24} />
            </TouchableOpacity>
          </HStack>

          <HStack className="items-center justify-between">
            <ThemedText type="default" className="text-sm">
              {data.completedCount + data.rejectedCount}/{data.count}
            </ThemedText>
          </HStack>
        </View>

        <View style={{ opacity: isFetching ? 0.5 : 1 }}>
          <AsksList asks={data.data} />
        </View>
      </ScrollView>

      <CreateAskDialog
        open={createAskDialogOpen}
        onOpenChange={setCreateAskDialogOpen}
        onSuccess={onCreateAskSuccess}
      />
    </>
  );
}

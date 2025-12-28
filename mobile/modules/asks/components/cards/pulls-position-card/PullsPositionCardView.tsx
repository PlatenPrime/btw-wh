import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";
import { Button, Text } from "@/components/ui";
import { HStack, VStack } from "@/components/ui";
import { Icon } from "@/components/ui/icon";
import { ArtImageLink } from "@/components/shared/art-image-link";
import type { IPositionForPullsPage } from "@/modules/asks/api/types/dto";
import { AskPosEditDialog } from "@/modules/asks/components/dialogs/ask-pos-edit-dialog/AskPosEditDialog";
import type { PosResponse } from "@/modules/poses/api/types";
import { useThemeColors } from "@/hooks/use-theme-colors";

interface PullsPositionCardViewProps {
  position: IPositionForPullsPage;
  posResponse: PosResponse;
  open: boolean;
  setOpen: (open: boolean) => void;
  onSuccess: () => void;
  bgColor: string;
  borderColor: string;
}

export function PullsPositionCardView({
  position,
  posResponse,
  open,
  setOpen,
  onSuccess,
  bgColor,
  borderColor,
}: PullsPositionCardViewProps) {
  return (
    <>
      <ThemedView
        className="p-2 rounded-lg border"
        style={{
          backgroundColor: bgColor,
          borderColor: borderColor,
        }}
      >
        <VStack className="gap-2">
          <ArtImageLink artikul={position.artikul} nameukr={position.nameukr} link={`/(tabs)/arts/${position.artikul}`} />

          <HStack className="items-center justify-between">
            <VStack className="gap-2 flex-1">
              {position.askRemainingQuantity !== null && (
                <HStack className="items-center gap-1">
                  <Icon family="MaterialIcons" name="radio-button-unchecked" size={12} />
                  <ThemedText type="default" className="text-xs">
                    {position.askRemainingQuantity}
                  </ThemedText>
                </HStack>
              )}
              <ThemedText type="defaultSemiBold" className="text-sm">
                {position.palletTitle}
              </ThemedText>
            </VStack>

            <Button
              onPress={() => setOpen(true)}
              variant="outline"
              className="self-end"
            >
              <Text className="font-semibold text-sm">Зняти товар</Text>
            </Button>
          </HStack>
        </VStack>
      </ThemedView>

      <AskPosEditDialog
        pos={posResponse}
        askId={position.askId}
        open={open}
        setOpen={setOpen}
        onSuccess={onSuccess}
        initialRemovedQuant={position.plannedQuant ?? undefined}
      />
    </>
  );
}


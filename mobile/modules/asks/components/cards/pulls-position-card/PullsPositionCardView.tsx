import { ThemedText } from "@/components/themed/themed-text";
import { ThemedView } from "@/components/themed/themed-view";
import { ThemedButton, ThemedText as ThemedTextButton, ThemedHStack, ThemedVStack } from "@/components/themed";
import { ThemedIcon } from "@/components/themed";
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
        <ThemedVStack className="gap-2">
          <ArtImageLink artikul={position.artikul} nameukr={position.nameukr} link={`/(tabs)/arts/${position.artikul}`} />

          <ThemedHStack className="items-center justify-between">
            <ThemedVStack className="gap-2 flex-1">
              {position.askRemainingQuantity !== null && (
                <ThemedHStack className="items-center gap-1">
                  <ThemedIcon family="MaterialIcons" name="radio-button-unchecked" size={12} />
                  <ThemedText type="default" className="text-xs">
                    {position.askRemainingQuantity}
                  </ThemedText>
                </ThemedHStack>
              )}
              <ThemedText type="defaultSemiBold" className="text-sm">
                {position.palletTitle}
              </ThemedText>
            </ThemedVStack>

            <ThemedButton
              onPress={() => setOpen(true)}
              variant="outline"
              className="self-end"
            >
              <ThemedTextButton className="font-semibold text-sm">Зняти товар</ThemedTextButton>
            </ThemedButton>
          </ThemedHStack>
        </ThemedVStack>
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


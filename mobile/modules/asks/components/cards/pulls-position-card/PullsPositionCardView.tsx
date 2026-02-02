import {
  ThemedButton,
  ThemedHStack,
  ThemedIcon,
  ThemedText as ThemedTextButton,
  ThemedVStack,
} from "@/components/themed";
import { ThemedText } from "@/components/themed/themed-text";

import { ArtImageLink } from "@/components/shared/art-image-link";
import { GlassCard } from "@/components/shared/glass-card";
import type { IPositionForPullsPage } from "@/modules/asks/api/types/dto";
import { AskPosEditDialog } from "@/modules/asks/components/dialogs/ask-pos-edit-dialog/AskPosEditDialog";
import type { PosResponse } from "@/modules/poses/api/types";

interface PullsPositionCardViewProps {
  position: IPositionForPullsPage;
  posResponse: PosResponse;
  open: boolean;
  setOpen: (open: boolean) => void;
  onSuccess: () => void;
}

export function PullsPositionCardView({
  position,
  posResponse,
  open,
  setOpen,
  onSuccess,
}: PullsPositionCardViewProps) {
  return (
    <>
      <GlassCard className="p-2">
        <ThemedVStack className="gap-2">
          <ThemedHStack className="items-center justify-between gap-2">
            <ThemedText
              type="defaultSemiBold"
              className="text-lg flex-1"
              numberOfLines={1}
              ellipsizeMode="tail"
            >
              {position.palletTitle}
            </ThemedText>
            <ThemedButton
              onPress={() => setOpen(true)}
              variant="outline"
              size="sm"
            >
              <ThemedTextButton className="font-semibold text-sm">
                Зняти товар
              </ThemedTextButton>
            </ThemedButton>
          </ThemedHStack>

          <ArtImageLink
            artikul={position.artikul}
            nameukr={position.nameukr}
            link={`/(tabs)/arts/${position.artikul}`}
          />

          {position.askRemainingQuantity !== null && (
            <ThemedHStack className="items-center gap-1">
              <ThemedIcon
                family="MaterialIcons"
                name="radio-button-unchecked"
                size={12}
              />
              <ThemedText type="default" className="text-xs">
                {position.askRemainingQuantity}
              </ThemedText>
            </ThemedHStack>
          )}
        </ThemedVStack>
      </GlassCard>

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

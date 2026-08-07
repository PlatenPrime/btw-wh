import { ArtImageLink } from "@/components/shared/art-image-link";
import { GlassCard } from "@/components/shared/glass-card";
import {
  ThemedButton,
  ThemedHStack,
  ThemedIcon,
  ThemedText as ThemedTextButton,
  ThemedVStack,
} from "@/components/themed";
import { ThemedText } from "@/components/themed/themed-text";
import { SemanticColors } from "@/constants/theme";
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
  const zoneLabel = position.artZone ?? "—";

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

          <ThemedHStack className="items-center gap-1.5">
            <ThemedIcon
              family="MaterialIcons"
              name="place"
              size={14}
              color={SemanticColors.iconColors.amber}
            />
            <ThemedText
              type="default"
              className="text-xs flex-1"
              numberOfLines={1}
            >
              {zoneLabel}
            </ThemedText>
          </ThemedHStack>

          <ThemedHStack className="flex-wrap items-center gap-3">
            <ThemedHStack className="items-center gap-1">
              <ThemedIcon
                family="MaterialIcons"
                name="inventory-2"
                size={14}
                color={SemanticColors.iconColors.blue}
              />
              <ThemedText type="default" className="text-xs">
                {position.quant}
              </ThemedText>
            </ThemedHStack>

            {position.plannedQuant !== null ? (
              <ThemedHStack className="items-center gap-1">
                <ThemedIcon
                  family="MaterialIcons"
                  name="arrow-downward"
                  size={14}
                  color={SemanticColors.iconColors.green}
                />
                <ThemedText type="default" className="text-xs">
                  {position.plannedQuant}
                </ThemedText>
              </ThemedHStack>
            ) : null}

            {position.askRemainingQuantity !== null ? (
              <ThemedHStack className="items-center gap-1">
                <ThemedIcon
                  family="MaterialIcons"
                  name="radio-button-unchecked"
                  size={12}
                  color={SemanticColors.iconColors.amber}
                />
                <ThemedText type="default" className="text-xs">
                  {position.askRemainingQuantity}
                </ThemedText>
              </ThemedHStack>
            ) : null}
          </ThemedHStack>
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

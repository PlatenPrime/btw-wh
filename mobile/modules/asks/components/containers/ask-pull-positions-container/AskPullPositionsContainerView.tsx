import { ThemedText } from "@/components/themed/themed-text";
import { ThemedView } from "@/components/themed/themed-view";
import type { GetAskPullResponse } from "@/modules/asks/api/types/dto";
import { getAskPullStatusMessage } from "@/modules/asks/utils/get-ask-pull-status-message/getAskPullStatusMessage";
import { AskPullPositionCard } from "./components/ask-pull-position-card/AskPullPositionCard";
import { AskPullStatusMessage } from "./components/ask-pull-status-message/AskPullStatusMessage";
import { ThemedVStack, ThemedHStack } from "@/components/themed";
import { ThemedIcon } from "@/components/themed";
import { useThemeColors } from "@/hooks/use-theme-colors";
import { ActivityIndicator } from "react-native";

interface AskPullPositionsContainerViewProps {
  data: GetAskPullResponse;
  askId: string;
  isFetching: boolean;
}

export function AskPullPositionsContainerView({
  data,
  askId,
  isFetching,
}: AskPullPositionsContainerViewProps) {
  const statusMessage = getAskPullStatusMessage(data);
  const { card } = useThemeColors();

  return (
    <ThemedView
      className="p-4 rounded-lg border"
      style={{
        backgroundColor: card.bg,
        borderColor: card.border,
      }}
    >
      <ThemedVStack className="gap-4">
        <ThemedVStack className="gap-2">
          <ThemedHStack className="items-center justify-center gap-2">
            <ThemedText type="defaultSemiBold" className="text-base text-center">
              Позиції для зняття
            </ThemedText>
            {isFetching && <ActivityIndicator size="small" />}
          </ThemedHStack>
          {data.remainingQuantity !== null && data.remainingQuantity > 0 && (
            <ThemedHStack className="items-center gap-2">
              <ThemedIcon family="MaterialIcons" name="radio-button-unchecked" size={16} />
              <ThemedText type="default" className="text-sm opacity-70">
                Залишилось зняти: {data.remainingQuantity}
              </ThemedText>
            </ThemedHStack>
          )}
        </ThemedVStack>

        {statusMessage ? (
          <AskPullStatusMessage statusMessage={statusMessage} />
        ) : (
          <ThemedVStack
            className="gap-4"
            style={{ opacity: isFetching ? 0.6 : 1 }}
          >
            {data.positions.map((position) => (
              <AskPullPositionCard
                key={position._id}
                position={position}
                askId={askId}
              />
            ))}
          </ThemedVStack>
        )}
      </ThemedVStack>
    </ThemedView>
  );
}


import { ThemedText } from "@/components/themed/themed-text";
import { ThemedView } from "@/components/themed/themed-view";
import type { GetAskPullResponse } from "@/modules/asks/api/types/dto";
import { getAskPullStatusMessage } from "@/modules/asks/utils/get-ask-pull-status-message/getAskPullStatusMessage";
import { AskPullPositionCard } from "./components/ask-pull-position-card/AskPullPositionCard";
import { AskPullStatusMessage } from "./components/ask-pull-status-message/AskPullStatusMessage";
import { VStack, HStack } from "@/components/ui";
import { Icon } from "@/components/ui/icon";
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
      <VStack className="gap-4">
        <VStack className="gap-2">
          <HStack className="items-center justify-center gap-2">
            <ThemedText type="defaultSemiBold" className="text-base text-center">
              Позиції для зняття
            </ThemedText>
            {isFetching && <ActivityIndicator size="small" />}
          </HStack>
          {data.remainingQuantity !== null && data.remainingQuantity > 0 && (
            <HStack className="items-center gap-2">
              <Icon family="MaterialIcons" name="radio-button-unchecked" size={16} />
              <ThemedText type="default" className="text-sm opacity-70">
                Залишилось зняти: {data.remainingQuantity}
              </ThemedText>
            </HStack>
          )}
        </VStack>

        {statusMessage ? (
          <AskPullStatusMessage statusMessage={statusMessage} />
        ) : (
          <VStack
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
          </VStack>
        )}
      </VStack>
    </ThemedView>
  );
}


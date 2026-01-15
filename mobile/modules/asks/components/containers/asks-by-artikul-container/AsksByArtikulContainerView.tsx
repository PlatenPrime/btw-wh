import { ThemedVStack } from "@/components/themed/themed-vstack";
import { ThemedText } from "@/components/themed/themed-text";
import type { GetAsksByArtikulResponse } from "@/modules/asks/api/types/dto";
import { AsksByArtikulCard } from "@/modules/asks/components/cards/asks-by-artikul-card/AsksByArtikulCard";

interface AsksByArtikulContainerViewProps {
  data: GetAsksByArtikulResponse;
}

export function AsksByArtikulContainerView({
  data,
}: AsksByArtikulContainerViewProps) {
  return (
    <ThemedVStack className="gap-4">
      <ThemedText type="title" className="text-lg text-center">
        Запити
      </ThemedText>

      <ThemedVStack className="gap-2">
        {data.data.map((ask) => (
          <AsksByArtikulCard key={ask._id} ask={ask} />
        ))}
      </ThemedVStack>
    </ThemedVStack>
  );
}

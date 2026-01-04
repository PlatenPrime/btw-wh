import { ThemedText } from "@/components/themed/themed-text";
import { ThemedBox, ThemedHStack, ThemedVStack } from "@/components/themed";

interface BlockInfoViewProps {
  title: string;
  order: number;
  segmentsCount: number;
}

export function BlockInfoView({
  title,
  order,
  segmentsCount,
}: BlockInfoViewProps) {
  return (
    <ThemedBox className="p-4 rounded-lg border border-outline-100 bg-background-0">
      <ThemedVStack className="gap-2">
        <ThemedText type="title" className="text-lg text-center">
          {title}
        </ThemedText>
        <ThemedBox className="gap-1">
          <ThemedHStack className="items-center justify-start gap-2">
            <ThemedText type="default" className="text-sm">
              Порядок:
            </ThemedText>
            <ThemedText type="defaultSemiBold" className="text-sm">
              {order}
            </ThemedText>
          </ThemedHStack>
  
          <ThemedHStack className="items-center justify-start gap-2">
            <ThemedText type="default" className="text-sm">
              Сегментів:
            </ThemedText>
            <ThemedText type="defaultSemiBold" className="text-sm">
              {segmentsCount}
            </ThemedText>
          </ThemedHStack>
        </ThemedBox>
      </ThemedVStack>
    </ThemedBox>
  );
}


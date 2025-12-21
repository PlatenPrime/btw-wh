import { ThemedText } from "@/components/themed-text";
import { Pressable, Box } from "@/components/ui";

interface RowCardViewProps {
  title: string;
  palletsCount: number;
  onPress: () => void;
}

export function RowCardView({
  title,
  palletsCount,
  onPress,
}: RowCardViewProps) {
  return (
    <Pressable
      onPress={onPress}
      className="p-4 rounded-lg border border-outline-200 bg-background-0"
    >
      <Box className="items-center">
        <ThemedText type="title" className="text-xl ">
          {title}
        </ThemedText>

      </Box>
    </Pressable>
  );
}


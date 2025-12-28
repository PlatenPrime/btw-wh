import { View } from "react-native";
import { Box } from "@/components/ui";

export function PullsContainerSkeleton() {
  return (
    <View className="flex-1 gap-4 p-4">
      <View className="gap-2">
        <Box className="rounded bg-secondary-300" style={{ height: 32, width: "60%" }} />
      </View>
      <View className="gap-4">
        {Array.from({ length: 3 }).map((_, index) => (
          <Box
            key={index}
            className="rounded-lg bg-secondary-300"
            style={{ height: 120, width: "100%" }}
          />
        ))}
      </View>
    </View>
  );
}


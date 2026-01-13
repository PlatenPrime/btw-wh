import { ThemedText } from "@/components/themed/themed-text";
import React from "react";
import { View } from "react-native";

interface ArtikulImageLinkTextContentProps {
  artikul: string;
  nameukr: string | undefined;
}

export function ArtikulImageLinkTextContent({
  artikul,
  nameukr,
}: ArtikulImageLinkTextContentProps) {
  return (
    <View style={{ flex: 1, minWidth: 0 }}>
      <ThemedText type="defaultSemiBold" className="text-base mb-1">
        {artikul}
      </ThemedText>
      {nameukr && (
        <ThemedText type="default" className="text-sm text-typography-700">
          {nameukr.slice(10)} 
        </ThemedText>
      )}
    </View>
  );
}

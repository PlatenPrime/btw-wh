import React from "react";
import { TouchableOpacity } from "react-native";
import { ArtikulImageLinkTextContent } from "./ArtikulImageLinkTextContent";

interface ArtikulImageLinkTextContentPressableProps {
  artikul: string;
  nameukr: string;
  onTextPress: () => void;
}

export function ArtikulImageLinkTextContentPressable({
  artikul,
  nameukr,
  onTextPress,
}: ArtikulImageLinkTextContentPressableProps) {
  return (
    <TouchableOpacity
      onPress={onTextPress}
      activeOpacity={0.7}
      style={{ flex: 1, minWidth: 0 }}
    >
      <ArtikulImageLinkTextContent artikul={artikul} nameukr={nameukr} />
    </TouchableOpacity>
  );
}

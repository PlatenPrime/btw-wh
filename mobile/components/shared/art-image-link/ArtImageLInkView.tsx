import { SharikImage } from "@/components/shared/sharik-image";
import React from "react";
import { TouchableOpacity, View } from "react-native";
import { ArtikulImageLinkTextContent } from "./components/text-content/ArtikulImageLinkTextContent";
import { ArtikulImageLinkTextContentPressable } from "./components/text-content/ArtikulImageLinkTextContentPressable";

interface ArtImageLinkViewProps {
  artikul: string;
  nameukr: string;
  isTextTouchable: boolean;
  onImagePress: () => void;
  onTextPress: () => void;
}

export function ArtImageLinkView({
  artikul,
  nameukr,
  isTextTouchable,
  onImagePress,
  onTextPress,
}: ArtImageLinkViewProps) {
  return (
    <View className="flex-row items-start" style={{ gap: 12 }}>
      <TouchableOpacity onPress={onImagePress} activeOpacity={0.7}>
        <SharikImage
          artikul={artikul}
          size="prev"
          style={{ width: 60, height: 60, borderRadius: 8 }}
        />
      </TouchableOpacity>
      {isTextTouchable ? (
        <ArtikulImageLinkTextContentPressable
          artikul={artikul}
          nameukr={nameukr}
          onTextPress={onTextPress}
        />
      ) : (
        <ArtikulImageLinkTextContent artikul={artikul} nameukr={nameukr} />
      )}
    </View>
  );
}

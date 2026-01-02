import { Image } from "expo-image";
import React from "react";
import { TouchableOpacity, View } from "react-native";
import { ArtikulImageLinkTextContent } from "./components/text-content/ArtikulImageLinkTextContent";
import { ArtikulImageLinkTextContentPressable } from "./components/text-content/ArtikulImageLinkTextContentPressable";

interface ArtImageLinkViewProps {
  artikul: string;
  nameukr: string;
  imageUrl: string;
  isTextTouchable: boolean;
  onImagePress: () => void;
  onTextPress: () => void;
}

export function ArtImageLinkView({
  artikul,
  nameukr,
  imageUrl,
  isTextTouchable,
  onImagePress,
  onTextPress,
}: ArtImageLinkViewProps) {
  return (
    <View className="flex-row items-start" style={{ gap: 12 }}>
      <TouchableOpacity onPress={onImagePress} activeOpacity={0.7}>
        <Image
          source={{ uri: imageUrl }}
          style={{ width: 60, height: 60, borderRadius: 8 }}
          contentFit="cover"
          placeholder={{ blurhash: "LGF5]+Yk^6#M@-5c,1J5@[or[Q6." }}
          transition={200}
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

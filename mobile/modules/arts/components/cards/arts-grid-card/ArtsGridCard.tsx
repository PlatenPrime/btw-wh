import { useState } from "react";
import { useTheme } from "@/providers/theme-provider";
import { useRouter } from "expo-router";
import type { ArtDto } from "@/modules/arts/api/types/dto";
import { getSmallImageUrl } from "@/modules/arts/constants/art-image-url";
import { ArtsGridCardView } from "./ArtsGridCardView";
import { SemanticColors } from "@/constants/theme";

interface GridCardProps {
  art: ArtDto;
}

export function ArtsGridCard({ art }: GridCardProps) {
  const router = useRouter();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const { resolvedTheme } = useTheme();
  const theme = resolvedTheme === "dark" ? "dark" : "light";
  const imageUrl = getSmallImageUrl(art.artikul);
  const bgColor = theme === "light" ? SemanticColors.card.bg.light : SemanticColors.card.bg.dark;
  const borderColor = theme === "light" ? SemanticColors.card.border.light : SemanticColors.card.border.dark;

  const nameukr =
    art.nameukr.length > 50 ? art.nameukr.slice(10, 47) + "..." : art.nameukr.slice(10);

  const handlePress = () => {
    router.push(`/(tabs)/arts/${art.artikul}` as any);
  };

  const handleImagePress = () => {
    setIsModalVisible(true);
  };

  const handleCloseModal = () => {
    setIsModalVisible(false);
  };

  return (
    <ArtsGridCardView
      artikul={art.artikul}
      nameukr={nameukr}
      onPress={handlePress}
      imageUrl={imageUrl}
      bgColor={bgColor}
      borderColor={borderColor}
      isModalVisible={isModalVisible}
      onImagePress={handleImagePress}
      onCloseModal={handleCloseModal}
    />
  );
}

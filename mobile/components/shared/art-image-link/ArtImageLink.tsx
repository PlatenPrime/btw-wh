import { ArtImageModal } from "@/components/shared/art-image-modal/ArtImageModal";
import type { ArtDto } from "@/modules/arts/api/types/dto";
import { getSmallImageUrl } from "@/modules/arts/constants/art-image-url";
import { useRouter } from "expo-router";
import { useState } from "react";
import { ArtImageLinkView } from "./ArtImageLInkView";

interface ArtImageLinkProps {
  artikul: ArtDto["artikul"];
  nameukr?: ArtDto["nameukr"];
  link?: string;
  onPress?: () => void;
}

export function ArtImageLink({
  artikul,
  nameukr,
  link,
  onPress,
}: ArtImageLinkProps) {
  const router = useRouter();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const imageUrl = getSmallImageUrl(artikul);

  const handleImagePress = () => {
    setIsModalVisible(true);
  };

  const handleCloseModal = () => {
    setIsModalVisible(false);
  };

  const isTextTouchable = !!(link || onPress);

  const handleTextPress = () => {
    if (link) {
      router.push(link as any);
    } else if (onPress) {
      onPress();
    }
  };

  return (
    <>
      <ArtImageLinkView
        artikul={artikul}
        nameukr={nameukr || "..."}
        imageUrl={imageUrl}
        isTextTouchable={isTextTouchable}
        onImagePress={handleImagePress}
        onTextPress={handleTextPress}
      />

      <ArtImageModal
        artikul={artikul}
        visible={isModalVisible}
        onClose={handleCloseModal}
      />
    </>
  );
}

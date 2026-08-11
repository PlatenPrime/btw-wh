import { ArtImageModal } from "@/components/shared/art-image-modal/ArtImageModal";
import type { ArtDto } from "@/modules/arts/api/types/dto";
import { useRouter } from "expo-router";
import { useState } from "react";
import { ArtsGridCardView } from "./ArtsGridCardView";

interface GridCardProps {
  art: ArtDto;
}

export function ArtsGridCard({ art }: GridCardProps) {
  const router = useRouter();
  const [isModalVisible, setIsModalVisible] = useState(false);

  const nameukr =
    art.nameukr.length > 50
      ? art.nameukr.slice(10, 47) + "..."
      : art.nameukr.slice(10);

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
      isModalVisible={isModalVisible}
      onImagePress={handleImagePress}
      onCloseModal={handleCloseModal}
    />
  );
}

import type { GetPullByPalletIdResponse, IPull } from "@/modules/pulls/api/types/dto";
import { PullCardView } from "./PullCardView";
import { useNavigate } from "react-router";
import { useQueryClient } from "@tanstack/react-query";

interface PullCardProps {
  pull: IPull;
}

export function PullCard({ pull }: PullCardProps) {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const handleClick = () => {
    // Предзаполняем кеш для мгновенного отображения на странице pull
    const cachedResponse: GetPullByPalletIdResponse = {
      success: true,
      exists: true,
      message: "Pull retrieved from cache",
      data: pull,
    };
    
    queryClient.setQueryData(["pulls", pull.palletId], cachedResponse);
    navigate(`/wh/pulls/${pull.palletId}`);
  };

  return <PullCardView pull={pull} onClick={handleClick} />;
}


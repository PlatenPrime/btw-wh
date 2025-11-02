import type { IPull } from "@/modules/pulls/api/types/dto";
import { PullCardView } from "./PullCardView";
import { useNavigate } from "react-router";

interface PullCardProps {
  pull: IPull;
}

export function PullCard({ pull }: PullCardProps) {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/wh/pulls/${pull.palletId}`);
  };

  return <PullCardView pull={pull} onClick={handleClick} />;
}


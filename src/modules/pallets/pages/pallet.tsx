import { Button } from "@/components/ui/button";

import { useNavigate, useParams } from "react-router";

export default function PalletPage() {
  const { palletId } = useParams<{ palletId: string }>();
  const navigate = useNavigate();

  if (!palletId) {
    return <div className="text-destructive">Не вказано palletId</div>;
  }

  return (
    <div className="mx-auto max-w-4xl p-4">
      <Button
        variant="outline"
        size="sm"
        className="mb-4"
        onClick={() => navigate(-1)}
      >
        &larr; Назад
      </Button>
    </div>
  );
}

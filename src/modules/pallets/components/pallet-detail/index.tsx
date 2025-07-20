import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useAllPalletsQuery } from "@/modules/pallets/api/useAllPalletsQuery";
import { PosList } from "@/modules/poses/components/pos-list";
import { useState } from "react";
import { useDeletePalletPosesMutation } from "../../api/useDeletePalletPosesMutation";
import { useMovePalletPosesMutation } from "../../api/useMovePalletPosesMutation";
import { usePalletByIdQuery } from "../../api/usePalletByIdQuery";

interface PalletDetailProps {
  palletId: string;
  onBack?: () => void;
}

export function PalletDetail({ palletId, onBack }: PalletDetailProps) {
  const { data: pallet, isLoading, error } = usePalletByIdQuery(palletId);
  const [moveOpen, setMoveOpen] = useState(false);
  const [toPalletId, setToPalletId] = useState("");
  const deleteMutation = useDeletePalletPosesMutation(palletId);
  const { data: allPallets } = useAllPalletsQuery();
  const moveMutation = useMovePalletPosesMutation(palletId, toPalletId);

  const palletOptions = (allPallets || [])
    .filter((p) => p._id !== palletId && p.row === pallet?.row)
    .map((p) => ({ value: p._id, label: p.title }));

  const handleDeleteAll = async () => {
    await deleteMutation.mutateAsync();
  };
  const handleMoveAll = async () => {
    if (!toPalletId || !pallet?.poses.length) return;
    await moveMutation.mutateAsync(pallet.poses);
    setMoveOpen(false);
    setToPalletId("");
  };

  if (isLoading)
    return <div className="text-muted-foreground">Завантаження паллети...</div>;
  if (error)
    return <div className="text-destructive">Помилка завантаження паллети</div>;
  if (!pallet)
    return <div className="text-muted-foreground">Паллету не знайдено</div>;

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2">
            {onBack && (
              <Button size="sm" variant="outline" onClick={onBack}>
                &larr; Назад
              </Button>
            )}
            <span>{pallet.title}</span>
            {pallet.sector && (
              <span className="text-muted-foreground bg-muted rounded px-2 py-0.5 text-xs">
                {pallet.sector}
              </span>
            )}
          </CardTitle>
          <div className="flex items-center gap-2">
            <div className="text-muted-foreground text-xs">
              Ряд: {pallet.rowData?.title}
            </div>
          </div>
        </div>
        <div className="text-muted-foreground mt-1 text-xs">
          Додано:{" "}
          {pallet.createdAt
            ? new Date(pallet.createdAt).toLocaleDateString()
            : "—"}
        </div>
      </CardHeader>
      <CardContent>
        <div className="mb-4 flex gap-2">
          <Button
            variant="destructive"
            size="sm"
            onClick={handleDeleteAll}
            disabled={deleteMutation.isPending || !pallet?.poses.length}
          >
            Очистити паллету
          </Button>
          <Button
            variant="secondary"
            size="sm"
            onClick={() => setMoveOpen(true)}
            disabled={!palletOptions.length || !pallet?.poses.length}
          >
            Перемістити всі позиції
          </Button>
        </div>
        <PosList
          palletId={pallet._id}
          rowId={pallet.row}
          onSuccess={() => {}}
        />
        <Dialog open={moveOpen} onOpenChange={setMoveOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Перемістити всі позиції</DialogTitle>
            </DialogHeader>
            <div className="mb-4">
              <label className="mb-1 block text-sm font-medium">
                Виберіть цільову паллету
              </label>
              <select
                value={toPalletId}
                onChange={(e) => setToPalletId(e.target.value)}
                className="w-full rounded border p-2"
              >
                <option value="" disabled>
                  Оберіть паллету...
                </option>
                {palletOptions.map((opt) => (
                  <option key={opt.value} value={opt.value}>
                    {opt.label}
                  </option>
                ))}
              </select>
            </div>
            <Button
              onClick={handleMoveAll}
              disabled={!toPalletId || moveMutation.isPending}
            >
              Перемістити
            </Button>
          </DialogContent>
        </Dialog>
      </CardContent>
    </Card>
  );
}

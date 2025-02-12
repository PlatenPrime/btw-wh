import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { ArtImage } from "@/modules/arts/components/image";
import { ScanSearch } from "lucide-react";

interface ZoomArtImageButtonProps {
  artikul: string;
}

export function ZoomArtImageButton({ artikul }: ZoomArtImageButtonProps) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">
          <ScanSearch />
          {"Переглянути"}
        </Button>
      </DialogTrigger>

      <DialogContent className="w-full ">
        <DialogHeader>
          <DialogTitle>Артикул {artikul}</DialogTitle>
        </DialogHeader>

        <ArtImage artikul={artikul} />
      </DialogContent>
    </Dialog>
  );
}

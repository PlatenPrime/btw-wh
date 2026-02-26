import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import type { EnrichedAnalogDto } from "@/modules/analogs/api/types";
import { EntityLabel } from "@/modules/analogs/components/entity-label";
import { ArtDialogImage } from "@/modules/arts/components/dialogs/art-dialog-image/ArtDialogImage";
import { ExternalLink } from "lucide-react";

interface AnalogDetailsCardViewProps {
  analog: EnrichedAnalogDto;
}

function MetadataItem({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div className="grid gap-1">
      <span className="text-muted-foreground text-sm">{label}</span>
      {children}
    </div>
  );
}

export function AnalogDetailsCardView({ analog }: AnalogDetailsCardViewProps) {
  const displayName = analog.nameukr ?? analog.title;

  return (
    <Card className="border-l-primary gap-0 overflow-hidden border-l-4 p-0 shadow-md">
      <CardHeader className="flex flex-col gap-6 p-6 pb-4 md:flex-row md:items-start">
        <div className="flex shrink-0 flex-col gap-2 md:w-[clamp(8rem,28%,12rem)]">
          <ArtDialogImage artikul={analog.artikul || ""} />
        </div>
        <div className="flex min-w-0 flex-1 flex-col gap-3">
          {displayName && (
            <h2 className="text-lg font-semibold tracking-tight">
              {displayName}
            </h2>
          )}
        </div>
      </CardHeader>

      <Separator />

      <CardContent className="grid gap-4 p-6">
        {analog.url && (
          <MetadataItem label="Посилання">
            <a
              href={analog.url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary inline-flex items-center gap-1.5 text-sm hover:underline"
            >
              <ExternalLink className="size-4 shrink-0" />
              Відкрити на сайті
            </a>
          </MetadataItem>
        )}
      </CardContent>

      <>
        <Separator />
        <CardFooter className="text-muted-foreground flex flex-wrap gap-x-6 gap-y-1 border-t-0 p-6 pt-4">
          <div className="grid gap-1.5">
            <EntityLabel
              imageUrl={analog.konk?.imageUrl}
              title={analog.konk?.title}
              fallbackLabel={analog.konkName}
              imageSize="sm"
            />
            <EntityLabel
              imageUrl={analog.prod?.imageUrl}
              title={analog.prod?.title}
              fallbackLabel={analog.prodName}
              imageSize="sm"
            />
          </div>
        </CardFooter>
      </>
    </Card>
  );
}

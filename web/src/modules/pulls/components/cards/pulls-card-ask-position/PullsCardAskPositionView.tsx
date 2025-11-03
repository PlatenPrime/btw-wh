import { Card, CardContent } from "@/components/ui/card";
import type { IPull } from "@/modules/pulls/api/types/dto";
import { ArtDialogImage } from "@/modules/arts/components/dialogs/art-dialog-image/ArtDialogImage";
import { UserAvatarName } from "@/components/shared/user/UserAvatarName";

interface PullsCardAskPositionViewProps {
  pull: IPull;
}

export function PullsCardAskPositionView({ pull }: PullsCardAskPositionViewProps) {
  if (pull.positions.length === 0) {
    return null;
  }

  return (
    <div className="grid gap-2">
      {pull.positions.map((position) => (
        <Card key={position.posId} className="border">
          <CardContent className="pt-4">
            <div className="flex items-start gap-3">
              <ArtDialogImage artikul={position.artikul} />
              <div className="flex-1 min-w-0">
                <div className="flex flex-col gap-2">
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-semibold">{position.artikul}</span>
                    {position.requestedQuant > 0 && (
                      <span className="text-sm text-muted-foreground">
                        Запитано: <strong className="text-foreground">{position.requestedQuant} шт.</strong>
                      </span>
                    )}
                  </div>
                  {position.nameukr && (
                    <p className="text-xs text-muted-foreground truncate">
                      {position.nameukr}
                    </p>
                  )}
                  <UserAvatarName
                    photoUrl={position.askerData.photo}
                    fullname={position.askerData.fullname}
                    size="xs"
                    className="mt-1"
                  />
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}


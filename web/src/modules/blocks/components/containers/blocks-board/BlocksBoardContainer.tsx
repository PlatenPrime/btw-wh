import { useEffect, useMemo, useState, useCallback } from "react";
import { toast } from "sonner";
import { BlocksBoardView } from "@/modules/blocks/components/containers/blocks-board/BlocksBoardView";
import type { BlockDto } from "@/modules/blocks/api/types";
import type { DraftBlock } from "@/modules/blocks/components/containers/blocks-board/types";
import { arrayMove } from "@dnd-kit/sortable";
import { updateBlock } from "@/modules/blocks/api/services/mutations/updateBlock";
import { useQueryClient } from "@tanstack/react-query";

const normalizeBlocks = (blocks: BlockDto[]): DraftBlock[] =>
  [...blocks]
    .sort((a, b) => a.order - b.order)
    .map((block, blockIndex) => ({
      ...block,
      order: blockIndex,
      zones: [...(block.zones ?? [])]
        .sort((a, b) => (a.order ?? 0) - (b.order ?? 0))
        .map((zone, zoneIndex) => ({
          ...zone,
          order: zoneIndex,
        })),
    }));

const syncZoneOrders = (zones: DraftBlock["zones"]) =>
  zones.map((zone, zoneIndex) => ({
    ...zone,
    order: zoneIndex,
  }));

const syncOrders = (blocks: DraftBlock[]): DraftBlock[] =>
  blocks.map((block, blockIndex) => ({
    ...block,
    order: blockIndex,
    zones: syncZoneOrders(block.zones),
  }));

const hasStructureChanges = (
  draft: DraftBlock[],
  source: DraftBlock[],
): boolean => {
  if (draft.length !== source.length) {
    return true;
  }

  return draft.some((block, index) => {
    const original = source[index];
    if (!original) return true;
    if (block._id !== original._id) return true;

    if (block.zones.length !== original.zones.length) {
      return true;
    }

    return block.zones.some(
      (zone, zoneIndex) => zone._id !== original.zones[zoneIndex]?._id,
    );
  });
};

interface BlocksBoardContainerProps {
  blocks: BlockDto[];
  isEditMode: boolean;
  allowBlockReorder?: boolean;
  onRegisterSubmitHandler: (handler: () => void) => void;
  onChangesStateChange?: (hasChanges: boolean) => void;
  onSubmitSuccess?: () => void;
}

export function BlocksBoardContainer({
  blocks,
  isEditMode,
  allowBlockReorder = true,
  onRegisterSubmitHandler,
  onChangesStateChange,
  onSubmitSuccess,
}: BlocksBoardContainerProps) {
  const queryClient = useQueryClient();
  const normalizedSource = useMemo(() => normalizeBlocks(blocks), [blocks]);
  const [draftBlocks, setDraftBlocks] = useState<DraftBlock[]>(
    normalizedSource,
  );
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (!isEditMode) {
      setDraftBlocks(normalizedSource);
    }
  }, [normalizedSource, isEditMode]);

  const hasChanges = useMemo(
    () => hasStructureChanges(draftBlocks, normalizedSource),
    [draftBlocks, normalizedSource],
  );

  useEffect(() => {
    onChangesStateChange?.(isEditMode && hasChanges);
  }, [hasChanges, isEditMode, onChangesStateChange]);

  const handleBlockReorder = useCallback(
    (activeId: string, overId: string) => {
      if (!isEditMode || isSubmitting) return;

      setDraftBlocks((prev) => {
        const activeIndex = prev.findIndex((block) => block._id === activeId);
        const overIndex = prev.findIndex((block) => block._id === overId);
        if (activeIndex === -1 || overIndex === -1) {
          return prev;
        }

        const next = syncOrders(arrayMove(prev, activeIndex, overIndex));
        onChangesStateChange?.(
          isEditMode && hasStructureChanges(next, normalizedSource),
        );
        return next;
      });
    },
    [
      isEditMode,
      isSubmitting,
      normalizedSource,
      onChangesStateChange,
    ],
  );

  const handleZoneReorder = useCallback(
    (blockId: string, activeZoneId: string, overZoneId: string) => {
      if (!isEditMode || isSubmitting) return;

      setDraftBlocks((prev) => {
        let changed = false;
        const next = prev.map((block) => {
          if (block._id !== blockId) return block;

          const activeIndex = block.zones.findIndex(
            (zone) => zone._id === activeZoneId,
          );
          const overIndex = block.zones.findIndex(
            (zone) => zone._id === overZoneId,
          );

          if (activeIndex === -1 || overIndex === -1) {
            return block;
          }

          changed = true;
          const nextZones = syncZoneOrders(
            arrayMove(block.zones, activeIndex, overIndex),
          );

          return { ...block, zones: nextZones };
        });

        if (!changed) {
          return prev;
        }

        onChangesStateChange?.(
          isEditMode && hasStructureChanges(next, normalizedSource),
        );

        return next;
      });
    },
    [
      isEditMode,
      isSubmitting,
      normalizedSource,
      onChangesStateChange,
    ],
  );

  const buildUpdates = useCallback(
    () =>
      draftBlocks.map((block, index) => ({
        blockId: block._id,
        payload: {
          order: index,
          zones: block.zones.map((zone, zoneIndex) => ({
            zoneId: zone._id,
            order: zoneIndex,
          })),
        },
      })),
    [draftBlocks],
  );

  const handleSubmit = useCallback(async () => {
    if (isSubmitting) return;

    if (!hasChanges) {
      toast.info("Зміни відсутні");
      onSubmitSuccess?.();
      return;
    }

    const updates = buildUpdates();
    setIsSubmitting(true);

    try {
      for (const update of updates) {
        await updateBlock(update.blockId, update.payload);
      }

      toast.success("Порядок успішно збережено");
      onSubmitSuccess?.();

      await Promise.all([
        queryClient.invalidateQueries({ queryKey: ["blocks"] }),
        queryClient.invalidateQueries({ queryKey: ["zones"] }),
        ...updates.map(({ blockId }) =>
          queryClient.invalidateQueries({ queryKey: ["blocks", blockId] }),
        ),
      ]);
    } catch (error) {
      if (error instanceof Error) {
        toast.error(error.message);
      } else {
        toast.error("Не вдалося зберегти порядок блоків");
      }
    } finally {
      setIsSubmitting(false);
    }
  }, [
    buildUpdates,
    hasChanges,
    isSubmitting,
    onSubmitSuccess,
    queryClient,
  ]);

  useEffect(() => {
    onRegisterSubmitHandler(() => {
      void handleSubmit();
    });
  }, [handleSubmit, onRegisterSubmitHandler]);

  return (
    <BlocksBoardView
      blocks={draftBlocks}
      isEditMode={isEditMode}
      allowBlockReorder={allowBlockReorder}
      onBlockReorder={handleBlockReorder}
      onZoneReorder={handleZoneReorder}
    />
  );
}


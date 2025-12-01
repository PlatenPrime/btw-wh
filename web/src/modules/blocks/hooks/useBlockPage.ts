import { useState, useRef, useCallback } from "react";
import type { SegmentDto } from "@/modules/blocks/api/types";

interface UseBlockPageReturn {
  isEditMode: boolean;
  isSaving: boolean;
  createSegmentDialogOpen: boolean;
  deleteSegmentDialogOpen: boolean;
  selectedSegment: SegmentDto | null;
  setIsEditMode: (value: boolean) => void;
  setCreateSegmentDialogOpen: (value: boolean) => void;
  setDeleteSegmentDialogOpen: (value: boolean) => void;
  setSelectedSegment: (segment: SegmentDto | null) => void;
  handleSave: () => Promise<void>;
  handleCancel: () => void;
  handleSaveReady: (onSave: () => Promise<void>, onCancel: () => void) => void;
  handleDelete: (segment: SegmentDto) => void;
}

export function useBlockPage(): UseBlockPageReturn {
  const [createSegmentDialogOpen, setCreateSegmentDialogOpen] = useState(false);
  const [deleteSegmentDialogOpen, setDeleteSegmentDialogOpen] = useState(false);
  const [selectedSegment, setSelectedSegment] = useState<SegmentDto | null>(null);
  const [isEditMode, setIsEditMode] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const saveHandlerRef = useRef<(() => Promise<void>) | null>(null);
  const cancelHandlerRef = useRef<(() => void) | null>(null);

  const handleSave = useCallback(async () => {
    if (saveHandlerRef.current) {
      setIsSaving(true);
      try {
        await saveHandlerRef.current();
      } finally {
        setIsSaving(false);
      }
    }
  }, []);

  const handleCancel = useCallback(() => {
    if (cancelHandlerRef.current) {
      cancelHandlerRef.current();
    }
  }, []);

  const handleSaveReady = useCallback(
    (onSave: () => Promise<void>, onCancel: () => void) => {
      saveHandlerRef.current = onSave;
      cancelHandlerRef.current = onCancel;
    },
    []
  );

  const handleDelete = useCallback((segment: SegmentDto) => {
    setSelectedSegment(segment);
    setDeleteSegmentDialogOpen(true);
  }, []);

  return {
    isEditMode,
    isSaving,
    createSegmentDialogOpen,
    deleteSegmentDialogOpen,
    selectedSegment,
    setIsEditMode,
    setCreateSegmentDialogOpen,
    setDeleteSegmentDialogOpen,
    setSelectedSegment,
    handleSave,
    handleCancel,
    handleSaveReady,
    handleDelete,
  };
}


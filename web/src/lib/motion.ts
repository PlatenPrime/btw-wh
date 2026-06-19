export const motion = {
  revealBlock:
    "animate-in fade-in-0 slide-in-from-bottom-2 duration-400 fill-mode-both motion-reduce:animate-none",
  revealItem:
    "animate-in fade-in-0 slide-in-from-bottom-1 duration-350 fill-mode-both motion-reduce:animate-none",
} as const;

export const STAGGER_STEP_MS = 50;
export const STAGGER_MAX_ITEMS = 12;
export const STAGGER_CAP_MS = STAGGER_STEP_MS * STAGGER_MAX_ITEMS;

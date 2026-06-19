export const typography = {
  pageTitle: "text-lg font-semibold tracking-tight",
  pageDescription: "text-sm text-muted-foreground",
  sectionTitle: "text-base font-semibold leading-tight",
  sectionLabel:
    "text-xs font-semibold uppercase tracking-wider text-muted-foreground",
  gridTitle: "text-sm font-semibold leading-snug",
  gridSubtitle: "text-xs text-muted-foreground",
  listTitleCompact: "text-sm font-semibold truncate",
  listSubtitle: "text-xs text-muted-foreground truncate",
  listTitleEmphasized: "text-base font-semibold tracking-tight",
  listSubtitleEmphasized: "text-sm text-muted-foreground leading-snug",
  detailTitle: "text-base font-semibold leading-tight",
  detailSubtitle: "text-sm text-muted-foreground",
  body: "text-sm",
  caption: "text-xs text-muted-foreground",
  label: "text-xs text-muted-foreground leading-none",
  value: "text-sm font-medium leading-snug text-foreground",
  formLabel: "text-sm font-medium leading-tight",
  formHint: "text-xs text-muted-foreground leading-snug",
  formError: "text-destructive text-sm font-medium leading-5",
} as const;

export const iconSize = {
  inline: "size-3.5 shrink-0",
  ui: "size-4 shrink-0",
  avatarList: "size-12 shrink-0",
  avatarGrid: "size-14 shrink-0",
} as const;

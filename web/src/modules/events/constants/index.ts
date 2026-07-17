export const EVENT_DEPARTMENTS = [
  "analog-slices",
  "analogs",
  "arts",
  "asks",
  "auth",
  "blocks",
  "btrade-slices",
  "constants",
  "defs",
  "dels",
  "kasks",
  "konks",
  "pallet-groups",
  "pallets",
  "poses",
  "prods",
  "rows",
  "segs",
  "sku-slices",
  "skugrs",
  "skus",
  "slices",
  "variants",
  "zones",
] as const;

export type EventDepartment = (typeof EVENT_DEPARTMENTS)[number];

export const EVENT_TYPES = ["create", "edit", "delete", "other"] as const;

export const EVENTS_LIMIT_OPTIONS = [20, 50, 100] as const;

export const EVENTS_DEFAULT_LIMIT = 100;

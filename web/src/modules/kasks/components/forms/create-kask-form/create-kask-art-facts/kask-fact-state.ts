export type KaskFactState =
  | { kind: "empty" }
  | { kind: "loading" }
  | { kind: "value"; text: string };

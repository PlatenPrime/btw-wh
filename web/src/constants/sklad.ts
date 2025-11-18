export interface ISklads {
  pogrebi: string;
  merezhi: string;
}

export type SkladCode = keyof ISklads;

export const sklads: ISklads = {
  pogrebi: "Погреби",
  merezhi: "Мережі",
};

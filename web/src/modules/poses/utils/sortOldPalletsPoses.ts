import type { IPos } from "../api/types";

export const sortOldPalletsPoses = (oldPoses: IPos[]) => {
  return oldPoses.sort((a, b) =>
    a.artikul.localeCompare(b.artikul),
  );
};

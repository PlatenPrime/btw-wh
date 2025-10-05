import type { IPos } from "../api/types";

export const sortNewPalletPoses = (newPoses: IPos[], newPosIds: string[]) => {
  return newPoses.sort((a, b) => {
    const aIndex = newPosIds.indexOf(a._id);
    const bIndex = newPosIds.indexOf(b._id);
    return bIndex - aIndex;
  });
};

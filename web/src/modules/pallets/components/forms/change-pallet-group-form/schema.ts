import { z } from "zod";

export const changePalletGroupSchema = z.object({
  groupId: z.string().min(1, "Оберіть палетну групу"),
});

export type ChangePalletGroupFormValues = z.infer<
  typeof changePalletGroupSchema
>;

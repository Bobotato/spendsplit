import { z } from "zod";

const AddMemberSchema = z.object({
  name: z.string().min(1, { message: "Member name is required" }),
});

export { AddMemberSchema };

export type AddMemberSchema = z.infer<typeof AddMemberSchema>;

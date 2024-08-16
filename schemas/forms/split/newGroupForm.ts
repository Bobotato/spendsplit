import { z } from "zod";

const NewGroupSchema = z.object({
  groupName: z.string().min(1, { message: "Group name is required" }),
  groupDesc: z.string().min(1, { message: "A short description is required" }),
});

export { NewGroupSchema };

export type NewGroupSchema = z.infer<typeof NewGroupSchema>;
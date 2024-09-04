import { z } from "zod";

const LoginSchema = z.object({
  username: z
    .string()
    .min(1, { message: "Username is required" }),
  password: z.string().min(1, { message: "Password is required" }),
});


export { LoginSchema, RegisterSchema };

export type LoginSchema = z.infer<typeof LoginSchema>;

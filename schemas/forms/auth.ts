import { z } from "zod";

const LoginSchema = z.object({
  email: z
    .string()
    .email({ message: "Enter a valid email format" })
    .min(1, { message: "Email is required" }),
  password: z.string().min(1, { message: "Password is required" }),
});

export { LoginSchema };

export type LoginSchema = z.infer<typeof LoginSchema>;
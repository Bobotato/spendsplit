import { z } from "zod";

const LoginSchema = z.object({
  email: z
    .string()
    .email({ message: "Enter a valid email format" })
    .min(1, { message: "Email is required" }),
  password: z.string().min(1, { message: "Password is required" }),
});

const RegisterSchema = z
  .object({
    email: z
      .string()
      .email({ message: "Enter a valid email format" })
      .min(1, { message: "Email is required" }),
    password: z.string().min(1, { message: "Password is required" }),
    passwordConfirm: z
      .string()
      .min(1, { message: "Please confirm your password" }),
  })
  .refine((data) => data.password === data.passwordConfirm, {
    message: "Passwords don't match",
    path: ["passwordConfirm"],
  });

export { LoginSchema, RegisterSchema };

export type LoginSchema = z.infer<typeof LoginSchema>;
export type RegisterSchema = z.infer<typeof RegisterSchema>;

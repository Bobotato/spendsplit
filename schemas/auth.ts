import { z } from "zod";

const RegisterResponseSchema = z.object({
  access_token: z.string(),
});

const LoginResponseSchema = z.object({
  access_token: z.string(),
});

export { LoginResponseSchema, RegisterResponseSchema };

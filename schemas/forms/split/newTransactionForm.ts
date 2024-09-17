import { z } from "zod";

const AddTransactionSchema = z.object({
  transactionItem: z
    .string()
    .min(1, { message: "A name for this transaction is required." }),
  transactionDesc: z
    .string()
    .optional(),
  transactionAmount: z
    .number({ message: "Only numbers are accepted for amounts." })
    .min(1, { message: "An amount for this transaction is required." }),
  transactionDate: z
    .number()
    .min(1, { message: "A date for this transaction is required." }),
});

export { AddTransactionSchema };

export type AddTransactionSchema = z.infer<typeof AddTransactionSchema>;

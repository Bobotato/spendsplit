import { z } from "zod";

const AddTransactionSchema = z.object({
  transactionItem: z
    .string()
    .min(1, { message: "A name for this transaction is required." }),
  transactionDesc: z.string().optional(),
  transactionAmount: z
    .number()
    .min(0, { message: "Transaction must be more than $0." }),
  transactionDate: z
    .number({
      required_error: "Date is required",
      invalid_type_error: "Invalid date format",
    })
    .int()
    .min(0, { message: "Invalid date" }),
  // .min(1, { message: "A date for this transaction is required." }),
});

export { AddTransactionSchema };

export type AddTransactionSchema = z.infer<typeof AddTransactionSchema>;

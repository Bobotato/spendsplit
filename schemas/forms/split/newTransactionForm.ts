import { z } from "zod";

const AddTransactionSchema = z.object({
  transactionItem: z
    .string()
    .min(1, { message: "A name for this transaction is required." }),
  transactionDesc: z.string().optional(),
  transactionAmount: z
    .number({
      message:
        "Amounts must be in numbers, in the format '10.00', without the currency symbol.",
    })
    .min(0.009, { message: "Transaction must be more than $0." })
    .max(999999999999999, {
      message: "Please split large transactions into multiple smaller ones.",
    })
    .multipleOf(0.01, {
      message: "Amounts must be in numbers, in the format '10.00'.",
    })
    .refine(
      (value) => {
        const decimalPlaces = value.toString().split(".")[1]?.length || 0;
        console.log(decimalPlaces)
        return decimalPlaces <= 2;
      },
      {
        message: "Amounts must be in numbers, in the format '10.00'.",
      }
    ),
  transactionDate: z
    .number({
      required_error: "Date is required",
      invalid_type_error: "Invalid date format",
    })
    .int()
    .min(0, { message: "Invalid date" }),
});

export { AddTransactionSchema };

export type AddTransactionSchema = z.infer<typeof AddTransactionSchema>;

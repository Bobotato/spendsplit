import { Stack, Typography } from "@mui/material";

import type { Transaction } from "@/app/types/TransactionTypes";

interface TransactionItemProps {
  transactionItem: Transaction;
}

export default function TransactionItem({
  transactionItem,
}: TransactionItemProps) {
  return (
    <Stack direction="row" spacing={2}>
        <Typography color="textPrimary">{transactionItem.addedBy}</Typography>
      <Typography color="textPrimary">{transactionItem.name}</Typography>
      <Typography color="textPrimary">${transactionItem.amount}</Typography>
    </Stack>
  );
}

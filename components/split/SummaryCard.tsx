import { Transaction } from "@/types/TransactionTypes";
import Card from "@mui/material/Card";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";

import {
  deriveLargestTransaction,
  deriveTotalFromTransactions,
} from "@/utils/split";

interface SummaryProps {
  transactionList: Transaction[];
}

export default function Summary({ transactionList }: SummaryProps) {
  const total = deriveTotalFromTransactions(transactionList);
  const largestTransaction = deriveLargestTransaction(transactionList);

  return (
    <Card
      color="primary.main"
      sx={{ border: 2, borderColor: "primary.main", borderRadius: 2, p: 4 }}
    >
      <Stack direction="column" spacing={2}>
        <Typography variant="h4" color="primary" sx={{ fontWeight: "bold" }}>
          At a glance:
        </Typography>
        <Typography variant="body1">
          Your group has spent:{" "}
          <Typography
            variant="body1"
            component="span"
            sx={{ fontWeight: "bold" }}
          >
            ${total}
          </Typography>
        </Typography>
        <Typography variant="body1">
          The biggest expense is: ${largestTransaction.amount} by{" "}
          <Typography
            variant="body1"
            component="span"
            sx={{ fontWeight: "bold" }}
          >
            {largestTransaction.addedBy}
          </Typography>{" "}
          on{" "}
          <Typography
            variant="body1"
            component="span"
            sx={{ fontWeight: "bold" }}
          >
            {largestTransaction.name}.
          </Typography>
        </Typography>
      </Stack>
    </Card>
  );
}

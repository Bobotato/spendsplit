import { Transaction } from "@/types/TransactionTypes";
import Card from "@mui/material/Card";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";

import {
  deriveEqualSplit,
  deriveLargestTransaction,
  deriveTotalFromTransactions,
} from "@/utils/split";
import { Member } from "@/types/UserTypes";

interface SummaryProps {
  transactions: Transaction[];
  members: Member[];
}

export default function Summary({ transactions, members }: SummaryProps) {
  const total = deriveTotalFromTransactions(transactions);

  const largestTransactionSummary = () => {
    if (transactions && transactions.length > 0) {
      const largestTransaction = deriveLargestTransaction(transactions);

      return (
        <Typography variant="body1">
          The biggest expense is: ${largestTransaction.transactionAmount} on{" "}
          <Typography
            variant="body1"
            component="span"
            sx={{ fontWeight: "bold" }}
          >
            {largestTransaction.transactionItem}.
          </Typography>
        </Typography>
      );
    }
  };

  const equalSplitSummary = () => {
    if (!members || members.length <= 0) {
      return
    }
    if (transactions && transactions.length > 0) {
      const split = deriveEqualSplit(transactions, members);

      return (
        <Typography variant="body1">
          Each person owes{" "}
          <Typography
            variant="body1"
            component="span"
            sx={{ fontWeight: "bold" }}
          >
            ${split}
          </Typography>
          .
        </Typography>
      );
    }
  };

  const totalSpendSummary = () => {
    return (
      <Typography variant="body1">
        Your group has spent:{" "}
        <Typography
          variant="body1"
          component="span"
          sx={{ fontWeight: "bold" }}
        >
          ${total}.
        </Typography>
      </Typography>
    );
  };

  return (
    <Card
      color="primary.main"
      sx={{ border: 2, borderColor: "primary.main", borderRadius: 2, p: 4 }}
    >
      <Typography variant="h4" color="primary" sx={{ fontWeight: "bold", mb: 2 }}>
        At a glance:
      </Typography>
      <Stack direction="column" spacing={2}>
        {!transactions || transactions.length === 0 ? (
          <Typography variant="body1">There are currently no transactions.</Typography>
        ) : (
          <>
            {totalSpendSummary()}
            {equalSplitSummary()}
            {largestTransactionSummary()}
          </>
        )}
      </Stack>
    </Card>
  );
}

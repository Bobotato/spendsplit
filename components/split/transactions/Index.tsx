import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";

import AddTransactionForm from "@/components/split/transactions/AddTransactionForm";
import TransactionTable from "@/components/split/transactions/TransactionTable";

import type { Transaction } from "@/types/TransactionTypes";
import type { Splitter } from "@/types/UserTypes";

interface TransactionIndexProps {
  transactionList: Transaction[];
  splitterList: Splitter[];
}

export default function TransactionIndex({
  transactionList,
  splitterList,
}: TransactionIndexProps) {
  function handleAddTransaction() {
    console.log("add");
  }

  return (
    <Container>
      <Typography
        variant="h4"
        color="primary"
        sx={{ fontWeight: "bold", mb: 2 }}
      >
        Transactions:
      </Typography>
      <Stack spacing={4}>
        {!transactionList || transactionList.length === 0 ? (
          <Typography variant="body1">
            There are currently no transactions to show. Add some transactions
            using the add transaction form below.
          </Typography>
        ) : (
          <TransactionTable></TransactionTable>
        )}
        <Typography variant="body1" sx={{ fontWeight: "bold" }}>
          Add a new transaction:
        </Typography>
        <AddTransactionForm
          splitters={splitterList}
          handleAddTransaction={handleAddTransaction}
        ></AddTransactionForm>
      </Stack>
    </Container>
  );
}

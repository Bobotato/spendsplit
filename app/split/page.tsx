"use client";

import { useState } from "react";

import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";

import AppBar from "@/app/components/split/AppBar";
import TransactionTable from "@/app/components/split/transactions/TransactionTable";
import SplitterIndex from "@/app/components/split/splitters/Index";

import { transactionsTestData } from "@/app/utils/testData";

import type { Transaction } from "@/app/types/TransactionTypes";

function deriveTotalSpending(transactions: Transaction[]) {
  let totalSpent: number = 0;
  transactions.forEach((transaction) => (totalSpent += transaction.amount));
  return totalSpent;
}

export default function SplitPage() {
  const [transactionList, setTransactionList] =
    useState<Transaction[]>(transactionsTestData);

  let totalSpent = deriveTotalSpending(transactionList);

  return (
    <Box>
      <AppBar></AppBar>
      <Stack direction="column">
        <Typography>Welcome back, user.</Typography>
        <Container>
          <Typography>Your group has spent ${totalSpent}</Typography>
          <TransactionTable transactions={transactionList}></TransactionTable>
        </Container>
        <SplitterIndex></SplitterIndex>
      </Stack>
    </Box>
  );
}

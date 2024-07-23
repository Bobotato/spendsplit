"use client";

import { useState } from "react";

import {
  Box,
  Button,
  Container,
  Stack,
  Link,
  TextField,
  Typography,
} from "@mui/material";

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
    <Stack direction="column">
      <Typography>Welcome back, user.</Typography>
      <SplitterIndex></SplitterIndex>
      <Container>
        <Typography>Your group has spent ${totalSpent}</Typography>
        <TransactionTable transactions={transactionList}></TransactionTable>
      </Container>
    </Stack>
  );
}

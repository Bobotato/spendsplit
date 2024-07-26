"use client";

import { useState } from "react";

import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";

import AppBar from "@/components/split/AppBar";
import TransactionTable from "@/components/split/transactions/TransactionTable";
import SplitterIndex from "@/components/split/splitters/Index";
import SummaryCard from "@/components/split/SummaryCard";

import { transactionsTestData } from "@/utils/testData";

import type { Transaction } from "@/types/TransactionTypes";

export default function SplitPage() {
  const [transactionList, setTransactionList] =
    useState<Transaction[]>(transactionsTestData);

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <AppBar></AppBar>

      <Stack maxWidth="md" spacing={4} direction="column" sx={{ py: 4 }}>
        <Typography variant="h3">Group name here.</Typography>

        <Typography
          variant="h4"
          color="primary"
          sx={{ fontWeight: "bold", px: 4 }}
        >
          Welcome back, user.
        </Typography>
        <Container maxWidth="md">
          <SummaryCard transactionList={transactionList}></SummaryCard>
        </Container>
        <Container>
          <Typography variant="h4" color="primary" sx={{ fontWeight: "bold" }}>
            Transactions:
          </Typography>
          <TransactionTable transactions={transactionList}></TransactionTable>
        </Container>
        <Container>
          <Typography variant="h4" color="primary" sx={{ fontWeight: "bold" }}>
            Splitters:
          </Typography>
          <SplitterIndex></SplitterIndex>
        </Container>
      </Stack>
    </Box>
  );
}

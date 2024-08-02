"use client";

import { useState } from "react";
import useModal from "@/hooks/useModal";

import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";

import AppBar from "@/components/split/AppBar";
import TransactionTable from "@/components/split/transactions/TransactionTable";
import SplitterIndex from "@/components/split/splitters/Index";
import SummaryCard from "@/components/split/SummaryCard";

import { transactionsTestData } from "@/utils/testData";

import type { Transaction } from "@/types/TransactionTypes";

export default function SplitPage() {
  const [transactionList, setTransactionList] =
    useState<Transaction[]>(transactionsTestData);

  const { openModal, closeModal, ModalComponent } = useModal({
    children: (
      <>
        <DialogTitle sx={{ px: 4, pt: 4 }}>Warning</DialogTitle>
        <DialogContent sx={{ p: 4 }}>
          <Stack direction="column" spacing={3}>
            <Typography variant="body1">
              You are about to delete all transactions. This process is{" "}
              <Typography component="span" sx={{ fontWeight: "bold" }}>
                irreversible
              </Typography>
              .
            </Typography>
            <Stack
              direction="row"
              spacing={2}
              sx={{ justifyContent: "center" }}
            >
              <Button variant="contained" onClick={handleResetTransactions}>
                Acknowledge and Confirm
              </Button>
              <Button
                variant="contained"
                onClick={handleCancelResetTransactions}
              >
                Cancel
              </Button>
            </Stack>
          </Stack>
        </DialogContent>
      </>
    ),
  });

  function handleResetTransactions() {
    setTransactionList([]);
    closeModal();
  }

  function handleCancelResetTransactions() {
    closeModal();
  }

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

      <ModalComponent></ModalComponent>

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

          <Typography variant="h4" color="primary" sx={{ fontWeight: "bold" }}>
            Admin:
          </Typography>
          <Container>
            <Button type="submit" variant="contained" color={"primary"}>
              Delete Group
            </Button>
            <Button variant="contained" color={"primary"} onClick={openModal}>
              Reset Transactions
            </Button>
          </Container>
        </Container>
      </Stack>
    </Box>
  );
}

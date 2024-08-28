"use client";

import { useState, useEffect } from "react";
import { notFound } from "next/navigation";

import useModal from "@/hooks/useModal";

import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";

import AddTransactionForm from "@/components/split/transactions/AddTransactionForm";
import AppBar from "@/components/split/AppBar";
import SplitterIndex from "@/components/split/splitters/Index";
import SummaryCard from "@/components/split/dashboard/SummaryCard";
import TransactionTable from "@/components/split/transactions/TransactionTable";

import { Transaction } from "@/types/TransactionTypes";

interface GroupTransactionsProps {
  params: Params;
}

interface Params {
  groupSlug: string;
}

export default function GroupTransactions({ params }: GroupTransactionsProps) {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [splitters, setSplitters] = useState<Transaction[]>([]);

  function handleAddTransaction() {
    console.log("added");
  }

  function handleResetTransactions() {
    setTransactions([]);
    closeModal();
  }

  function handleCancelResetTransactions() {
    closeModal();
  }

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

  return (
    <Box>
      <AppBar></AppBar>
      <Typography>{params.groupSlug}</Typography>

      <Container maxWidth="md">
          <SummaryCard transactionList={transactions}></SummaryCard>
        </Container>
        <Container>
          <Typography
            variant="h4"
            color="primary"
            sx={{ fontWeight: "bold", mb: 2 }}
          >
            Transactions:
          </Typography>
          <Stack spacing={4}>
            {!transactions || transactions.length === 0 ? (
              <Typography variant="body1">
                There are currently no transactions to show. Add some
                transactions using the add transaction form below.
              </Typography>
            ) : (
              <TransactionTable
                transactions={transactions}
              ></TransactionTable>
            )}
            <Typography variant="body1" sx={{ fontWeight: "bold" }}>
              Add a new transaction:
            </Typography>
            <AddTransactionForm
              splitters={splitters}
              handleAddTransaction={handleAddTransaction}
            ></AddTransactionForm>
          </Stack>
        </Container>
        <Container>
          <Typography
            variant="h4"
            color="primary"
            sx={{ fontWeight: "bold", mb: 2 }}
          >
            Splitters:
          </Typography>
          <SplitterIndex splitterList={splitters}></SplitterIndex>
        </Container>

      <Container>
        <Typography
          variant="h4"
          color="primary"
          sx={{ fontWeight: "bold", mb: 2 }}
        >
          Admin:
        </Typography>
        <Stack
          direction="column"
          spacing={2}
          sx={{ justifyContent: "space-between" }}
        >
          <Stack
            direction="row"
            spacing={2}
            sx={{ justifyContent: "space-between" }}
          >
            <Stack direction="column">
              <Typography variant="body1" sx={{ fontWeight: "bold" }}>
                Delete Group
              </Typography>
              <Typography variant="body1">
                Delete the group, all transactions and all users permanently.
              </Typography>
            </Stack>
            <Button type="submit" variant="contained" color={"primary"}>
              Delete Group
            </Button>
          </Stack>

          <Stack
            direction="row"
            spacing={2}
            sx={{ justifyContent: "space-between" }}
          >
            <Stack direction="column">
              <Typography variant="body1" sx={{ fontWeight: "bold" }}>
                Delete Group
              </Typography>
              <Typography variant="body1">
                Delete all transactions permanently.
              </Typography>
            </Stack>
            <Button variant="contained" color={"primary"} onClick={openModal}>
              Reset Transactions
            </Button>
          </Stack>
        </Stack>
      </Container>
    </Box>
  );
}

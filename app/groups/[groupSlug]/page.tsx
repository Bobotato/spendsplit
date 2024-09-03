"use client";

import { useState, useEffect } from "react";
import { notFound, useRouter } from "next/navigation";

import useModal from "@/hooks/useModal";

import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import CircularProgress from "@mui/material/CircularProgress";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";

import AddTransactionForm from "@/components/split/transactions/AddTransactionForm";
import AddSplitterForm from "@/components/split/splitters/AddSplitterForm";
import AppBar from "@/components/split/AppBar";
import SplitterList from "@/components/split/splitters/memberList";
import SummaryCard from "@/components/split/dashboard/SummaryCard";
import TransactionTable from "@/components/split/transactions/TransactionTable";
import AdminPanel from "@/components/groups/groupAdmin";

import {
  addNewGroup,
  getGroupDataByGroupId,
  getGroupsByUserId,
} from "@/services/groups/groups";
import { getTransactionsByGroupId } from "@/services/transactions/transactions";
import { getUserDetailsFromJWT } from "@/services/user/user";
import { useUserStore } from "@/app/context/userContext";

import { Transaction } from "@/types/TransactionTypes";

import type { Group } from "@/types/GroupTypes";
import { UnauthorisedError } from "@/services/errors";
import { Member } from "@/types/UserTypes";

interface GroupTransactionsProps {
  params: Params;
}

interface Params {
  groupSlug: string;
}

export default function GroupTransactions({ params }: GroupTransactionsProps) {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [splitters, setSplitters] = useState<Member[]>([]);
  const [isLoadingSplitters, setIsLoadingSplitters] = useState<boolean>(true);

  const router = useRouter();
  const slugInt = parseInt(params.groupSlug);

  const userDetails = useUserStore((state) => state);

  useEffect(() => {
    const fetchGroupDetails = async () => {
      try {
        const data = await getGroupDataByGroupId(slugInt);
        const json = await data?.json();
        const groupDetails: Group = await json.response;
        if (groupDetails.createdById !== userDetails.userDetails.id) {
          console.log(groupDetails.createdById, userDetails.userDetails.id);
          // router.push("/home");
        }
        const splitters: Member[] = groupDetails.groupMembers;
        setSplitters(splitters);
        setIsLoadingSplitters(false);

        fetchTransactions();
      } catch (error) {
        console.log(error);
      }
    };

    const fetchTransactions = async () => {
      try {
        const data = await getTransactionsByGroupId(slugInt);
        const json = await data?.json();
        const transactions = await json.response;
        setTransactions(transactions);
      } catch (error) {
        console.log(error);
      }
    };

    fetchGroupDetails();
  }, []);

  function handleAddTransaction() {
    console.log("added");
  }

  function handleAddSplitter(splitter: string) {
    console.log("added", splitter);
  }

  function handleResetTransactions() {
    setTransactions([]);
    closeModal();
  }

  function handleCancelResetTransactions() {
    closeModal();
  }

  return (
    <Box>
      <AppBar></AppBar>
      <Typography>{slugInt}</Typography>

      <Container maxWidth="md" sx={{ py: 6 }}>
        <Stack spacing={6}>
          <Container>
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
            {/* <Stack spacing={4}>
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
            </Stack> */}
          </Container>

          <Container>
            <Typography
              variant="h4"
              color="primary"
              sx={{ fontWeight: "bold", mb: 2 }}
            >
              Splitters:
            </Typography>
            {isLoadingSplitters ? (
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Stack
                  spacing={4}
                  sx={{ p: 4, justifyContent: "center", alignItems: "center" }}
                >
                  <CircularProgress />
                  <Typography>Fetching group members...</Typography>
                </Stack>
              </Box>
            ) : (
              <SplitterList memberList={splitters}></SplitterList>
            )}

            <AddSplitterForm
              handleAddSplitter={() => handleAddSplitter()}
            ></AddSplitterForm>
          </Container>

          <Container>
            <Typography
              variant="h4"
              color="primary"
              sx={{ fontWeight: "bold", mb: 2 }}
            >
              Admin:
            </Typography>
            <AdminPanel />
            
          </Container>
        </Stack>
      </Container>
    </Box>
  );
}

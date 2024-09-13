"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

import { fetchGroupTransactions } from "@/services/transactions/transactions";
import {
  fetchGroupMembers,
  addNewGroupMember,
  deleteGroupMember
} from "@/services/members/members";
import { useUserStore } from "@/app/context/userContext";

import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import CircularProgress from "@mui/material/CircularProgress";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";

import AddTransactionForm from "@/components/split/transactions/AddTransactionForm";
import NewGroupMemberForm from "@/components/groups/NewGroupMemberForm";
import GroupMemberList from "@/components/groups/GroupMemberList";
import AppBar from "@/components/split/AppBar";
import SummaryCard from "@/components/split/dashboard/SummaryCard";
import TransactionTable from "@/components/split/transactions/TransactionTable";
import AdminPanel from "@/components/groups/GroupAdmin";

import { Transaction } from "@/types/TransactionTypes";

import type { Group } from "@/types/GroupTypes";
import type { Member } from "@/types/UserTypes";

interface GroupTransactionsProps {
  params: Params;
}

interface Params {
  groupSlug: string;
}

export default function GroupTransactions({ params }: GroupTransactionsProps) {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [groupMembers, setGroupMembers] = useState<Member[]>([]);
  const [isLoadingGroupMembers, setIsLoadingGroupMembers] =
    useState<boolean>(true);

  const router = useRouter();
  const slugInt = parseInt(params.groupSlug);

  const userDetails = useUserStore((state) => state);

  const fetchTransactions = async () => {
    try {
      const data = await fetchGroupTransactions(slugInt);
      const json = await data?.json();
      const transactions = await json.response;
      return transactions;
    } catch (error) {
      console.log(error);
    }
  };

  const fetchMembers = async () => {
    try {
      const data = await fetchGroupMembers(slugInt);
      const json = await data?.json();
      const members = await json.response;
      console.log(members)
      return members;
    } catch (error) {
      console.log(error);
    }
  };

  const fetchGroupDetails = async () => {
    try {
      const [transactions, members] = await Promise.all([
        fetchTransactions(),
        fetchMembers(),
      ]);
      console.log(transactions, members);
      setTransactions(transactions);
      setGroupMembers(members);
      setIsLoadingGroupMembers(false);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchGroupDetails();
  }, []);

  function handleAddTransaction() {
    console.log("added");
  }

  function handleAddGroupMember(member: string, groupId: number) {
    try {
      addNewGroupMember(member, groupId);
      fetchGroupDetails();
    } catch (e) {
      console.log(e);
    }
  }

  function handleDeleteGroupMember(memberId: number) {
    try {
      console.log("delete", memberId);
      deleteGroupMember(memberId)
      fetchGroupDetails();
    } catch (e) {
      console.log(e);
    }
  }

  function handleDeleteGroup() {
    console.log("Deletegroup");
    router.push("/home");
  }

  function handleResetTransactions() {
    setTransactions([]);
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
            {isLoadingGroupMembers ? (
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
              <GroupMemberList
                memberList={groupMembers}
                handleDeleteMember={handleDeleteGroupMember}
              ></GroupMemberList>
            )}

            <NewGroupMemberForm
              handleAddMember={handleAddGroupMember}
              groupId={slugInt}
            ></NewGroupMemberForm>
          </Container>

          <Container>
            <Typography
              variant="h4"
              color="primary"
              sx={{ fontWeight: "bold", mb: 2 }}
            >
              Admin:
            </Typography>
            <AdminPanel
              handleDeleteGroup={handleDeleteGroup}
              handleResetTransactions={handleResetTransactions}
            />
          </Container>
        </Stack>
      </Container>
    </Box>
  );
}

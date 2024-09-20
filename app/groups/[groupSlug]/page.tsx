"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

import { fetchGroup } from "@/services/groups/groups";
import {
  addNewTransaction,
  fetchGroupTransactions,
  purgeAllTransactions,
} from "@/services/transactions/transactions";
import {
  fetchGroupMembers,
  addNewGroupMember,
  deleteGroupMember,
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
import SpinningLoader from "@/components/general/SpinningLoader"

import { NewTransaction, Transaction } from "@/types/TransactionTypes";

import type { Group } from "@/types/GroupTypes";
import type { Member } from "@/types/UserTypes";

interface GroupTransactionsProps {
  params: Params;
}

interface Params {
  groupSlug: string;
}

export default function GroupTransactions({ params }: GroupTransactionsProps) {
  const [groupName, setGroupName] = useState<string>("");
  const [groupDesc, setGroupDesc] = useState<string>("");
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [groupMembers, setGroupMembers] = useState<Member[]>([]);
  const [isLoadingGroupMembers, setIsLoadingGroupMembers] =
    useState<boolean>(true);
  const [isLoadingTransactions, setIsLoadingTransactions] =
    useState<boolean>(true);

  const router = useRouter();
  const groupId = parseInt(params.groupSlug);

  const userDetails = useUserStore((state) => state);

  const fetchGroupDesc = async () => {
    try {
      const data = await fetchGroup(groupId);
      const json = await data?.json();
      const group = await json.response;
      return group;
    } catch (error) {
      console.log(error);
    }
  };

  const fetchTransactions = async () => {
    try {
      const data = await fetchGroupTransactions(groupId);
      const json = await data?.json();
      const transactions = await json.response;
      return transactions;
    } catch (error) {
      console.log(error);
    }
  };

  const fetchMembers = async () => {
    try {
      const data = await fetchGroupMembers(groupId);
      const json = await data?.json();
      const members = await json.response;
      console.log(members);
      return members;
    } catch (error) {
      console.log(error);
    }
  };

  const fetchGroupDetails = async () => {
    try {
      const [groupDesc, transactions, members] = await Promise.all([
        fetchGroupDesc(),
        fetchTransactions(),
        fetchMembers(),
      ]);
      setGroupName(groupDesc.groupTitle);
      setGroupDesc(groupDesc.groupDesc);
      setTransactions(transactions);
      setGroupMembers(members);
      setIsLoadingGroupMembers(false);
      setIsLoadingTransactions(false);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchGroupDetails();
  }, []);

  function handleAddGroupMember(member: string, groupId: number) {
    try {
      addNewGroupMember(member, groupId);
      fetchGroupDetails();
    } catch (e) {
      console.log(e);
    }
  }

  function handleAddTransaction(transaction: NewTransaction) {
    try {
      addNewTransaction(transaction, groupId);
      fetchGroupDetails();
    } catch (e) {
      console.error(e);
    }
  }

  function handleDeleteGroupMember(memberId: number) {
    try {
      console.log("delete", memberId);
      deleteGroupMember(memberId);
      fetchGroupDetails();
    } catch (e) {
      console.log(e);
    }
  }

  function handleDeleteGroup() {
    console.log("Deletegroup");
    router.push("/home");
  }

  function handleResetTransactions(groupId: number) {
    try {
      purgeAllTransactions(groupId);
    } catch (e) {
      console.log(e);
    }
  }

  return (
    <Box>
      <AppBar></AppBar>
      <Typography>{groupId}</Typography>

      <Container maxWidth="md" sx={{ py: 6 }}>
        <Stack spacing={6}>
          <Box>
            <Typography variant="h2" sx={{ fontWeight: "bold", mb: 2 }}>
              {groupName}
            </Typography>
            <Typography variant="body1">{groupDesc}</Typography>
          </Box>
          <Container>
            <SummaryCard transactions={transactions} members={groupMembers}></SummaryCard>
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
              {isLoadingTransactions ? (
                <SpinningLoader message="Loading your transactions..."></SpinningLoader>
              ) : !transactions || transactions.length === 0 ? (
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
                members={groupMembers}
                handleAddTransaction={handleAddTransaction}
                disabled={isLoadingGroupMembers || isLoadingTransactions}
              ></AddTransactionForm>
            </Stack>
          </Container>

          <Container>
            <Typography
              variant="h4"
              color="primary"
              sx={{ fontWeight: "bold", mb: 2 }}
            >
              Group members:
            </Typography>
            {isLoadingGroupMembers ? (
              <SpinningLoader message="Loading your group members..."></SpinningLoader>
            ) : (
              <GroupMemberList
                memberList={groupMembers}
                handleDeleteMember={handleDeleteGroupMember}
              ></GroupMemberList>
            )}

            <NewGroupMemberForm
              handleAddMember={() => handleAddGroupMember}
              groupId={groupId}
              disabled={isLoadingGroupMembers || isLoadingTransactions}
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
              handleResetTransactions={() => handleResetTransactions(groupId)}
            />
          </Container>
        </Stack>
      </Container>
    </Box>
  );
}

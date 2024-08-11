"use client";

import { SyntheticEvent, useState } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";

import Header from "@/components/split/Header";
import DashboardIndex from "@/components/split/dashboard/Index";
import SplitterIndex from "@/components/split/splitters/Index";
import TransactionsIndex from "@/components/transactions/Index";

import useModal from "@/hooks/useModal";

import { transactionsTestData } from "@/utils/testData";

import type { ReactElement, ReactNode } from "react";
import type { Splitter } from "@/types/UserTypes";
import type { Transaction } from "@/types/TransactionTypes";

interface TabPanelProps {
  children?: ReactNode;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div role="tabpanel" hidden={value !== index} {...other}>
      {value === index && (
        <Container maxWidth="md" sx={{ p: 3 }}>
          {children}
        </Container>
      )}
    </div>
  );
}

export default function SplitIndex(): ReactElement {
  const [activeTab, setActiveTab] = useState<number>(0);
  const [splitterList, setSplitterList] = useState<Splitter[]>([]);
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

  function handleTabChange(event: SyntheticEvent, value: number) {
    setActiveTab(value);
    console.log(value);
  }

  function handleResetTransactions() {
    setTransactionList([]);
    closeModal();
  }

  function handleCancelResetTransactions() {
    closeModal();
  }

  return (
    <Stack>
      <Box sx={{ p: 4 }}>
        <Header></Header>
      </Box>

      <Box sx={{ width: "100%", bgcolor: "background.paper" }}>
        <Tabs value={activeTab} onChange={handleTabChange} centered>
          <Tab label="Dashboard" />
          <Tab label="Splitters" />
          <Tab label="Transactions" />
        </Tabs>

        <TabPanel value={activeTab} index={0}>
          <DashboardIndex transactionList={transactionList}></DashboardIndex>
        </TabPanel>
        <TabPanel value={activeTab} index={1}>
          Splitters
        </TabPanel>
        <TabPanel value={activeTab} index={2}>
          Transactions
        </TabPanel>
      </Box>
    </Stack>
  );
}

import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";

import SummaryCard from "@/components/split/dashboard/SummaryCard";
import SpendingChart from "@/components/split/dashboard/SpendingChart";

import type { Transaction } from "@/types/TransactionTypes";
import type { Splitter } from "@/types/UserTypes";

interface DashboardIndexProps {
  transactionList: Transaction[];
  splitterList: Splitter[];
}

export default function DashboardIndex({
  transactionList,
  splitterList,
}: DashboardIndexProps) {
  return (
    <Box>
      <Stack spacing={2}>
        <SummaryCard transactionList={transactionList}></SummaryCard>
        <SpendingChart
          splitterList={splitterList}
          transactionList={transactionList}
        ></SpendingChart>
      </Stack>
    </Box>
  );
}

import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

import SummaryCard from "@/components/split/dashboard/SummaryCard";

import type { Transaction } from "@/types/TransactionTypes";

interface DashboardIndexProps {
  transactionList: Transaction[];
}

export default function DashboardIndex({
  transactionList,
}: DashboardIndexProps) {
  return (
    <Box>
      <Typography>Dashboard</Typography>
      <SummaryCard transactionList={transactionList}></SummaryCard>
    </Box>
  );
}

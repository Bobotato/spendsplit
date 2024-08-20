import { BarChart } from "@mui/x-charts/BarChart";
import Card from "@mui/material/Card";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";

import type { Transaction } from "@/types/TransactionTypes";
import type { Splitter } from "@/types/UserTypes";

interface SpendingChartProps {
  splitterList: Splitter[];
  transactionList: Transaction[];
}

export default function SpendingChart({
  splitterList,
  transactionList,
}: SpendingChartProps) {
  return (
    <Card
      color="primary.main"
      sx={{ border: 2, borderColor: "primary.main", borderRadius: 2, p: 4 }}
    >
      <Typography variant="h4" color="primary" sx={{ fontWeight: "bold" }}>
        Spending Breakdown:
      </Typography>
      <BarChart
        xAxis={[
          {
            id: "barCategories",
            data: ["Ted", "Hank", "Paul"],
            scaleType: "band",
          },
        ]}
        series={[
          {
            data: [20, 5, 3],
          },
        ]}
        width={800}
        height={500}
      />
    </Card>
  );
}

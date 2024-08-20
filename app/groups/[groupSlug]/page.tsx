import { notFound } from "next/navigation";

import Typography from "@mui/material/Typography";

interface GroupTransactionsProps {
  params: Params;
}

interface Params {
  groupSlug: string;
}

export default function GroupTransactions({ params }: GroupTransactionsProps) {
  try {
    const transactions = getTransactionsByGroupID(params.groupSlug);
  } catch (e) {
    notFound();
  }

  return <Typography>{params.groupSlug}</Typography>;
}

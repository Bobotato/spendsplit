import Typography from "@mui/material/Typography";

interface GroupTransactionsProps {
  params: Params;
}

interface Params {
  groupSlug: string;
}

export default function GroupTransactions({ params }: GroupTransactionsProps) {
  return <Typography>{params.groupSlug}</Typography>;
}

import { useRouter } from "next/navigation";

import Button from "@mui/material/Button";
import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";

import { convertPrismaDateToDateString } from "@/utils/helpers";

import type { Group } from "@/types/GroupTypes";

interface GroupItemProps {
  group: Group;
}

export default function GroupItem({ group }: GroupItemProps) {
  const { id, groupTitle, groupDesc, createdAt, createdBy } = group;

  const dateString = convertPrismaDateToDateString(createdAt);

  const router = useRouter();

  function handleClick() {
    router.push(`/groups/${id}`);
  }
  return (
    <Button onClick={handleClick}>
      <Paper variant="outlined" square sx={{ p: 2 }}>
        <Stack direction="row" spacing={2}>
          <Typography>{id}</Typography>
          <Typography>{groupTitle}</Typography>
          <Typography>{groupDesc}</Typography>
          <Typography>{dateString}</Typography>
          <Typography>{createdBy}</Typography>
        </Stack>
      </Paper>
    </Button>
  );
}

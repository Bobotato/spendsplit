"use client";

import * as dayjs from "dayjs";

import Button from "@mui/material/Button";
import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";

import type { Group } from "@/types/GroupTypes";

interface GroupItemProps {
  group: Group;
}

export default function GroupItem({ group }: GroupItemProps) {
  const { id, groupTitle, groupDesc, createdAt, createdBy } = group;

  function handleClick() {
    console.log(id);
  }
  return (
    <Button onClick={handleClick}>
      <Paper variant="outlined" square sx={{ p: 2 }}>
        <Stack direction="row" spacing={2}>
          <Typography>{id}</Typography>
          <Typography>{groupTitle}</Typography>
          <Typography>{groupDesc}</Typography>
          <Typography>{createdAt}</Typography>
          <Typography>{createdBy}</Typography>
        </Stack>
      </Paper>
    </Button>
  );
}

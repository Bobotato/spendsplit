import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";

import GroupItem from "@/components/groups/groupItem";

import type { Group } from "@/types/GroupTypes";

interface GroupListProps {
  groups?: Group[];
}

export default function GroupList({ groups }: GroupListProps) {
  return (
    <Stack spacing={4}>
      {!groups || groups.length === 0 ? (
        <Typography variant="body1">
          You currently have no groups, add some using the form below!
        </Typography>
      ) : (
        <Container>
          <Typography>Your Groups</Typography>
          <Stack direction="column" spacing={1}>
            {groups.map((group) => (
              <GroupItem key={group.id} group={group} />
            ))}
          </Stack>
        </Container>
      )}
    </Stack>
  );
}

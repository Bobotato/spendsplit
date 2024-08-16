import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";

interface GroupListProps {
  groups?: string[];
}

export default function GroupList({ groups }: GroupListProps) {
  return (
    <Stack spacing={4}>
      {!groups || groups.length === 0 ? (
        <Typography variant="body1">
          You currently have no groups, add some using the form below!
        </Typography>
      ) : (
        <Typography>Your groups here</Typography>
      )}
    </Stack>
  );
}

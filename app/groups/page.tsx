import AppBar from "@/components/split/AppBar";

import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";

import GroupList from "@/components/groups/groupList";
import NewGroupForm from "@/components/groups/newGroupForm";

import { ReactElement } from "react";

export default function MyGroupsPage(): ReactElement {
  return (
    <Box>
      <AppBar></AppBar>

      <Stack
        spacing={4}
        sx={{
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          mt: 12,
        }}
      >
        <Typography variant="body1">Welcome back,</Typography>
        <Typography variant="body1">username</Typography>
        <GroupList></GroupList>
        <NewGroupForm />
      </Stack>
    </Box>
  );
}

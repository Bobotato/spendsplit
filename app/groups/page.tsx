import { Suspense } from "react";

import AppBar from "@/components/split/AppBar";

import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";

import GroupList from "@/components/groups/groupList";
import NewGroupForm from "@/components/groups/newGroupForm";

import type { ReactElement } from "react";
import type { Group } from "@/types/GroupTypes";

const groupData: Group[] = [
  {
    id: 1,
    groupTitle: "test1",
    groupDesc: "test1",
    createdAt: 1724054975,
    createdBy: 1,
  },
  {
    id: 2,
    groupTitle: "test1",
    groupDesc: "test1",
    createdAt: 1724054975,
    createdBy: 1,
  },
  {
    id: 3,
    groupTitle: "test1",
    groupDesc: "test1",
    createdAt: 1724054975,
    createdBy: 1,
  },
  {
    id: 4,
    groupTitle: "test1",
    groupDesc: "test1",
    createdAt: 1724054975,
    createdBy: 1,
  },
];

export default function MyGroupsPage(): ReactElement {
  return (
    <Box>
      <AppBar></AppBar>

      <Stack
        spacing={2}
        sx={{
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          mt: 12,
        }}
      >
        <Typography
          variant="h4"
          color="primary"
          sx={{ fontWeight: "bold", textAlign: "center" }}
        >
          Welcome back,{" "}
          <Typography
            component="span"
            variant="h4"
            color="primary"
            sx={{ fontWeight: "bold", textAlign: "center" }}
          >
            username
          </Typography>
        </Typography>

        <Suspense fallback={<Typography>Loading your groups...</Typography>}>
          <GroupList groups={groupData}></GroupList>
        </Suspense>

        <Container maxWidth="sm">
          <Card sx={{ p: 4 }}>
            <CardContent>
              <Stack
                direction="column"
                spacing={4}
                sx={{ justifyContent: "center", alignItems: "center" }}
              >
                <Typography
                  variant="h4"
                  color="primary"
                  sx={{ fontWeight: "bold", textAlign: "center" }}
                >
                  Add a new group:
                </Typography>
                <NewGroupForm />
              </Stack>
            </CardContent>
          </Card>
        </Container>
      </Stack>
    </Box>
  );
}

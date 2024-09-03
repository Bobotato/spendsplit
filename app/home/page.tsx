"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import Box from "@mui/material/Box";
import CircularProgress from "@mui/material/CircularProgress";
import Container from "@mui/material/Container";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";

import AppBar from "@/components/split/AppBar";
import GroupList from "@/components/groups/groupList";
import NewGroupForm from "@/components/groups/newGroupForm";

import { addNewGroup, getGroupsByUserId } from "@/services/groups/groups";
import { getUserDetailsFromJWT } from "@/services/user/user";
import { useUserStore } from "@/app/context/userContext";

import { NewGroupSchema } from "@/schemas/forms/split/newGroupForm";

import type { ReactElement } from "react";
import type { Group } from "@/types/GroupTypes";
import { UnauthorisedError } from "@/services/errors";

export default function MyGroupsPage(): ReactElement {
  const [groups, setGroups] = useState<Group[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const router = useRouter();
  const userDetails = useUserStore((state) => state);
  const updateUserDetails = useUserStore((state) => state.updateUserDetails);

  useEffect(() => {
    const getGroups = async (id: number) => {
      const data = await getGroupsByUserId(id);
      const json = await data?.json();
      const userGroups = await json.response;
      setGroups(userGroups);
      setIsLoading(false);
    };

    const fetchUserDetails = async () => {
      try {
        const data = await getUserDetailsFromJWT();
        const newUserDetails = await data?.json();
        updateUserDetails(newUserDetails);
        if (newUserDetails.id) {
          await getGroups(newUserDetails.id);
        }
      } catch (error) {
        if (error instanceof UnauthorisedError) {
          router.push("/login");
        }
      }
    };

    fetchUserDetails();
  }, []);

  async function handleAddNewGroup(data: NewGroupSchema) {
    const res = await addNewGroup(data.groupTitle, data.groupDesc, 1);
    const group = await res.json();
    setGroups((groups) => [
      ...groups,
      {
        id: group.response.id,
        createdAt: group.response.createdAt,
        groupTitle: group.response.groupTitle,
        groupDesc: group.response.groupDesc,
        createdById: group.response.createdById,
        groupMembers: []
      },
    ]);
  }

  async function handleAddNewGroupMember(data: NewGroupSchema) {
    const res = await addNewGroup(data.groupTitle, data.groupDesc, 1);
    const group = await res.json();
    setGroups((groups) => [
      ...groups,
      {
        id: group.response.id,
        createdAt: group.response.createdAt,
        groupTitle: group.response.groupTitle,
        groupDesc: group.response.groupDesc,
        createdById: group.response.createdById,
        groupMembers: []
      },
    ]);
  }

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <AppBar></AppBar>
      <Stack
        spacing={4}
        sx={{
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          p: 4,
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
            {userDetails.userDetails.username}
          </Typography>
        </Typography>

        {isLoading ? (
          <Box sx={{ display: "flex" }}>
            <Stack
              spacing={4}
              sx={{ p: 4, justifyContent: "center", alignItems: "center" }}
            >
              <CircularProgress />
              <Typography>Loading your groups...</Typography>
            </Stack>
          </Box>
        ) : (
          <Box sx={{ display: "flex" }}>
            <GroupList groups={groups} />
          </Box>
        )}

        <Box sx={{ width: "100%" }}>
          <Paper sx={{ width: "100%", p: 4 }}>
            <Stack
              direction="column"
              spacing={4}
              sx={{
                justifyContent: "center",
                alignItems: "center",
                width: "100%",
              }}
            >
              <Typography
                variant="h4"
                color="primary"
                sx={{ fontWeight: "bold", textAlign: "center" }}
              >
                Add a new group:
              </Typography>
              <NewGroupForm handleAddNewGroup={handleAddNewGroup} />
            </Stack>
          </Paper>
        </Box>
      </Stack>
    </Box>
  );
}

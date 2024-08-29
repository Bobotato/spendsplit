"use client";

import { Suspense } from "react";

import { useEffect, useState } from "react";

import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CircularProgress from "@mui/material/CircularProgress";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";

import AppBar from "@/components/split/AppBar";
import GroupList from "@/components/groups/groupList";
import NewGroupForm from "@/components/groups/newGroupForm";

import { getGroupsByUserId } from "@/services/split";

import type { ReactElement } from "react";
import type { Group } from "@/types/GroupTypes";

export default function MyGroupsPage(): ReactElement {
  const [groups, setGroups] = useState<Group[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    getGroupsByUserId(1)
      .then((res) => res.json())
      .then((data) => {
        setGroups(data.response);
        setIsLoading(false);
      });
  }, []);

  return (
    <Box>
      <AppBar></AppBar>

      <Stack
        spacing={8}
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
          <GroupList groups={groups} />
        )}

        <Container>
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

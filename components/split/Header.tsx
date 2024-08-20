"use client";

import { useState } from "react";
import Container from "@mui/material/Container";
import IconButton from "@mui/material/IconButton";
import Stack from "@mui/material/Stack";
import Input from "@mui/material/Input";
import Typography from "@mui/material/Typography";
import EditIcon from "@mui/icons-material/Edit";

import type { ReactElement } from "react";

interface HeaderProps {
  header?: string;
  subtitle?: string;
}

export default function Header({
  header,
  subtitle,
}: HeaderProps): ReactElement {
  const [groupName, setGroupName] = useState<string>("Your group's name");
  const [isEditingGroupName, setIsEditingGroupName] = useState<boolean>(false);

  function handleNameChange(event: React.ChangeEvent<HTMLInputElement>): void {
    setGroupName(event.target.value);
  }

  function handleEditClick(): void {
    setIsEditingGroupName((isEditingGroupName) => !isEditingGroupName);
  }

  let editableGroupName = (
    <Typography align="center" variant="h2" sx={{ fontWeight: "bold" }}>
      {groupName}
    </Typography>
  );

  if (isEditingGroupName) {
    editableGroupName = <Input value={groupName} onChange={handleNameChange} />;
  }

  return (
    <Container sx={{ display: "flex", justifyContent: "center" }}>
      <Stack direction="column">
        <Stack direction="row" spacing={1}>
          {editableGroupName}
          <IconButton
            aria-label="Edit group name"
            onClick={handleEditClick}
          >
            <EditIcon></EditIcon>
          </IconButton>
        </Stack>
        <Typography align="center" variant="h5">
          Group desc
        </Typography>
      </Stack>
    </Container>
  );
}

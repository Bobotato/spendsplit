"use client";

import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import TextField from "@mui/material/TextField";
import Stack from "@mui/material/Stack";

import CircularProgress from "@mui/material/CircularProgress";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { NewGroupSchema } from "@/schemas/forms/split/newGroupForm";

export default function NewGroupForm() {
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<NewGroupSchema>({
    mode: "all",
    resolver: zodResolver(NewGroupSchema),
  });

  async function handleAddNewGroup() {
    try {
      setIsLoading(true);
    } catch (e) {
      console.error(e);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <Container
      component="main"
      maxWidth="xs"
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <form onSubmit={handleSubmit(handleAddNewGroup)} className="w-full">
        <Stack direction="column" spacing={2}>
          <TextField
            {...register("groupName")}
            label="Group Name *"
            error={!!errors.groupName}
            helperText={errors.groupName?.message}
            fullWidth
          ></TextField>
          <TextField
            {...register("groupDesc")}
            label="Group Description *"
            type="text"
            error={!!errors.groupDesc}
            helperText={errors.groupDesc?.message}
            fullWidth
            multiline
          ></TextField>
        </Stack>

        <Button
          type="submit"
          fullWidth
          variant="contained"
          sx={{ mt: 4 }}
          disabled={isLoading}
        >
          {isLoading ? <CircularProgress size={25} /> : "Add New Group"}
        </Button>
      </form>
    </Container>
  );
}

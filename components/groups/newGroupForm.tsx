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
import { Typography } from "@mui/material";

interface NewGroupFormProps {
  activeUserID: number;
  handleAddNewGroup: (data: NewGroupSchema) => Promise<void>;
}

export default function NewGroupForm({ activeUserID, handleAddNewGroup }: NewGroupFormProps) {
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<NewGroupSchema>({
    mode: "all",
    resolver: zodResolver(NewGroupSchema),
  });

  async function handleAddNewGroupSubmit(data: NewGroupSchema) {
    try {
      setIsLoading(true);
      handleAddNewGroup(data)
    } catch (e) {
      console.error(e);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <Container
      component="main"
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <form onSubmit={handleSubmit(handleAddNewGroupSubmit)} className="w-full">
        <Stack direction="column" spacing={2}>
          <TextField
            {...register("groupTitle")}
            label="Group Name *"
            error={!!errors.groupTitle}
            helperText={errors.groupTitle?.message}
            placeholder="Italy trip"
            fullWidth
          ></TextField>
          <Typography>Enter a name for your group or event.</Typography>
          <TextField
            {...register("groupDesc")}
            label="Group Description *"
            type="text"
            error={!!errors.groupDesc}
            helperText={errors.groupDesc?.message}
            fullWidth
            placeholder="Florence spending from 19/10/2024 - 29/10/2024"
            multiline
          ></TextField>
          <Typography>
            Enter a short description for your group or event.
          </Typography>
        </Stack>

        <Stack direction="row" spacing={2} sx={{ mt: 4 }}>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 4 }}
            disabled={isLoading}
          >
            {isLoading ? <CircularProgress size={25} /> : "Add New Group"}
          </Button>

          <Button
            type="button"
            onClick={() => reset()}
            fullWidth
            variant="contained"
            disabled={isLoading}
          >
            Reset Form
          </Button>
        </Stack>
      </form>
    </Container>
  );
}

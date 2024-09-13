"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";

import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";

import { zodResolver } from "@hookform/resolvers/zod";
import { AddMemberSchema } from "@/schemas/forms/split/newMemberForm";

import type { ReactElement } from "react";
import type { Member } from "@/types/UserTypes";

interface AddMemberFormProps {
  handleAddMember: (member: string) => void;
}

export default function NewGroupMemberForm({
  handleAddMember,
}: AddMemberFormProps): ReactElement {
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<AddMemberSchema>({
    mode: "all",
    resolver: zodResolver(AddMemberSchema),
  });

  function handleAddMember2(memberData: Member) {
    console.log(memberData.name);
  }

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: 2,
        alignItems: "center",
        width: "100%",
      }}
    >
      <form onSubmit={handleSubmit(handleAddMember2)}>
        <Stack
          spacing={2}
          direction="row"
          sx={{ justifyContent: "spread-between" }}
        >
          <TextField
            {...register("name")}
            label="Name*"
            error={!!errors.name}
            helperText={errors.name?.message}
            fullWidth
          ></TextField>

          <Button size="medium" type="submit" variant="contained" color={"primary"}>
            Add
          </Button>
        </Stack>
      </form>
    </Box>
  );
}

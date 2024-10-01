"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";

import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import CloseIcon from "@mui/icons-material/Close";
import DoneIcon from "@mui/icons-material/Done";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";

import { zodResolver } from "@hookform/resolvers/zod";
import { AddMemberSchema } from "@/schemas/forms/split/newMemberForm";

import type { ReactElement } from "react";

interface EditableMemberRowProps {
  handleUpdateMember: (member: string, groupId: number) => void;
  handleCancelEdit: () => void;
  memberId: number;
}

export function EditableMemberRow({
  handleUpdateMember,
  handleCancelEdit,
  memberId,
}: EditableMemberRowProps): ReactElement {

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<AddMemberSchema>({
    mode: "all",
    resolver: zodResolver(AddMemberSchema),
  });

  function handleClickApply() {
    console.log("Applied");
  }

  function handleClickCancel() {
    reset();
    handleCancelEdit()
  }

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "row",
        width: "100%",
        mt: 2,
        bgcolor: "black"
      }}
    >
      <form onSubmit={handleSubmit(handleClickApply)}>
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

          <Button
            variant="contained"
            type="submit"
            color="success"
            endIcon={<DoneIcon />}
            onClick={() => handleClickApply()}
          ></Button>
          <Button
            variant="contained"
            color="error"
            endIcon={<CloseIcon />}
            onClick={() => handleClickCancel()}
          ></Button>
        </Stack>
      </form>
    </Box>
  );
}

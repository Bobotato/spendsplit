import { useForm } from "react-hook-form";

import Button from "@mui/material/Button";
import CloseIcon from "@mui/icons-material/Close";
import DoneIcon from "@mui/icons-material/Done";
import Stack from "@mui/material/Stack";
import TableCell from "@mui/material/TableCell";
import TextField from "@mui/material/TextField";

import { zodResolver } from "@hookform/resolvers/zod";
import { AddMemberSchema } from "@/schemas/forms/split/newMemberForm";

import type { ReactElement } from "react";
import type { Member } from "@/types/UserTypes";

interface EditableMemberRowProps {
  handleApplyEdit: (memberId: number, editedMember: Member) => void;
  handleCancelEdit: () => void;
  member: Member;
  index: number;
}

export function EditableMemberRow({
  handleApplyEdit,
  handleCancelEdit,
  member,
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

  function handleClickApply(data: AddMemberSchema) {
    const memberDetails = { id: member.id, name: data.name };
    handleApplyEdit(member.id, memberDetails);
    reset();
  }

  function handleClickCancel() {
    reset();
    handleCancelEdit();
  }

  return (
    <TableCell component="th" scope="row">
      <form onSubmit={handleSubmit(handleClickApply)} className="w-full">
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
          ></Button>
          <Button
            variant="contained"
            color="error"
            endIcon={<CloseIcon />}
            onClick={() => handleClickCancel()}
          ></Button>
        </Stack>
      </form>
    </TableCell>
  );
}

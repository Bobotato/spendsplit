import { MouseEvent } from "react";
import { useRouter } from "next/navigation";
import useModal from "@/hooks/useModal";

import {
    convertPrismaDateToDateString,
    convertPrismaDateToEpoch,
  } from "@/utils/helpers";

import Button from "@mui/material/Button";
import Checkbox from "@mui/material/Checkbox";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import SendIcon from "@mui/icons-material/Send";
import Stack from "@mui/material/Stack";
import TableCell from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";
import Typography from "@mui/material/Typography";

import type { ReactNode } from "react";
import type { Group } from "@/types/GroupTypes";

interface EnhancedTableRowWithModalButtonsProps {
    row: Group;
    isItemSelected: boolean;
    labelId: string;
    handleClick: (event: MouseEvent<any>, id: number) => void;
    handleDeleteGroup: (groupId: number) => void;
  }
  
  function EnhancedTableRowWithModalButtons({
    row,
    isItemSelected,
    labelId,
    handleClick,
    handleDeleteGroup,
  }: EnhancedTableRowWithModalButtonsProps): ReactNode {
    const {
      openModal: openDeleteGroupModal,
      closeModal: closeDeleteGroupModal,
      ModalComponent: DeleteGroupModalComponent,
    } = useModal();
  
    const router = useRouter();
  
    function handleClickGo(id: number) {
      router.push(`/groups/${id}`);
    }
  
    function handleConfirmDeleteGroup(groupId: number) {
      handleDeleteGroup(groupId);
      closeDeleteGroupModal();
    }
  
    function DeleteGroupModal(): ReactNode {
      return (
        <DeleteGroupModalComponent title="Warning">
          <Stack direction="column" spacing={3}>
            <Typography variant="body1">
              You are about to delete a group. This process is{" "}
              <Typography component="span" sx={{ fontWeight: "bold" }}>
                irreversible
              </Typography>
              .
            </Typography>
            <Stack direction="row" spacing={2} sx={{ justifyContent: "center" }}>
              <Button
                variant="contained"
                onClick={() => handleConfirmDeleteGroup(row.id)}
              >
                Acknowledge and Confirm
              </Button>
              <Button variant="contained" onClick={closeDeleteGroupModal}>
                Cancel
              </Button>
            </Stack>
          </Stack>
        </DeleteGroupModalComponent>
      );
    }
  
    return (
      <TableRow
        hover
        role="checkbox"
        aria-checked={isItemSelected}
        tabIndex={-1}
        key={row.id}
        selected={isItemSelected}
      >
        <TableCell padding="checkbox">
          <Checkbox
            color="primary"
            checked={isItemSelected}
            onClick={(event) => handleClick(event, row.id)}
            inputProps={{
              "aria-labelledby": labelId,
            }}
            sx={{ cursor: "pointer" }}
          />
        </TableCell>
        <TableCell
          component="th"
          id={labelId}
          scope="row"
          padding="none"
          align="right"
        >
          {convertPrismaDateToDateString(row.createdAt)}
        </TableCell>
        <TableCell align="right" sx={{ maxWidth: "100px" }}>
          {row.groupTitle}
        </TableCell>
        <TableCell align="right" sx={{ maxWidth: "100px" }}>
          {row.groupDesc}
        </TableCell>
  
        <TableCell align="right" sx={{ maxWidth: "80px" }}>
          <Button
            variant="contained"
            endIcon={<SendIcon />}
            onClick={() => handleClickGo(row.id)}
          >
            Go
          </Button>
        </TableCell>
  
        <TableCell align="right" sx={{ maxWidth: "100px" }}>
          <Button
            variant="contained"
            color="error"
            endIcon={<DeleteForeverIcon />}
            onClick={openDeleteGroupModal}
          >
            Delete
          </Button>
        </TableCell>
  
        <DeleteGroupModal></DeleteGroupModal>
      </TableRow>
    );
  }

  export { EnhancedTableRowWithModalButtons }
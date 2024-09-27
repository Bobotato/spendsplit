"use client";

import { useState } from "react";
import useModal from "@/hooks/useModal";

import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";

import type { ReactNode } from "react";

interface AdminPanelProps {
  handleDeleteGroup: () => void;
  handleResetTransactions: () => void;
  disabled: boolean;
}

export default function AdminPanel({
  handleDeleteGroup,
  handleResetTransactions,
  disabled,
}: AdminPanelProps) {
  const {
    openModal: openResetTransactionModal,
    closeModal: closeResetTransactionModal,
    ModalComponent: ResetTransactionModalComponent,
  } = useModal();
  const {
    openModal: openDeleteGroupModal,
    closeModal: closeDeleteGroupModal,
    ModalComponent: DeleteGroupModalComponent,
  } = useModal();

  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  function ResetTransactionModal(): ReactNode {
    return (
      <ResetTransactionModalComponent title="Warning">
        <Stack direction="column" spacing={3}>
          <Typography variant="body1">
            You are about to delete all transactions. This process is{" "}
            <Typography component="span" sx={{ fontWeight: "bold" }}>
              irreversible
            </Typography>
            .
          </Typography>
          <Stack direction="row" spacing={2} sx={{ justifyContent: "center" }}>
            <Button
              variant="contained"
              onClick={handleConfirmResetTransactions}
            >
              Acknowledge and Confirm
            </Button>
            <Button variant="contained" onClick={closeResetTransactionModal}>
              Cancel
            </Button>
          </Stack>
        </Stack>
      </ResetTransactionModalComponent>
    );
  }

  function DeleteGroupModal(): ReactNode {
    return (
      <DeleteGroupModalComponent title="Warning">
        <Stack direction="column" spacing={3}>
          <Typography variant="body1">
            You are about to delete all members, transactions and this group.
            This process is{" "}
            <Typography component="span" sx={{ fontWeight: "bold" }}>
              irreversible
            </Typography>
            .
          </Typography>
          <Stack direction="row" spacing={2} sx={{ justifyContent: "center" }}>
            <Button variant="contained" onClick={handleConfirmDeleteGroup}>
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

  function handleConfirmResetTransactions() {
    try {
      setIsSubmitting(true);
      closeResetTransactionModal();
      handleResetTransactions();
    } catch (e) {
      console.log(e);
    } finally {
      setIsSubmitting(false);
    }
  }

  function handleConfirmDeleteGroup() {
    try {
      handleDeleteGroup();
      closeDeleteGroupModal();
    } catch (e) {
      console.log(e);
    }
  }

  return (
    <Stack
      direction="column"
      spacing={2}
      sx={{ justifyContent: "space-between" }}
    >
      <ResetTransactionModal></ResetTransactionModal>
      <DeleteGroupModal></DeleteGroupModal>
      <Stack
        direction="row"
        spacing={2}
        sx={{ justifyContent: "space-between" }}
      >
        <Stack direction="column">
          <Typography variant="body1" sx={{ fontWeight: "bold" }}>
            Delete Group
          </Typography>
          <Typography variant="body1">
            Delete the group, all transactions and all users permanently.
          </Typography>
        </Stack>
        <Button
          type="button"
          variant="contained"
          color={"primary"}
          onClick={openDeleteGroupModal}
          disabled={disabled || isSubmitting}
        >
          Delete Group
        </Button>
      </Stack>

      <Stack
        direction="row"
        spacing={2}
        sx={{ justifyContent: "space-between" }}
      >
        <Stack direction="column">
          <Typography variant="body1" sx={{ fontWeight: "bold" }}>
            Delete Transactions
          </Typography>
          <Typography variant="body1">
            Delete all transactions permanently.
          </Typography>
        </Stack>
        <Button
          variant="contained"
          color={"primary"}
          onClick={openResetTransactionModal}
          disabled={disabled || isSubmitting}
        >
          Reset Transactions
        </Button>
      </Stack>
    </Stack>
  );
}

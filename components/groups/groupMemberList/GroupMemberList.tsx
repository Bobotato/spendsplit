"use client";

import { useState } from "react";

import { EditableMemberRow } from "@/components/groups/groupMemberList/editableMemberRow";

import Button from "@mui/material/Button";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Typography from "@mui/material/Typography";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import EditIcon from "@mui/icons-material/Edit";

import type { Member } from "@/types/UserTypes";

interface MemberListProps {
  memberList: Member[];
  handleUpdateMember: (memberId: number, member: Member) => void;
  handleDeleteMember: (memberId: number) => void;
}

interface TableColumn {
  id: "name" | "editButton" | "deleteButton";
  label: string;
  fixedWidth?: number;
  minWidth?: number;
  align?: "right";
  format?: (value: number) => string;
}

const tableColumns: TableColumn[] = [
  { id: "name", label: "Name", minWidth: 170 },
  { id: "editButton", label: "", fixedWidth: 100 },
  { id: "deleteButton", label: "", fixedWidth: 100 },
];

export default function MemberList({
  memberList,
  handleUpdateMember,
  handleDeleteMember,
}: MemberListProps) {
  const [editingId, setEditingId] = useState<number | null>(null);

  function handleApplyEdit(memberId: number, editedMember: Member) {
    try {
      console.log(memberId, editedMember);
      handleUpdateMember(memberId, editedMember);
    } catch (e) {
      console.log(e);
    }
  }

  function handleCancelEdit() {
    setEditingId(null);
    console.log("Cancelled");
  }

  function handleClickEdit(memberId: number) {
    setEditingId(memberId);
    console.log("editing", memberId);
  }

  function handleClickDelete(memberId: number) {
    handleDeleteMember(memberId);
  }

  if (!memberList || memberList.length === 0) {
    return (
      <Typography variant="body1">
        There are no members in this group yet. Add some using the form below.
      </Typography>
    );
  } else {
    return (
      <TableContainer>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              {tableColumns.map((column) => (
                <TableCell
                  key={column.id}
                  align={column.align}
                  style={{
                    minWidth: column.minWidth,
                    width: column.fixedWidth,
                  }}
                >
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {memberList.map((member, index) => (
              <TableRow
                key={index}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                {editingId == member.id ? (
                  <EditableMemberRow
                    handleApplyEdit={handleApplyEdit}
                    handleCancelEdit={handleCancelEdit}
                    member={member}
                    index={index}
                  />
                ) : (
                  <>
                    <TableCell component="th" scope="row">
                      <Typography>{member.name}</Typography>
                    </TableCell>
                    <TableCell component="th" scope="row" align="right">
                      <Button
                        variant="contained"
                        color="success"
                        endIcon={<EditIcon />}
                        onClick={() => handleClickEdit(member.id)}
                      >
                        Edit
                      </Button>
                    </TableCell>
                    <TableCell component="th" scope="row" align="right">
                      <Button
                        variant="contained"
                        color="error"
                        endIcon={<DeleteForeverIcon />}
                        onClick={() => handleClickDelete(member.id)}
                      >
                        Delete
                      </Button>
                    </TableCell>
                  </>
                )}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    );
  }
}

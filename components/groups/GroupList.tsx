import { useState, useMemo, MouseEvent, ChangeEvent } from "react";
import { useRouter } from "next/navigation";
import useModal from "@/hooks/useModal";

import { alpha } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import TableSortLabel from "@mui/material/TableSortLabel";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";
import Checkbox from "@mui/material/Checkbox";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import DeleteIcon from "@mui/icons-material/Delete";
import { visuallyHidden } from "@mui/utils";

import SendIcon from "@mui/icons-material/Send";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";

import { getComparator } from "@/utils/table";

import {
  convertPrismaDateToDateString,
  convertPrismaDateToEpoch,
} from "@/utils/helpers";
import { deleteGroupByGroupId } from "@/services/groups/groups";

import type { ReactNode } from "react";
import type { Group } from "@/types/GroupTypes";
import type { Data, Order, HeadCell } from "@/types/TableTypes";

const headCells: readonly HeadCell[] = [
  {
    id: "createdAt",
    numeric: true,
    disablePadding: true,
    label: "Created At",
  },
  {
    id: "groupTitle",
    numeric: false,
    disablePadding: false,
    label: "Group Name",
  },
  {
    id: "groupDesc",
    numeric: false,
    disablePadding: false,
    label: "Description",
  },
  {
    id: "goButton",
    numeric: false,
    disablePadding: false,
    label: "",
  },
  {
    id: "deleteButton",
    numeric: false,
    disablePadding: false,
    label: "",
  },
];

interface EnhancedTableProps {
  numSelected: number;
  onRequestSort: (
    event: React.MouseEvent<unknown>,
    property: keyof Data
  ) => void;
  onSelectAllClick: (event: React.ChangeEvent<HTMLInputElement>) => void;
  order: Order;
  orderBy: string;
  rowCount: number;
}

function EnhancedTableHead(props: EnhancedTableProps) {
  const {
    onSelectAllClick,
    order,
    orderBy,
    numSelected,
    rowCount,
    onRequestSort,
  } = props;
  const createSortHandler =
    (property: keyof Data) => (event: React.MouseEvent<unknown>) => {
      onRequestSort(event, property);
    };

  return (
    <TableHead>
      <TableRow>
        {/* TODO: implement mass delete using checkbox */}
        <TableCell padding="checkbox">
          <Checkbox
            color="primary"
            indeterminate={numSelected > 0 && numSelected < rowCount}
            checked={rowCount > 0 && numSelected === rowCount}
            onChange={onSelectAllClick}
            inputProps={{
              "aria-label": "select all groups",
            }}
          />
        </TableCell>

        {/* map tablecell to headcell array */}
        {headCells.map((headCell) => (
          <TableCell
            key={headCell.id}
            align="right"
            padding={headCell.disablePadding ? "none" : "normal"}
            sortDirection={orderBy === headCell.id ? order : false}
          >
            <TableSortLabel
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : "asc"}
              onClick={createSortHandler(headCell.id)}
            >
              {headCell.label}
              {orderBy === headCell.id ? (
                <Box component="span" sx={visuallyHidden}>
                  {order === "desc" ? "sorted descending" : "sorted ascending"}
                </Box>
              ) : null}
            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

interface EnhancedTableToolbarProps {
  numSelected: number;
}

function EnhancedTableToolbar(props: EnhancedTableToolbarProps) {
  const { numSelected } = props;
  return (
    <Toolbar
      sx={[
        {
          pl: { sm: 2 },
          pr: { xs: 1, sm: 1 },
        },
        numSelected > 0 && {
          bgcolor: (theme) =>
            alpha(
              theme.palette.primary.main,
              theme.palette.action.activatedOpacity
            ),
        },
      ]}
    >
      {numSelected > 0 ? (
        <Typography
          sx={{ flex: "1 1 100%" }}
          color="inherit"
          variant="subtitle1"
          component="div"
        >
          {numSelected} selected
        </Typography>
      ) : (
        <Typography
          variant="h4"
          color="primary"
          id="tableTitle"
          component="div"
          sx={{ fontWeight: "bold", flex: "1 1 100%" }}
        >
          Your groups
        </Typography>
      )}
      {numSelected > 0 && (
        <Tooltip title="Delete">
          <IconButton>
            <DeleteIcon />
          </IconButton>
        </Tooltip>
      )}
    </Toolbar>
  );
}

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

interface GroupListProps {
  groups?: Group[];
  handleDeleteGroup: (groupId: number) => void;
}

export default function GroupList({ groups }: GroupListProps) {
  const [order, setOrder] = useState<Order>("asc");
  const [orderBy, setOrderBy] = useState<keyof Data>("createdAt");
  const [selected, setSelected] = useState<readonly number[]>([]);
  const [page, setPage] = useState<number>(0);
  const [groupsPerPage, setgroupsPerPage] = useState<number>(5);

  const isSelected = (id: number) => selected.indexOf(id) !== -1;

  // Avoid a layout jump when reaching the last page with empty groups.
  const emptygroups =
    page > 0 ? Math.max(0, (1 + page) * groupsPerPage - groups.length) : 0;

  const visiblegroups: Group[] = useMemo(
    () =>
      [...groups]
        .sort(getComparator(order, orderBy))
        .slice(page * groupsPerPage, page * groupsPerPage + groupsPerPage),
    [order, orderBy, page, groupsPerPage]
  );

  function handleRequestSort(
    event: React.MouseEvent<unknown>,
    property: keyof Data
  ) {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  }

  function handleSelectAllClick(event: ChangeEvent<HTMLInputElement>) {
    if (event.target.checked && groups) {
      const newSelected = groups.map((n) => n.id);
      setSelected(newSelected);
      return;
    }
    setSelected([]);
  }

  function handleClick(event: MouseEvent<unknown>, id: number) {
    const selectedIndex = selected.indexOf(id);
    let newSelected: readonly number[] = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, id);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1)
      );
    }
    setSelected(newSelected);
  }

  function handleChangePage(event: unknown, newPage: number) {
    setPage(newPage);
  }

  function handleChangeRowsPerPage(event: ChangeEvent<HTMLInputElement>) {
    setgroupsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  }

  function handleDeleteGroup(groupId: number) {
    console.log("Delete group", groupId);
  }

  return (
    <Box sx={{ width: "100%", minWidth: 750 }}>
      {!groups || groups.length === 0 ? (
        <Typography variant="body1">
          You currently have no groups, add some using the form below!
        </Typography>
      ) : (
        <Paper sx={{ width: "100%", mb: 2, p: 4 }}>
          <EnhancedTableToolbar numSelected={selected.length} />
          <TableContainer>
            <Table sx={{ minWidth: 750 }} aria-labelledby="tableTitle">
              <EnhancedTableHead
                numSelected={selected.length}
                order={order}
                orderBy={orderBy}
                onSelectAllClick={handleSelectAllClick}
                onRequestSort={handleRequestSort}
                rowCount={groups.length}
              />
              <TableBody>
                {visiblegroups.map((row, index) => {
                  const isItemSelected = isSelected(row.id);
                  const labelId = `enhanced-table-checkbox-${index}`;

                  return (
                    <EnhancedTableRowWithModalButtons
                      key={index}
                      row={row}
                      isItemSelected={isItemSelected}
                      labelId={labelId}
                      handleClick={handleClick}
                      handleDeleteGroup={handleDeleteGroup}
                    />
                  );
                })}
                {emptygroups > 0 && (
                  <TableRow
                    style={{
                      height: 53 * emptygroups,
                    }}
                  >
                    <TableCell colSpan={6} />
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </TableContainer>
          <TablePagination
            rowsPerPageOptions={[5, 10, 25]}
            component="div"
            count={groups.length}
            rowsPerPage={groupsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </Paper>
      )}
    </Box>
  );
}
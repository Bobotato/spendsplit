import { useState, useMemo, MouseEvent, ChangeEvent } from "react";

import { EnhancedTableHead } from "@/components/general/table/EnhancedTableHead";
import { EnhancedTableToolbar } from "@/components/general/table/EnhancedTableToolbar";
import { EnhancedTableRowWithModalButtons } from "@/components/general/table/EnhancedTableRowWithModalButtons";

import Box from "@mui/material/Box";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";

import { getComparator } from "@/utils/table";
import { headCells } from "@/app/data/GroupList/headCells";

import type { ReactNode } from "react";
import type { Group } from "@/types/GroupTypes";
import type { Data, Order } from "@/types/TableTypes";

interface GroupListProps {
  groups?: Group[];
  handleDeleteGroup: (groupId: number) => void;
}

export default function GroupList({ groups }: GroupListProps): ReactNode {
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
                headCells={headCells}
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

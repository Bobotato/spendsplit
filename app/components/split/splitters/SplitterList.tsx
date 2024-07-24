import type { Splitter } from "@/app/types/UserTypes";

import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";

interface SplitterListProps {
  splitterList: Splitter[];
}

interface SplitterTableColumn {
  id: "name" | "colour";
  label: string;
  minWidth?: number;
  align?: "right";
  format?: (value: number) => string;
}

const splitterTableColumns: SplitterTableColumn[] = [
  { id: "name", label: "Name", minWidth: 170 },
  { id: "colour", label: "Colour", minWidth: 170 },
];

export default function SplitterList({ splitterList }: SplitterListProps) {
  return (
    <TableContainer>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            {splitterTableColumns.map((column) => (
              <TableCell
                key={column.id}
                align={column.align}
                style={{ minWidth: column.minWidth }}
              >
                {column.label}
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {splitterList.map((row) => (
            <TableRow
              key={row.name}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {row.name}
              </TableCell>
              <TableCell align="left">{row.colour}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

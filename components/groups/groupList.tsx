import { useRouter } from "next/navigation";

import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import SendIcon from '@mui/icons-material/Send';

import { convertPrismaDateToDateString } from "@/utils/helpers";

import type { Group } from "@/types/GroupTypes";

interface GroupListProps {
  groups?: Group[];
}

export default function GroupList({ groups }: GroupListProps) {
  const router = useRouter();

  function handleClick(id: number) {
    router.push(`/groups/${id}`);
  }

  return (
    <Container>
      <Stack spacing={4}>
        {!groups || groups.length === 0 ? (
          <Typography variant="body1">
            You currently have no groups, add some using the form below!
          </Typography>
        ) : (
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }}>
              <TableHead sx={{ bgcolor: "primary.main" }}>
                <TableRow>
                  <TableCell>Group Name</TableCell>
                  <TableCell align="right">Group Description</TableCell>
                  <TableCell align="right">Creation Date</TableCell>
                  <TableCell align="right">{}</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {groups.map((group) => (
                  <TableRow
                    key={group.id}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell component="th" scope="row">
                      {group.groupTitle}
                    </TableCell>
                    <TableCell align="right">{group.groupDesc}</TableCell>
                    <TableCell align="right">
                      {convertPrismaDateToDateString(group.createdAt)}
                    </TableCell>
                    <TableCell align="right">
                      <Button variant="contained" endIcon={<SendIcon />} onClick={() => handleClick(group.id)}>Go</Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        )}
      </Stack>
    </Container>
  );
}

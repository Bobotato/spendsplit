import AppBar from "@/components/split/AppBar";
import Typography from "@mui/material/Typography";

import NewGroupForm from "@/components/home/newGroupForm";

import { ReactElement } from "react";

export default function MyGroupsPage(): ReactElement {
  return (
    <>
      <AppBar></AppBar>
      <Typography variant="body1">Welcome back, username.</Typography>
      <Typography variant="body1">Here are your groups:</Typography>
      <NewGroupForm />
    </>
  );
}

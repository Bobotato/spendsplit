import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import PersonIcon from "@mui/icons-material/Person";
import GroupsIcon from "@mui/icons-material/Groups";
import AddCardIcon from "@mui/icons-material/AddCard";

import InstructionsCard from "@/components/landing/InstructionsCard";

const instructions = [
  {
    icon: <PersonIcon />,
    title: "Create an account",
    description: "Login or register so we can remember you.",
  },
  {
    icon: <GroupsIcon />,
    title: "Create a group",
    description: "A group can be for an event or any occassion.",
  },
  {
    icon: <AddCardIcon />,
    title: "Start adding transactions!",
    description: "Start getting back the money people owe you.",
  },
];

export default function Instructions() {
  return (
    <Box
      sx={{
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        p: 8,
      }}
    >
      <Stack spacing={4}>
        <Typography
          variant="h4"
          color="primary"
          sx={{ fontWeight: "bold", textAlign: "center" }}
        >
          Instructions:
        </Typography>
        <Stack
          direction="row"
          justifyContent="center"
          alignItems="center"
          spacing={3}
          divider={<ArrowForwardIosIcon />}
        >
          {instructions.map((item) => (
            <InstructionsCard
              icon={item.icon}
              title={item.title}
              description={item.description}
            />
          ))}
        </Stack>
      </Stack>
    </Box>
  );
}

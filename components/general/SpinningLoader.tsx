import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import CircularProgress from "@mui/material/CircularProgress";
import Typography from "@mui/material/Typography";

export interface LoadingProps {
  message: string;
}

export default function Loader({ message }: LoadingProps) {

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Stack
        spacing={4}
        sx={{ p: 4, justifyContent: "center", alignItems: "center" }}
      >
        <CircularProgress />
        <Typography>{message}</Typography>
      </Stack>
    </Box>
  );
}

import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import CircularProgress from "@mui/material/CircularProgress";

export default function Loading() {
  <Stack>
    <CircularProgress color="primary" />
    <Typography variant="h4" color="primary" sx={{ fontWeight: "bold" }}>
      Loading
    </Typography>
  </Stack>;
}

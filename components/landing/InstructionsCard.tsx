import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";

interface InstructionsCardProps {
  icon: any;
  title: string;
  description: string;
}

export default function InstructionsCard({
  icon,
  title,
  description,
}: InstructionsCardProps) {
  return (
    <Card>
      <CardContent>
        <Stack
          direction="column"
          sx={{
            justifyContent: "center",
            alignItems: "center",
            p: 2
          }}
        >
          {icon}
          <Typography variant="h6" color="primary">
            {title}
          </Typography>
          <Typography color="text.secondary" textAlign={"center"}>{description}</Typography>
        </Stack>
      </CardContent>
    </Card>
  );
}

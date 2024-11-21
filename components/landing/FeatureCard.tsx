import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";

interface FeatureCardProps {
  featureCard: FeatureCard;
}

interface FeatureCard {
  featureNumber: number;
  title: string;
  description: string;
}

export default function FeatureCard({ featureCard }: FeatureCardProps) {
  return (
    <Box height={300}>
      <Card sx={{ height: 1, width: 1, p: 2 }}>
        <CardContent>
          <Stack gap={4}>
            <Typography variant="h6" color="primary" textAlign={"center"}>{featureCard.title}</Typography>
            <Typography color="text.secondary" textAlign={"center"}>{featureCard.description}</Typography>
          </Stack>
        </CardContent>
      </Card>
    </Box>
  );
}

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
    <Box height={300} width={350}>
      <Card sx={{ height: 1, width: 1, p: 2 }}>
        <CardContent>
          <Stack>
            <Typography>{featureCard.title}</Typography>
            <Typography>{featureCard.description}</Typography>
          </Stack>
        </CardContent>
      </Card>
    </Box>
  );
}

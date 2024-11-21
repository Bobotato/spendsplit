import FeatureCard from "@/components/landing/FeatureCard";

import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid2";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";

import type { ReactElement } from "react";

const features = [
  {
    featureNumber: 1,
    title: "Create multiple groups for multiple events",
    description: "Login or register so we can remember you.",
  },
  {
    featureNumber: 2,
    title: "Create and group transactions with multiple splitters",
    description: "A group can be for an event or any occassion.",
  },
  {
    featureNumber: 3,
    title: "Upload images of receipts and items to show what you've bought",
    description: "Start getting back the money people owe you.",
  },
  {
    featureNumber: 4,
    title: "Upload images of receipts and items to show what you've bought",
    description: "Start getting back the money people owe you.",
  },
];

export default function FeatureList(): ReactElement {
  return (
    <Box>
      <Grid container spacing={2}>
        {features.map((feature) => (
          <Grid size={4}>
            <FeatureCard
              featureCard={feature}
              key={feature.featureNumber}
            ></FeatureCard>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}

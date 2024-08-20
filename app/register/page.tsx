import Container from "@mui/material/Container";
import Link from "@mui/material/Link";
import Typography from "@mui/material/Typography";

import Register from "@/components/auth/Register";

import Image from "next/image";

export default function RegisterPage() {
  return (
    <Container
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        marginTop: 10,
        gap: 2,
      }}
    >
      <Image
        src="/images/SpendSplitLogo.png"
        alt="Spendsplit Logo"
        width={400}
        height={100}
        priority
      />

      <Typography variant="h5">Register</Typography>

      <Register></Register>

      <Typography>Already have an account?</Typography>
      <Typography variant="body1">
        <Link href="/login">Login</Link>
      </Typography>
    </Container>
  );
}

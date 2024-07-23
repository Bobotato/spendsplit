import { Container, Link, Typography } from "@mui/material";

import Login from "@/app/components/auth/Login";

import Image from "next/image";

export default function LoginPage() {
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
      />

      <Typography variant="h5">Log In</Typography>

      <Login></Login>

      <Typography variant="body1">Don't have an account?</Typography>
      <Typography variant="body1">
        <Link href="/register">Register</Link>
      </Typography>
    </Container>
  );
}

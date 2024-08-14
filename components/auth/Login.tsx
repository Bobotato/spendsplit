"use client";

import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import Link from "@mui/material/Link";
import Stack from "@mui/material/Stack";

import { useRouter } from "next/navigation";
import {
  FormContainer,
  TextFieldElement,
  PasswordElement,
} from "react-hook-form-mui";
import { Credentials } from "@/types/AuthTypes";

export default function Login() {
  const defaultValues: Credentials = {
    email: "",
    password: "",
  };

  const router = useRouter();

  async function handleLogin(loginCredentials: Credentials) {
    try {
      const response = await fetch("/api/auth/login", {
        method: "POST",
        body: JSON.stringify({
          email: loginCredentials.email,
          password: loginCredentials.password,
        }),
      });
      if (response.ok) {
        router.push("/split");
      }
    } catch (e) {
      console.error(e);
    }
  }

  return (
    <Container
      component="main"
      maxWidth="xs"
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 4,
      }}
    >
      <FormContainer defaultValues={defaultValues} onSuccess={handleLogin}>
        <TextFieldElement
          name={"email"}
          label={"Email Address"}
          autoComplete="email"
          autoFocus
          required
          fullWidth
          sx={{ mb: 2 }}
        />

        <PasswordElement
          name={"password"}
          label={"Password"}
          required
          fullWidth
          sx={{ mb: 2 }}
        />

        <Link variant="body1" href="/split">
          Forgot password?
        </Link>

        <Button type="submit" fullWidth variant="contained" sx={{ mt: 4 }}>
          Log In
        </Button>
      </FormContainer>
    </Container>
  );
}

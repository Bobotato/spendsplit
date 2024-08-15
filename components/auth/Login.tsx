"use client";

import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import Link from "@mui/material/Link";
import TextField from "@mui/material/TextField";
import Stack from "@mui/material/Stack";
import InputAdornment from "@mui/material/InputAdornment";
import IconButton from "@mui/material/IconButton";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import CircularProgress from "@mui/material/CircularProgress";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { LoginSchema } from "@/schemas/forms/auth";

import { Credentials } from "@/types/AuthTypes";

export default function Login() {
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginSchema>({
    mode: "all",
    resolver: zodResolver(LoginSchema),
  });

  const router = useRouter();

  async function handleLogin(loginCredentials: Credentials) {
    try {
      setIsLoading(true);
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
    } finally {
      setIsLoading(false);
    }
  }

  function handleShowPassword() {
    setShowPassword((prev) => !prev);
  }

  return (
    <Container
      component="main"
      maxWidth="xs"
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <form onSubmit={handleSubmit(handleLogin)} className="w-full">
        <Stack direction="column" spacing={2}>
          <TextField
            {...register("email")}
            label="Email *"
            error={!!errors.email}
            helperText={errors.email?.message}
            fullWidth
          ></TextField>
          <TextField
            {...register("password")}
            label="Password *"
            type={showPassword ? "text" : "password"}
            error={!!errors.password}
            helperText={errors.password?.message}
            fullWidth
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleShowPassword}
                    edge="end"
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          ></TextField>

          <Link variant="body1" href="/split">
            Forgot password?
          </Link>
        </Stack>

        <Button
          type="submit"
          fullWidth
          variant="contained"
          sx={{ mt: 4 }}
          disabled={isLoading}
        >
          {isLoading ? <CircularProgress size={25} /> : "Log In"}
        </Button>
      </form>
    </Container>
  );
}

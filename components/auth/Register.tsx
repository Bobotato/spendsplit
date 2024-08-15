"use client";

import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import InputAdornment from "@mui/material/InputAdornment";
import TextField from "@mui/material/TextField";
import IconButton from "@mui/material/IconButton";
import Stack from "@mui/material/Stack";
import CircularProgress from "@mui/material/CircularProgress";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { RegisterSchema } from "@/schemas/forms/auth";

import type { Credentials } from "@/types/AuthTypes";

export default function Register() {
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterSchema>({
    mode: "all",
    resolver: zodResolver(RegisterSchema),
  });

  const router = useRouter();

  function handleShowPassword() {
    setShowPassword((prev) => !prev);
  }

  async function handleRegister(registerCredentials: Credentials) {
    try {
      setIsLoading(true);
      const response = await fetch("/api/auth/register", {
        method: "POST",
        body: JSON.stringify({
          email: registerCredentials.email,
          password: registerCredentials.password,
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
      <form onSubmit={handleSubmit(handleRegister)} className="w-full">
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
          <TextField
            {...register("passwordConfirm")}
            type="password"
            label="Confirm password *"
            error={!!errors.passwordConfirm}
            helperText={errors.passwordConfirm?.message}
            fullWidth
          ></TextField>

          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 4 }}
            disabled={isLoading}
          >
            {isLoading ? <CircularProgress size={25} /> : "Register"}
          </Button>
        </Stack>
      </form>
    </Container>
  );
}

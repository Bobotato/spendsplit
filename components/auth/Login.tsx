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

import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useAuth } from "@/hooks/useAuth";
import { zodResolver } from "@hookform/resolvers/zod";

import { LoginSchema } from "@/schemas/forms/auth";

import { useRouter } from "next/navigation";

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

  const { login, getCurrentUser } = useAuth();

  const router = useRouter();

  useEffect(() => {
    const getUser = async () => {
      const user = await getCurrentUser();
      if (user) {
        router.push("/split");
      }
      getUser();
    };
  }, []);

  async function handleLogin(loginCredentials: Credentials) {
    try {
      setIsLoading(true);
      await login(loginCredentials);
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
            {...register("username")}
            label="Username *"
            error={!!errors.username}
            helperText={errors.username?.message}
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

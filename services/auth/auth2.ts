import { apiClient } from "@/services/axiosClient";
import { AxiosError } from "axios";
import { ZodError } from "zod";
import { LoginResponseSchema, RegisterResponseSchema } from "@/schemas/auth";
import { APIResponseMalformedError } from "@/services/errors";
import { authErrorCodes } from "@/services/auth/errors";

import type { LoginResponse, RegisterResponse } from "@/types/APITypes";
import type { loginCredentials } from "@/types/AuthTypes";

export async function postLogin(
  credentials: loginCredentials
): Promise<LoginResponse> {
  try {
    const { data } = await apiClient.post("/user/authenticate", credentials);
    LoginResponseSchema.parse(data);
    return data as LoginResponse;
  } catch (error: any) {
    if (
      error instanceof AxiosError &&
      error.response &&
      error.response.status in authErrorCodes
    ) {
      throw authErrorCodes[error.response.status];
    } else if (error instanceof ZodError) {
      throw new APIResponseMalformedError("API returned malformed response");
    } else {
      throw error;
    }
  }
}

export async function postRegister(
  credentials: loginCredentials
): Promise<RegisterResponse> {
  try {
    const { data } = await apiClient.post("/user/register", credentials);
    RegisterResponseSchema.parse(data);
    return data as RegisterResponse;
  } catch (error: any) {
    if (
      error instanceof AxiosError &&
      error.response &&
      error.response.status in authErrorCodes
    ) {
      throw authErrorCodes[error.response.status];
    } else if (error instanceof ZodError) {
      throw new APIResponseMalformedError("API returned malformed response");
    } else {
      throw error;
    }
  }
}

export async function postLogout(): Promise<void> {
  try {
    await apiClient.post("/user/logout");
  } catch (error: any) {
    if (
      error instanceof AxiosError &&
      error.response &&
      error.response.status in authErrorCodes
    ) {
      throw authErrorCodes[error.response.status];
    } else {
      throw error;
    }
  }
}

export async function verifyJWT(): Promise<void> {
  try {
    await apiClient.post("/user/verify-token");
  } catch (error: any) {
    if (
      error instanceof AxiosError &&
      error.response &&
      error.response.status in authErrorCodes
    ) {
      throw authErrorCodes[error.response.status];
    } else {
      throw error;
    }
  }
}

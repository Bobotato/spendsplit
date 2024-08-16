import type { activeUser, Credentials } from "@/types/AuthTypes";

import { useRouter } from "next/navigation";

function useAuth() {
  const router = useRouter();

  async function getCurrentUser() {
    try {
      const response = await fetch("api/auth/verifyJWT", {
        method: "POST",
      });
      if (response.ok) {
        const data = await response.json();
        return data.username;
      }
    } catch (e) {
      console.error(e);
    }
  }

  async function login(loginCredentials: Credentials) {
    try {
      const response = await fetch("/api/auth/login", {
        method: "POST",
        body: JSON.stringify({
          username: loginCredentials.username,
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

  async function logout() {
    try {
      const response = await fetch("/api/auth/logout", {
        method: "POST",
      });
      if (response.ok) {
        router.push("/logout");
      }
    } catch (e) {
      console.error(e);
    }
  }

  return { getCurrentUser, login, logout };
}

export { useAuth };

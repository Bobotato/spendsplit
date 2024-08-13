import { cookies } from "next/headers";

async function getSessionJWT() {
  const jwt = cookies().get("session")?.value;
}

async function login() {
  console.log("Login");
}

async function logout() {
  cookies().set("session", "", { maxAge: 0 });
}

export { getSessionJWT, login, logout };

import { prisma } from "@/services/prisma";

import { hashPassword } from "@/lib/auth/auth";

import {
  UserNotFoundError,
  UsernameAlreadyExistsError,
} from "@/services/errors";

async function getUser(username: string) {
  const res = await prisma.user.findFirst({
    where: { username: username },
  });
  if (!res) {
    throw new UserNotFoundError("User not found");
  } else {
    return res;
  }
}

async function createNewUser(username: string, password: string) {
  await prisma.user.create({
    data: {
      username: username,
      passwordHash: await hashPassword(password),
    },
  });
}

async function checkUserExists(username: string) {
  const res = await prisma.user.findMany({
    where: {
      username: username,
    },
  });
  if (res.length !== 0) {
    throw new UsernameAlreadyExistsError("Username already exists");
  }
}

export { getUser, createNewUser, checkUserExists };

import { prisma } from "@/services/prisma";

import { hashPassword } from "@/lib/auth/auth";

import {
  UserNotFoundError,
  UsernameAlreadyExistsError,
} from "@/services/errors";

async function getUser(email: string) {
  const res = await prisma.user.findFirst({
    where: { email: email },
  });
  if (!res) {
    throw new UserNotFoundError("User not found");
  } else {
    return res;
  }
}

async function createNewUser(email: string, password: string) {
  await prisma.user.create({
    data: {
      email: email,
      passwordHash: await hashPassword(password),
    },
  });
}

async function checkUserExists(email: string) {
  const res = await prisma.user.findMany({
    where: {
      email: email,
    },
  });
  if (res.length !== 0) {
    throw new UsernameAlreadyExistsError("Username already exists");
  }
}

export { getUser, createNewUser, checkUserExists };

import { compare, genSalt, hash } from "bcrypt";

async function hashPassword(password: string) {
  const salt = await genSalt();
  return hash(password, salt);
}

async function comparePasswords(passwordHash: string, password: string) {
  return compare(password, passwordHash);
}

export { hashPassword, comparePasswords };

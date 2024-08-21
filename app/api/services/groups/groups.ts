import { prisma } from "@/app/api/services/prisma";

import { GroupNotFoundError } from "@/app/api/services/errors";

async function createGroup(
  groupTitle: string,
  groupDesc: string,
  createdById: number
) {
  const res = await prisma.transactionGroup.create({
    data: {
      groupTitle: groupTitle,
      groupDesc: groupDesc,
      createdById: createdById,
    },
  });
  return res;
}

async function getAllGroups() {
  const res = await prisma.transactionGroup.findMany();
  if (!res) {
    throw new GroupNotFoundError("No groups were found");
  } else {
    return res;
  }
}

async function getGroupsByCreatedById(createdById: number) {
  const res = await prisma.transactionGroup.findMany({
    where: {
      createdById: createdById,
    },
  });
  if (!res) {
    throw new GroupNotFoundError(
      "No groups linked to this creator ID were found."
    );
  } else {
    return res;
  }
}

async function deleteGroupByGroupId(groupId: number) {
  const res = await prisma.transactionGroup.delete({
    where: {
      id: groupId,
    },
  });
}

async function purgeGroups() {
  const res = await prisma.transactionGroup.deleteMany({});
  return res;
}

export {
  createGroup,
  getAllGroups,
  getGroupsByCreatedById,
  deleteGroupByGroupId,
  purgeGroups,
};

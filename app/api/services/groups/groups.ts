import { prisma } from "@/app/api/services/prisma";

import { GroupNotFoundError } from "@/app/api/services/errors";

async function addMemberToGroup(groupId: number, member: string) {
  const res = await prisma.transactionGroup.update({
    where: {
      id: groupId,
    },
    data: {
      groupMembers: {
        push: member,
      },
    },
  });
  return res
}

async function createGroup(
  groupTitle: string,
  groupDesc: string,
  createdById: number
) {
  const res = await prisma.transactionGroup.create({
    data: {
      groupTitle: groupTitle,
      groupDesc: groupDesc,
      createdById: createdById,2
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

async function getGroupByGroupId(groupId: number) {
  const res = await prisma.transactionGroup.findMany({
    where: {
      id: groupId,
    },
  });
  if (!res) {
    throw new GroupNotFoundError(
      "No groups with this ID were found."
    );
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
  addMemberToGroup,
  createGroup,
  getAllGroups,
  getGroupByGroupId,
  getGroupsByCreatedById,
  deleteGroupByGroupId,
  purgeGroups,
};

import { prisma } from "@/app/api/services/prisma";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";

import { NoMembersFoundError } from "@/app/api/services/errors";

import type { Member } from "@/types/UserTypes";

async function getMembersByGroupId(groupId: number) {
  const res = await prisma.member.findMany({
    where: {
      groupId: groupId,
    },
  });
  if (!res) {
    throw new NoMembersFoundError(
      "No members associated with this groupId were found."
    );
  } else {
    return res;
  }
}

async function updateGroupMember(id: number, member: Member) {
  try {
    const res = await prisma.member.update({
      where: {
        id: id,
      },
      data: {
        name: member.name,
      },
    });
    return res;
  } catch (e) {
    if (e instanceof PrismaClientKnownRequestError) {
      if (e.code === "P2025") {
        throw new NoMembersFoundError(
          "No member associated with this id was found."
        );
      }
    }
  }
}

export { getMembersByGroupId, updateGroupMember };

import { prisma } from "@/app/api/services/prisma";

import { NoMembersFoundError } from "@/app/api/services/errors";

async function getMembersByGroupId(groupId: number) {
    const res = await prisma.member.findMany({
      where: {
        groupId: groupId,
      },
    });
    if (!res) {
      throw new NoMembersFoundError("No members associated with this groupId were found.");
    } else {
      return res;
    }
  }

  export { getMembersByGroupId }
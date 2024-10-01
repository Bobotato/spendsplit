import type { Member } from "@/types/UserTypes";

async function addNewGroupMember(name: string, groupId: number) {
  try {
    const response = await fetch("../api/split/members/addGroupMember", {
      method: "POST",
      body: JSON.stringify({
        member: name,
        groupId: groupId,
      }),
    });
    return response;
  } catch (e) {
    console.error(e);
  }
}

async function deleteGroupMember(memberId: number) {
  try {
    const response = await fetch("../api/split/members/deleteMemberByMemberName", {
      method: "POST",
      body: JSON.stringify({
        memberId: memberId,
      }),
    });
    return response;
  } catch (e) {
    console.error(e);
  }
}

async function fetchGroupMembers(groupId: number) {
  try {
    const response = await fetch(
      "../api/split/members/getGroupMembersByGroupId",
      {
        method: "POST",
        body: JSON.stringify({
          groupId: groupId,
        }),
      }
    );
    return response;
  } catch (e) {
    console.error(e);
  }
}

async function updateGroupMember(id: number, member: Member) {
  try {
    const response = await fetch(
      "../api/split/members/updateGroupMember",
      {
        method: "POST",
        body: JSON.stringify({
          id: id,
          member: member,
        }),
      }
    );
    return response;
  } catch (e) {
    console.error(e);
  }
}

export { addNewGroupMember, deleteGroupMember, fetchGroupMembers, updateGroupMember };

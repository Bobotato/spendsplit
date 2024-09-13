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

export { addNewGroupMember, fetchGroupMembers };

async function addNewGroup(
  groupTitle: string,
  groupDesc: string,
  createdById: number
) {
  try {
    const response = await fetch("../api/split/groups/createGroup", {
      method: "POST",
      body: JSON.stringify({
        groupTitle: groupTitle,
        groupDesc: groupDesc,
        groupMembers: [],
        transactions: [],
        createdById: createdById,
      }),
    });
    return response;
  } catch (e) {
    console.error(e);
  }
}

async function addNewGroupMemberByGroupId(groupId: number, member: string) {
  try {
    const response = await fetch("../api/split/groups/addMemberToGroup", {
      method: "POST",
      body: JSON.stringify({
        groupId: groupId,
        groupMember: member,
      }),
    });
    return response;
  } catch (e) {
    console.error(e);
  }
}

async function getGroupsByUserId(userId: number) {
  try {
    const response = await fetch("../api/split/groups/getGroupsByCreatedById", {
      method: "POST",
      body: JSON.stringify({
        createdById: userId,
      }),
    });
    return response;
  } catch (e) {
    console.error(e);
  }
}

async function getGroupDataByGroupId(groupId: number) {
  try {
    const response = await fetch("../api/split/groups/getGroupByGroupId", {
      method: "POST",
      body: JSON.stringify({
        id: groupId,
      }),
    });
    console.log(response);
    return response;
  } catch (e) {
    console.error(e);
  }
}

async function deleteGroupByGroupId(groupId: number) {
  try {
    const response = await fetch("../api/split/groups/deleteGroupByGroupId", {
      method: "POST",
      body: JSON.stringify({
        groupId: groupId,
      }),
    });
    console.log(response);
    return response;
  } catch (e) {
    console.error(e);
  }
}

export {
  addNewGroup,
  addNewGroupMemberByGroupId,
  getGroupsByUserId,
  getGroupDataByGroupId,
  deleteGroupByGroupId,
};

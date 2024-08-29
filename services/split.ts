async function getGroupsByUserId(userId: number) {
  try {
    const response = await fetch("../api/split/groups/getGroupsByCreatedById", {
      method: "POST",
      body: JSON.stringify({
        createdById: userId,
      }),
    });
    console.log(response);
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

export { getGroupsByUserId, getGroupDataByGroupId, deleteGroupByGroupId };

async function getGroups(userId: number) {
  try {
    const response = await fetch("api/split/groups/getGroupsByCreatedById", {
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

export { getGroups };

async function getUserDetailsFromJWT() {
    try {
      const response = await fetch("../api/auth/verifyJWT", {
        method: "POST",
        })
      return response;
    } catch (e) {
      console.error(e);
    }
  }

export { getUserDetailsFromJWT }
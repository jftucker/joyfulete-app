import client from "./client";

const getUser = (userId) => client.get("/users/" + userId);

const register = (userInfo) =>
  client.post("/rest-auth/registration/", userInfo);

export default { getUser, register };
